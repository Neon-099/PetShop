<?php

namespace App\Controllers;

use App\Services\ProductService;
use App\Services\ValidationService;
use App\Middlewares\AuthMiddleware;
use App\Utils\Response;
use App\Utils\Logger;
use App\Exceptions\ValidationException;
use App\Exceptions\DatabaseException;

class ProductController {
    private $productService;
    private $validationService;
    private $authMiddleware;

    public function __construct() {
        $this->productService = new ProductService();
        $this->validationService = new ValidationService();
        $this->authMiddleware = new AuthMiddleware();
    }

    /**
     * Create product (Admin only)
     * POST /api/products
     */
    public function create(): void {
        try {
            // Require admin authentication
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can create products');
                return;
            }

            $input = $this->getJsonInput();
            if (!$input) {
                Response::error('Invalid JSON data', 400);
                return;
            }

            // Validate product data
            $this->validationService->validateProduct($input);

            // Create product
            $product = $this->productService->createProduct($input);

            Response::created(
                $product,
                'Product created successfully',
                "/api/products/{$product['id']}"
            );
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors(), $e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Product creation error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            Response::serverError('Failed to create product');
        }
    }

    /**
     * Get all products (Public or with filters)
     * GET /api/products?page=1&per_page=20&category=dog&search=food
     */
    public function index(): void {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $perPage = isset($_GET['per_page']) ? min((int)$_GET['per_page'], 100) : 20;
            
            $filters = [];
            if (isset($_GET['category'])) $filters['category'] = $_GET['category'];
            if (isset($_GET['search'])) $filters['search'] = $_GET['search'];
            if (isset($_GET['is_active'])) $filters['is_active'] = (int)$_GET['is_active'];
            
            $result = $this->productService->getAllProducts($filters, $page, $perPage);
            
            Response::paginated(
                $result['items'],
                $result['total'],
                $page,
                $perPage,
                'Products retrieved successfully'
            );
        } catch (\Exception $e) {
            Logger::error('Get products error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to retrieve products');
        }
    }

    /**
     * Get single product
     * GET /api/products/{id}
     */
    public function show(): void {
        try {
            $id = $this->getProductIdFromUri();
            if (!$id) {
                Response::error('Product ID is required', 400);
                return;
            }

            $product = $this->productService->getProduct($id);
            Response::success($product, 'Product retrieved successfully');
        } catch (ValidationException $e) {
            Response::notFound($e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Get product error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to retrieve product');
        }
    }

    /**
     * Update product (Admin only)
     * PUT /api/products/{id}
     */
    public function update(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can update products');
                return;
            }

            $id = $this->getProductIdFromUri();
            if (!$id) {
                Response::error('Product ID is required', 400);
                return;
            }

            $input = $this->getJsonInput();
            if (!$input) {
                Response::error('Invalid JSON data', 400);
                return;
            }

            $this->validationService->validateProductUpdate($input);
            $product = $this->productService->updateProduct($id, $input);

            Response::success($product, 'Product updated successfully');
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors(), $e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Product update error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to update product');
        }
    }

    /**
     * Delete product (Admin only)
     * DELETE /api/products/{id}
     */
    public function delete(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can delete products');
                return;
            }

            $id = $this->getProductIdFromUri();
            if (!$id) {
                Response::error('Product ID is required', 400);
                return;
            }

            $this->productService->deleteProduct($id);
            Response::success([], 'Product deleted successfully');
        } catch (ValidationException $e) {
            Response::notFound($e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Product delete error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to delete product');
        }
    }

    private function getJsonInput(): ?array {
        $json = file_get_contents('php://input');
        if (empty($json)) return null;
        $data = json_decode($json, true);
        return json_last_error() === JSON_ERROR_NONE ? $data : null;
    }

    private function getProductIdFromUri(): ?int {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $parts = explode('/', trim($uri, '/'));
        $idIndex = array_search('products', $parts);
        if ($idIndex !== false && isset($parts[$idIndex + 1])) {
            return (int)$parts[$idIndex + 1];
        }
        return null;
    }
}