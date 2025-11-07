<?php

namespace App\Models;

use App\backend\config\Database;
use PDO;
use Exception;

class Adoption {
    private $db;
    private $table = 'adoptions';

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Find adoption by ID
     */
    public function findById(int $id): ?array {
        $query = "SELECT * FROM {$this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Create new adoption
     */
    public function create(array $adoptionData): int {
        $query = "INSERT INTO {$this->table} 
                  (name, species, breed, age, gender, size, color, location, status, 
                   description, personality, medical_notes, image_url, is_active) 
                  VALUES (:name, :species, :breed, :age, :gender, :size, :color, :location, 
                          :status, :description, :personality, :medical_notes, :image_url, :is_active)";
        
        $stmt = $this->db->prepare($query);
        $params = [
            ':name' => $adoptionData['name'],
            ':species' => $adoptionData['species'],
            ':breed' => $adoptionData['breed'],
            ':age' => $adoptionData['age'],
            ':gender' => $adoptionData['gender'],
            ':size' => $adoptionData['size'],
            ':color' => $adoptionData['color'] ?? null,
            ':location' => $adoptionData['location'],
            ':status' => $adoptionData['status'] ?? 'Available',
            ':description' => $adoptionData['description'] ?? null,
            ':personality' => $adoptionData['personality'] ?? null,
            ':medical_notes' => $adoptionData['medical_notes'] ?? null,
            ':image_url' => $adoptionData['image_url'] ?? null,
            ':is_active' => $adoptionData['is_active'] ?? 1,
        ];
        
        if ($stmt->execute($params)) {
            return (int)$this->db->lastInsertId();
        }
        
        throw new Exception('Failed to create adoption');
    }

    /**
     * Update adoption
     */
    public function update(int $id, array $adoptionData): bool {
        $allowedFields = ['name', 'species', 'breed', 'age', 'gender', 'size', 'color', 
                         'location', 'status', 'description', 'personality', 'medical_notes', 
                         'image_url', 'is_active'];
        $updates = [];
        $params = [':id' => $id];
        
        foreach ($allowedFields as $field) {
            if (isset($adoptionData[$field])) {
                $updates[] = "{$field} = :{$field}";
                $params[":{$field}"] = $adoptionData[$field];
            }
        }
        
        if (empty($updates)) {
            return false;
        }
        
        $query = "UPDATE {$this->table} SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute($params);
    }

    /**
     * Delete adoption (soft delete)
     */
    public function delete(int $id): bool {
        $query = "UPDATE {$this->table} SET is_active = 0 WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    /**
     * Hard delete adoption
     */
    public function hardDelete(int $id): bool {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    /**
     * Get all adoptions with pagination and filters
     */
    public function getAll(array $filters = [], int $page = 1, int $perPage = 20): array {
        $where = [];
        $params = [];
        
        // Filter by species
        if (!empty($filters['species'])) {
            $where[] = "species = :species";
            $params['species'] = $filters['species'];
        }
        
        // Filter by status
        if (!empty($filters['status'])) {
            $where[] = "status = :status";
            $params['status'] = $filters['status'];
        }
        
        // Filter by location
        if (!empty($filters['location'])) {
            $where[] = "location = :location";
            $params['location'] = $filters['location'];
        }
        
        // Filter by active status
        if (isset($filters['is_active'])) {
            $where[] = "is_active = :is_active";
            $params['is_active'] = $filters['is_active'];
        }
        
        // Search by name, breed, or description (case-insensitive)
        if (!empty($filters['search'])) {
            $where[] = "(LOWER(name) LIKE LOWER(:search) OR LOWER(breed) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search))";
            $params['search'] = '%' . $filters['search'] . '%';
        }
        
        $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
        
        // Get total count
        $countQuery = "SELECT COUNT(*) FROM {$this->table} {$whereClause}";
        $countStmt = $this->db->prepare($countQuery);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();
        
        // Get paginated results
        $offset = ($page - 1) * $perPage;
        $query = "SELECT * FROM {$this->table} {$whereClause} 
                  ORDER BY created_at DESC 
                  LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($query);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        return [
            'items' => $stmt->fetchAll(PDO::FETCH_ASSOC),
            'total' => $total
        ];
    }
}