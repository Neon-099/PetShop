<?php 

namespace App\Models;

use backend\config\Database;
use PDO;
use Exception;

class AuthUser {
    private $db;
    private $table = 'users';

    public function __construct(){
        $this->db = Database::getInstance();
    }

    public function findById(string $userId):? array {
        $query = "SELECT * FROM {this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $userId]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?: null;
    }
    public function findByEmail(string $email):? array {
        $query = "SELECT * FROM {$this->table} WHERE email = :email LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['email' => $email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?? null;
    }

    public function create(array $userData):? int {
        $query = "INSERT INTO {$this->table} (first_name, last_name, email, password, role, is_active) 
            VALUES (:first_name, :last_name, :email, :password, :role, :is_active)";

        $stmt = $this->db->prepare($query);

        //PASSWORD HANDLING  with PASSWORD_ARGON2ID for better security(better than bycript)
        $passwordHashing = isset($userData['password']) 
           ? password_hash($userData['password'], PASSWORD_ARGON2ID)
           : null; 
        
           $params = [
            ':first_name' => $userData['first_name'],
            ':last_name' => $userData['last_name'],
            ':email' => $userData['email'],
            ':password' => $passwordHashing,
            ':role' => $userData['role'] ?? 'customer', 
            ':is_active' => $userData['is_active'] ?? 1,
           ];

           if($stmt->execute($params)){
                return (int) $this->db->lastInsertId(); 
           }

        throw new Exception("Failed to create user");
    }

    public function update(int $userId, array $userData): bool {

        $fields = [];
        $params = [':id' => $userId];

        foreach($userData as $key => $value){
            $fields[] = "{$key} = :{$key}";
            $params[":{$key}"] = $value;
        }

        if(empty($fields)){
            return true;
        }

        $query = "UPDATE {$this->table} SET" . implode(', ', $fields) . "WHERE id = :id";
        $stmt = $this->db->prepare($query);
    
        return $stmt->execute($params);
    }

    public function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    public function emailExists(string $email): bool {
        return $this->findByEmail($email) !== null;
    }

    public function isActive(int $userId): int {
        return $this->update($userId, ['is_active' => 1]);
    }

    public function delete(int $id): bool {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    public function updateLastLogin(int $id): bool{
        $query = "UPDATE {$this->table} SET last_activity = NOW() WHERE id = : id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    public function updateLastActivity(int $id): bool {
        $query = " UPDATE {$this->table} SET last_activity = NOW() WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id' , $id);
        return $stmt->execute();
    }

    public function findByApiKey(string $apiKey): array {
        $query = "SELECT * FROM {$this->table} WHERE api_key = :api_key AND is_active = 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':api_key', $apiKey);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?? null;
    }


}