<?php

namespace App\Controllers;

use App\Services\AdoptionService;
use App\Services\ValidationService;
use App\Middlewares\AuthMiddleware;
use App\Utils\Response;
use App\Utils\Logger;
use App\Exceptions\ValidationException;
use App\Exceptions\DatabaseException;

class AdoptionController {
    private $adoptionService;
    private $validationService;
    private $authMiddleware;

    public function __construct() {
        $this->adoptionService = new AdoptionService();
        $this->validationService = new ValidationService();
        $this->authMiddleware = new AuthMiddleware();
    }

    /**
     * Create adoption (Admin only)
     * POST /api/adoptions
     */
    public function create(): void {
        try {
            // Require admin authentication
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can create adoptions');
                return;
            }

            $input = $this->getJsonInput();
            if (!$input) {
                Response::error('Invalid JSON data', 400);
                return;
            }

            // Validate adoption data
            $this->validationService->validateAdoption($input);

            // Create adoption
            $adoption = $this->adoptionService->createAdoption($input);

            Response::created(
                $adoption,
                'Adoption created successfully',
                "/api/adoptions/{$adoption['id']}"
            );
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors(), $e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Adoption creation error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            Response::serverError('Failed to create adoption');
        }
    }

    /**
     * Get all adoptions (Public or with filters)
     * GET /api/adoptions?page=1&per_page=20&species=Dog&status=Available
     */
    public function index(): void {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $perPage = isset($_GET['per_page']) ? min((int)$_GET['per_page'], 100) : 20;
            
            $filters = [];
            if (isset($_GET['species'])) $filters['species'] = $_GET['species'];
            if (isset($_GET['status'])) $filters['status'] = $_GET['status'];
            if (isset($_GET['location'])) $filters['location'] = $_GET['location'];
            if (isset($_GET['search'])) $filters['search'] = $_GET['search'];
            if (isset($_GET['is_active'])) $filters['is_active'] = (int)$_GET['is_active'];
            
            $result = $this->adoptionService->getAllAdoptions($filters, $page, $perPage);
            
            Response::paginated(
                $result['items'],
                $result['total'],
                $page,
                $perPage,
                'Adoptions retrieved successfully'
            );
        } catch (\Exception $e) {
            Logger::error('Get adoptions error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to retrieve adoptions');
        }
    }

    /**
     * Get single adoption
     * GET /api/adoptions/{id}
     */
    public function show(): void {
        try {
            $id = $this->getAdoptionIdFromUri();
            if (!$id) {
                Response::error('Adoption ID is required', 400);
                return;
            }

            $adoption = $this->adoptionService->getAdoption($id);
            Response::success($adoption, 'Adoption retrieved successfully');
        } catch (ValidationException $e) {
            Response::notFound($e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Get adoption error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to retrieve adoption');
        }
    }

    /**
     * Update adoption (Admin only)
     * PUT /api/adoptions/{id}
     */
    public function update(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can update adoptions');
                return;
            }

            $id = $this->getAdoptionIdFromUri();
            if (!$id) {
                Response::error('Adoption ID is required', 400);
                return;
            }

            $input = $this->getJsonInput();
            if (!$input) {
                Response::error('Invalid JSON data', 400);
                return;
            }

            $this->validationService->validateAdoptionUpdate($input);
            $adoption = $this->adoptionService->updateAdoption($id, $input);

            Response::success($adoption, 'Adoption updated successfully');
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors(), $e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Adoption update error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to update adoption');
        }
    }

    /**
     * Delete adoption (Admin only)
     * DELETE /api/adoptions/{id}
     */
    public function delete(): void {
        try {
            $user = $this->authMiddleware->requireAuth();
            if ($user['role'] !== 'admin') {
                Response::forbidden('Only admins can delete adoptions');
                return;
            }

            $id = $this->getAdoptionIdFromUri();
            if (!$id) {
                Response::error('Adoption ID is required', 400);
                return;
            }

            $this->adoptionService->deleteAdoption($id);
            Response::success([], 'Adoption deleted successfully');
        } catch (ValidationException $e) {
            Response::notFound($e->getMessage());
        } catch (\Exception $e) {
            Logger::error('Adoption delete error', ['error' => $e->getMessage()]);
            Response::serverError('Failed to delete adoption');
        }
    }

    private function getJsonInput(): ?array {
        $json = file_get_contents('php://input');
        if (empty($json)) return null;
        $data = json_decode($json, true);
        return json_last_error() === JSON_ERROR_NONE ? $data : null;
    }

    private function getAdoptionIdFromUri(): ?int {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $parts = explode('/', trim($uri, '/'));
        $idIndex = array_search('adoptions', $parts);
        if ($idIndex !== false && isset($parts[$idIndex + 1])) {
            return (int)$parts[$idIndex + 1];
        }
        return null;
    }
}