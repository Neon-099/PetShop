<?php 

namespace App\Models;

use App\backend\config\Database;
use PDO;
use Exception;

class CustomerUser {
    private $db;
    private $table = 'customer_users';

    public function __construct(){
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Create customer user profile
     * 
     * @param int $userId User ID from users table
     * @param string $phone Phone number
     * @param string $location Location/Address
     * @return int Customer user ID
     */
    public function create(int $userId, string $phone, string $location): int {
        $query = "INSERT INTO {$this->table} (user_id, phone, location) 
            VALUES (:user_id, :phone, :location)";

        $stmt = $this->db->prepare($query);
        
        $params = [
            ':user_id' => $userId,
            ':phone' => $phone,
            ':location' => $location,
        ];

        if($stmt->execute($params)){
            return (int) $this->db->lastInsertId(); 
        }

        throw new Exception("Failed to create customer user profile");
    }

    /**
     * Find customer user by user_id
     * 
     * @param int $userId User ID
     * @return array|null Customer user data
     */
    public function findByUserId(int $userId): ?array {
        $query = "SELECT * FROM {$this->table} WHERE user_id = :user_id LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute([':user_id' => $userId]);

        $customer = $stmt->fetch(PDO::FETCH_ASSOC);
        return $customer ?: null;
    }

    /**
     * Update customer user profile
     * 
     * @param int $userId User ID
     * @param array $data Data to update
     * @return bool Success status
     */
    public function update(int $userId, array $data): bool {
        $fields = [];
        $params = [':user_id' => $userId];

        foreach($data as $key => $value){
            if (in_array($key, ['phone', 'location'])) {
                $fields[] = "{$key} = :{$key}";
                $params[":{$key}"] = $value;
            }
        }

        if(empty($fields)){
            return true;
        }

        $query = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE user_id = :user_id";
        $stmt = $this->db->prepare($query);
    
        return $stmt->execute($params);
    }
}