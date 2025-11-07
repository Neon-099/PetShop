<?php 

namespace App\Models;

use App\backend\config\Database;
use PDO;
use Exception;

class Product {
    private $db;
    private $table = 'products';

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    //FIND BY PRODUCT ID
    public function findById(int $id):? array {
        $query = "SELECT * FROM {$this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function findBySku(string $sku) :? array {
        $query = "SELECT * FROM {$this->table} WHERE sku = :sku LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['sku'=> $sku]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function skuExists(string $sku, ?int $excludeId = null): bool {
        $query = "SELECT COUNT(*) FROM {$this->table} WHERE sku = :sku";
        $params = ['sku' => $sku];

        if($excludeId !== null){
            $query .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return (int) $stmt->fetchColumn() > 0;
    }

    public function create(array $productData): int {
        $query = "INSERT INTO {$this->table} 
            (sku, name, description, category, price, quantity, weight, image_url, is_active)
        VALUES (:sku, :name, :description, :category, :price, :quantity, :weight, :image_url, :is_active)";

        $stmt = $this->db->prepare($query);
        $params = [
            ':sku' => $productData['sku'],
            ':name' => $productData['name'],
            ':description' => $productData['description'] ?? null,
            ':category' => $productData['category'],
            ':price' => $productData['price'],
            ':quantity' => $productData['quantity'] ?? 0,
            ':weight' => $productData['weight'] ?? null,
            ':image_url' => $productData['image_url'] ?? null,
            ':is_active' => $productData['is_active'] ?? 1,
        ];

        if($stmt->execute($params)){
            return (int) $this->db->lastInsertId();
        }

        throw new Exception("Failed to create product");
    }

    public function update(int $id, array $productData): bool {
        $allowedFields = ['sku', 'name', 'description', 'category', 'price', 'quantity', 'weight', 'image_url', 'is_active'];
        $updates = [];
        $params = [':id' => $id];

        foreach($allowedFields as $field){
            if(isset($productData[$field])){
                $updates[] = "{$field} = :{$field}";
                $params[":{$field}"] = $productData[$field] ?? null; 
            }
        }

        if(empty($updates)){
            return false;
        }

        $query = "UPDATE {$this->table} SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute($params);
    }
    
    public function delete(int $id): bool {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    public function getAll(array $filters = [], int $page = 1, int $perPage = 20): array{
        $where = [];
        $params = [];

        //FILTER BY CATEGORY
        if(!empty($filters['category'])){
            $where[] = "category = :category";
            $params['category'] = $filters['category'];
        }

        //SEARCH BY NAME, SKU, OR DESCRIPTION (case-insensitive)
        if(!empty($filters['search'])){
            $where[] = "(LOWER(name) LIKE LOWER(:search) OR LOWER(sku) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search))";
            $params['search'] = "%{$filters['search']}%";
        }

        $whereClause = !empty($where) ? "WHERE ". implode(' AND ', $where) : '';

        //GET TOTAL COUNT 
        $countQuery = "SELECT COUNT(*) FROM {$this->table} {$whereClause}";
        $countStmt = $this->db->prepare($countQuery);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        //GET PAGINATED RESULTS
        $offset = ($page - 1) * $perPage;
        $query = "SELECT * FROM {$this->table} {$whereClause} 
            ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($query);
        foreach($params as $key => $value){
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

