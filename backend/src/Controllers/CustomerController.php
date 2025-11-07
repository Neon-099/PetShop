<?php

namespace App\Controllers;

use App\Services\CustomerService;
use App\Services\ValidationService;
use App\Middlewares\AuthMiddleware;
use App\Utils\Response;
use App\Utils\Logger;
use App\Exceptions\ValidationException;

class CustomerController {
    private $customerService;
    private $validationService;
    private $authMiddleware;

    public function __construct() {
        $this->customerService = new CustomerService();
        $this->validationService = new ValidationService();
        $this->authMiddleware = new AuthMiddleware();
    }

    /**
     * Get all customers (Admin only)
     * GET /api/customers?page=1&per_page=20&search=john&status=active
     */
    public function index(): void {
        try {
            // Require admin authentication
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can view customers');
                return;
            }

            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $perPage = isset($_GET['per_page']) ? min((int)$_GET['per_page'], 1000) : 20;
            
            $filters = [];
            if (isset($_GET['search'])) $filters['search'] = $_GET['search'];
            if (isset($_GET['status'])) $filters['status'] = $_GET['status'];
            
            $result = $this->customerService->getAllCustomers($filters, $page, $perPage);
            
            Response::paginated(
                $result['items'],
                $result['total'],
                $page,
                $perPage,
                'Customers retrieved successfully'
            );
        } catch (\Exception $e) {
            Logger::error('Get customers error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to retrieve customers');
        }
    }

    /**
     * Get single customer (Admin only)
     * GET /api/customers/{id}
     */
    public function show(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can view customer details');
                return;
            }

            $id = $this->getCustomerIdFromUri();
            if (!$id) {
                Response::error('Customer ID is required', 400);
                return;
            }

            $customer = $this->customerService->getCustomer($id);
            Response::success($customer, 'Customer retrieved successfully');
        } catch (\Exception $e) {
            Logger::error('Get customer error', ['error' => $e->getMessage()]);
            Response::notFound('Customer not found');
        }
    }

    /**
     * Update customer (Admin only)
     * PUT /api/customers/{id}
     */
    public function update(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can update customers');
                return;
            }

            $id = $this->getCustomerIdFromUri();
            if (!$id) {
                Response::error('Customer ID is required', 400);
                return;
            }

            $input = $this->getJsonInput();
            if (!$input) {
                Response::error('Invalid JSON data', 400);
                return;
            }

            // Validate customer update data
            $this->validateCustomerUpdate($input);

            $customer = $this->customerService->updateCustomer($id, $input);
            Response::success($customer, 'Customer updated successfully');
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors(), $e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Customer update error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to update customer');
        }
    }

    /**
     * Delete customer (Admin only) - soft delete
     * DELETE /api/customers/{id}
     */
    public function delete(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can delete customers');
                return;
            }

            $id = $this->getCustomerIdFromUri();
            if (!$id) {
                Response::error('Customer ID is required', 400);
                return;
            }

            $this->customerService->deleteCustomer($id);
            Response::success([], 'Customer deleted successfully');
        } catch (\Exception $e) {
            Logger::error('Customer delete error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to delete customer');
        }
    }

    /**
     * Validate customer update data
     */
    private function validateCustomerUpdate(array $data): void {
        $errors = [];

        if (isset($data['first_name']) && strlen($data['first_name']) > 255) {
            $errors['first_name'] = 'First name must be less than 255 characters';
        }

        if (isset($data['last_name']) && strlen($data['last_name']) > 255) {
            $errors['last_name'] = 'Last name must be less than 255 characters';
        }

        if (isset($data['phone']) && strlen($data['phone']) > 20) {
            $errors['phone'] = 'Phone must be less than 20 characters';
        }

        if (isset($data['location']) && strlen($data['location']) > 255) {
            $errors['location'] = 'Location must be less than 255 characters';
        }

        if (isset($data['is_active']) && !is_bool($data['is_active']) && !in_array($data['is_active'], [0, 1, '0', '1'])) {
            $errors['is_active'] = 'is_active must be a boolean';
        }

        if (!empty($errors)) {
            throw new ValidationException('Customer update validation failed', $errors);
        }
    }

    private function getJsonInput(): ?array {
        $json = file_get_contents('php://input');
        if (empty($json)) return null;
        $data = json_decode($json, true);
        return json_last_error() === JSON_ERROR_NONE ? $data : null;
    }

    private function getCustomerIdFromUri(): ?int {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $parts = explode('/', trim($uri, '/'));
        $idIndex = array_search('customers', $parts);
        if ($idIndex !== false && isset($parts[$idIndex + 1])) {
            return (int)$parts[$idIndex + 1];
        }
        return null;
    }
}