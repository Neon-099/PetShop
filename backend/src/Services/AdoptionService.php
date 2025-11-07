<?php

namespace App\Services;

use App\Models\Adoption;
use App\Exceptions\ValidationException;
use App\Exceptions\DatabaseException;
use App\Utils\Logger;

class AdoptionService {
    private $adoptionModel;

    public function __construct() {
        $this->adoptionModel = new Adoption();
    }

    /**
     * Create a new adoption
     */
    public function createAdoption(array $adoptionData): array {
        $adoptionId = $this->adoptionModel->create($adoptionData);
        $adoption = $this->adoptionModel->findById($adoptionId);
        
        if (!$adoption) {
            throw new DatabaseException('Failed to retrieve created adoption');
        }
        
        Logger::info('Adoption created', ['adoption_id' => $adoptionId, 'name' => $adoptionData['name']]);
        return $adoption;
    }

    /**
     * Update adoption
     */
    public function updateAdoption(int $id, array $adoptionData): array {
        $adoption = $this->adoptionModel->findById($id);
        
        if (!$adoption) {
            throw new ValidationException('Adoption not found', ['id' => ['Adoption does not exist']]);
        }
        
        $success = $this->adoptionModel->update($id, $adoptionData);
        
        if (!$success) {
            throw new DatabaseException('Failed to update adoption');
        }
        
        $updatedAdoption = $this->adoptionModel->findById($id);
        Logger::info('Adoption updated', ['adoption_id' => $id]);
        
        return $updatedAdoption;
    }

    /**
     * Get adoption by ID
     */
    public function getAdoption(int $id): array {
        $adoption = $this->adoptionModel->findById($id);
        
        if (!$adoption) {
            throw new ValidationException('Adoption not found', ['id' => ['Adoption does not exist']]);
        }
        
        return $adoption;
    }

    /**
     * Get all adoptions with filters
     */
    public function getAllAdoptions(array $filters = [], int $page = 1, int $perPage = 20): array {
        return $this->adoptionModel->getAll($filters, $page, $perPage);
    }

    /**
     * Delete adoption
     */
    public function deleteAdoption(int $id): bool {
        $adoption = $this->adoptionModel->findById($id);
        
        if (!$adoption) {
            throw new ValidationException('Adoption not found', ['id' => ['Adoption does not exist']]);
        }
        
        $success = $this->adoptionModel->delete($id);
        Logger::info('Adoption deleted', ['adoption_id' => $id]);
        
        return $success;
    }
}