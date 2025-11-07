<?php

namespace App\Services;

use App\Models\Product;
use App\Exceptions\ValidationException;
use App\Exceptions\DatabaseException;
use App\Utils\Logger;

class ProductService {
    private $productModel;

    public function __construct() {
        $this->productModel = new Product();
    }

    /**
     * Create a new product
     */
    public function createProduct(array $productData): array {
        // Check if SKU already exists
        if ($this->productModel->skuExists($productData['sku'])) {
            throw new ValidationException('SKU already exists', ['sku' => ['This SKU is already in use']]);
        }
        
        $productId = $this->productModel->create($productData);
        $product = $this->productModel->findById($productId);
        
        if (!$product) {
            throw new DatabaseException('Failed to retrieve created product');
        }
        
        Logger::info('Product created', ['product_id' => $productId, 'sku' => $productData['sku']]);
        return $product;
    }

    /**
     * Update product
     */
    public function updateProduct(int $id, array $productData): array {
        $product = $this->productModel->findById($id);
        
        if (!$product) {
            throw new ValidationException('Product not found', ['id' => ['Product does not exist']]);
        }
        
        // Check SKU uniqueness if SKU is being updated
        if (isset($productData['sku']) && $productData['sku'] !== $product['sku']) {
            if ($this->productModel->skuExists($productData['sku'], $id)) {
                throw new ValidationException('SKU already exists', ['sku' => ['This SKU is already in use']]);
            }
        }
        
        $success = $this->productModel->update($id, $productData);
        
        if (!$success) {
            throw new DatabaseException('Failed to update product');
        }
        
        $updatedProduct = $this->productModel->findById($id);
        Logger::info('Product updated', ['product_id' => $id]);
        
        return $updatedProduct;
    }

    /**
     * Get product by ID
     */
    public function getProduct(int $id): array {
        $product = $this->productModel->findById($id);
        
        if (!$product) {
            throw new ValidationException('Product not found', ['id' => ['Product does not exist']]);
        }
        
        return $product;
    }

    /**
     * Get all products with filters
     */
    public function getAllProducts(array $filters = [], int $page = 1, int $perPage = 20): array {
        return $this->productModel->getAll($filters, $page, $perPage);
    }

    /**
     * Delete product
     */
    public function deleteProduct(int $id): bool {
        $product = $this->productModel->findById($id);
        
        if (!$product) {
            throw new ValidationException('Product not found', ['id' => ['Product does not exist']]);
        }
        
        $success = $this->productModel->delete($id);
        Logger::info('Product deleted', ['product_id' => $id]);
        
        return $success;
    }
}