<?php

namespace App\Services;

use App\Models\AuthUser;
use App\Models\CustomerUser;
use App\backend\config\Database;
use PDO;
use Exception;

class CustomerService {
    private $db;
    private $userModel;
    private $customerUserModel;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->userModel = new AuthUser();
        $this->customerUserModel = new CustomerUser();
    }

    /**
     * Get all customers with pagination and filters
     * Joins users and customer_users tables
     */
    public function getAllCustomers(array $filters = [], int $page = 1, int $perPage = 20): array {
        $where = [];
        $params = [];

        // Base query - join users and customer_users
        $baseQuery = "FROM users u 
                      LEFT JOIN customer_users cu ON u.id = cu.user_id 
                      WHERE u.role = 'customer'";

        // Apply search filter
        if (!empty($filters['search'])) {
            $where[] = "(LOWER(u.first_name) LIKE LOWER(:search) OR 
                        LOWER(u.last_name) LIKE LOWER(:search) OR 
                        LOWER(u.email) LIKE LOWER(:search) OR 
                        LOWER(cu.phone) LIKE LOWER(:search) OR 
                        LOWER(cu.location) LIKE LOWER(:search))";
            $params[':search'] = '%' . $filters['search'] . '%';
        }

        // Apply status filter
        if (isset($filters['status'])) {
            if ($filters['status'] === 'active') {
                $where[] = "u.is_active = 1";
            } elseif ($filters['status'] === 'inactive') {
                $where[] = "u.is_active = 0";
            }
        }

        $whereClause = !empty($where) ? ' AND ' . implode(' AND ', $where) : '';

        // Get total count
        $countQuery = "SELECT COUNT(*) {$baseQuery} {$whereClause}";
        $countStmt = $this->db->prepare($countQuery);
        foreach ($params as $key => $value) {
            $countStmt->bindValue($key, $value);
        }
        $countStmt->execute();
        $total = (int)$countStmt->fetchColumn();

        // Get paginated results
        $offset = ($page - 1) * $perPage;
        $query = "SELECT 
                    u.id,
                    u.id as user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.is_active,
                    u.created_at,
                    u.updated_at,
                    u.last_activity,
                    cu.phone,
                    cu.location,
                    0 as total_orders,
                    0.00 as total_spent,
                    0 as adoptions
                  {$baseQuery} {$whereClause}
                  ORDER BY u.created_at DESC 
                  LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($query);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format the data
        foreach ($customers as &$customer) {
            $customer['total_orders'] = (int)$customer['total_orders'];
            $customer['total_spent'] = (float)$customer['total_spent'];
            $customer['adoptions'] = (int)$customer['adoptions'];
            $customer['is_active'] = (bool)$customer['is_active'];
            // Ensure phone and location are strings (not null)
            $customer['phone'] = $customer['phone'] ?? '';
            $customer['location'] = $customer['location'] ?? '';
        }

        return [
            'items' => $customers,
            'total' => $total
        ];
    }

    /**
     * Get single customer by ID with detailed information
     */
    public function getCustomer(int $userId): array {
        $query = "SELECT 
                    u.id,
                    u.id as user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.is_active,
                    u.created_at,
                    u.updated_at,
                    u.last_activity,
                    cu.phone,
                    cu.location,
                    0 as total_orders,
                    0.00 as total_spent,
                    0 as adoptions
                  FROM users u 
                  LEFT JOIN customer_users cu ON u.id = cu.user_id 
                  WHERE u.id = :user_id AND u.role = 'customer'
                  LIMIT 1";

        $stmt = $this->db->prepare($query);
        $stmt->execute([':user_id' => $userId]);
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$customer) {
            throw new Exception('Customer not found');
        }

        // Format the data
        $customer['total_orders'] = (int)$customer['total_orders'];
        $customer['total_spent'] = (float)$customer['total_spent'];
        $customer['adoptions'] = (int)$customer['adoptions'];
        $customer['is_active'] = (bool)$customer['is_active'];
        $customer['phone'] = $customer['phone'] ?? '';
        $customer['location'] = $customer['location'] ?? '';

        return $customer;
    }

    /**
     * Update customer
     */
    public function updateCustomer(int $userId, array $data): array {
        // Validate customer exists
        $existingCustomer = $this->getCustomer($userId);
        
        // Update user table fields
        $userData = [];
        if (isset($data['first_name'])) $userData['first_name'] = $data['first_name'];
        if (isset($data['last_name'])) $userData['last_name'] = $data['last_name'];
        if (isset($data['email'])) $userData['email'] = $data['email'];
        if (isset($data['is_active'])) $userData['is_active'] = (int)$data['is_active'];

        if (!empty($userData)) {
            $success = $this->userModel->update($userId, $userData);
            if (!$success) {
                throw new Exception('Failed to update user information');
            }
        }

        // Update customer_users table fields
        $customerData = [];
        if (isset($data['phone'])) $customerData['phone'] = $data['phone'];
        if (isset($data['location'])) $customerData['location'] = $data['location'];

        if (!empty($customerData)) {
            // Check if customer_user record exists
            $customerUser = $this->customerUserModel->findByUserId($userId);
            if ($customerUser) {
                $success = $this->customerUserModel->update($userId, $customerData);
                if (!$success) {
                    throw new Exception('Failed to update customer profile');
                }
            } else {
                // Create customer_user record if it doesn't exist
                $phone = $data['phone'] ?? '';
                $location = $data['location'] ?? '';
                if ($phone || $location) {
                    $this->customerUserModel->create($userId, $phone, $location);
                }
            }
        }

        // Return updated customer
        return $this->getCustomer($userId);
    }

    /**
     * Delete customer (soft delete by setting is_active to 0)
     */
    public function deleteCustomer(int $userId): bool {
        // Verify customer exists
        $customer = $this->getCustomer($userId);
        
        // Soft delete by setting is_active to 0
        $success = $this->userModel->update($userId, ['is_active' => 0]);
        
        if (!$success) {
            throw new Exception('Failed to delete customer');
        }
        
        return true;
    }
}