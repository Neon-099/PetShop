<?php 

namespace App\Services;

use App\Utils\Validator;
use App\Exceptions\ValidationException;
use App\Utils\Logger;

class ValidationService 
{
    private $validator;

    public function __construct() 
    {
        $this->validator = new Validator();
    }

    /**
     * Validate registration data based on user role
     */
    public function validateRegistration(array $data): void{
        try {
            // Reset validator for new validation
            $this->validator = new Validator();
            
            // Common validation rules
            $this->validator
                ->required($data, ['email', 'first_name', 'last_name', 'role'])
                ->email($data, 'email')
                ->maxLength($data, 'first_name', 50)
                ->maxLength($data, 'last_name', 50)
                ->in($data, 'role', ['customer', 'admin']);

                if (!isset($data['google_id'])) {
                    $this->validator
                        ->required($data, ['password'])
                        ->minLength($data, 'password', 8)
                        ->maxLength($data, 'password', 128);
                    
                    // Advanced password validation (call separately, not chained)
                    if (isset($data['password']) && !empty($data['password'])) {
                        $this->validatePasswordStrength($data['password']);
                    }
                }
            
            // Role-specific validation
            if (isset($data['role'])) {
                if ($data['role'] === 'customer') {
                    $this->validateCustomerRegistration($data);
                } elseif ($data['role'] === 'admin') {
                    $this->validateAdminRegistration($data);
                }
            }

            // Check for validation failures
            if ($this->validator->fails()) {
                throw new ValidationException('Registration validation failed', $this->validator->getErrors());
            }

        } catch (ValidationException $e) {
            Logger::debug('Registration validation failed', [
                'email' => $data['email'] ?? 'unknown',
                'role' => $data['role'] ?? 'unknown',
                'errors' => $e->getErrors()
            ]);
            throw $e;
        }
    }

    /**
     * Validate student-specific registration data
     */
    private function validateAdminRegistration(array $data): void{
        // Admin registration typically requires an admin code or invitation
        // This can be optional for now, but you might want to require it
        if (isset($data['admin_code']) && !empty($data['admin_code'])) {
            $this->validator
                ->minLength($data, 'admin_code', 6)
                ->maxLength($data, 'admin_code', 50);
            
            // Validate admin code format (alphanumeric, case-sensitive)
            if (isset($data['admin_code']) && !preg_match('/^[A-Za-z0-9]+$/', $data['admin_code'])) {
                $this->validator->addError('admin_code', 'Admin code must be alphanumeric');
            }
            
            // Optional: Check if admin code is valid (you can implement this check against a database or config)
            // $validAdminCodes = config('app.admin_codes', []);
            // if (!in_array($data['admin_code'], $validAdminCodes)) {
            //     $this->validator->addError('admin_code', 'Invalid admin code');
            // }
        }
        
        // Optional phone number for admin (for contact purposes)
        if (isset($data['phone']) && !empty($data['phone'])) {
            $this->validator
                ->minLength($data, 'phone', 10)
                ->maxLength($data, 'phone', 20);
            
            if (isset($data['phone']) && !preg_match('/^[\d\s\-\(\)\+]+$/', $data['phone'])) {
                $this->validator->addError('phone', 'Phone number format is invalid');
            }
        }
        
        // Optional department/role within admin (if you have different admin types)
        if (isset($data['admin_department']) && !empty($data['admin_department'])) {
            $allowedDepartments = ['management', 'sales', 'support', 'inventory', 'operations'];
            if (!in_array(strtolower($data['admin_department']), $allowedDepartments)) {
                $this->validator->addError('admin_department', 'Invalid admin department');
            }
        }
    }

    private function validateCustomerRegistration(array $data): void{
        // Optional phone number validation (if provided)
        if (isset($data['phone']) && !empty($data['phone'])) {
            $this->validator
                ->minLength($data, 'phone', 10)
                ->maxLength($data, 'phone', 20);
            
            // Basic phone format validation (numbers, spaces, dashes, parentheses)
            if (isset($data['phone']) && !preg_match('/^[\d\s\-\(\)\+]+$/', $data['phone'])) {
                $this->validator->addError('phone', 'Phone number format is invalid');
            }
        }
        
        // Optional address validation (if provided)
        if (isset($data['address']) && !empty($data['address'])) {
            $this->validator->maxLength($data, 'address', 255);
        }
        
        // Optional date of birth validation (if provided)
        if (isset($data['date_of_birth']) && !empty($data['date_of_birth'])) {
            // Validate date format (YYYY-MM-DD)
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['date_of_birth'])) {
                $this->validator->addError('date_of_birth', 'Date of birth must be in YYYY-MM-DD format');
            } else {
                // Check if date is valid and not in the future
                $date = strtotime($data['date_of_birth']);
                if ($date === false || $date > time()) {
                    $this->validator->addError('date_of_birth', 'Date of birth must be a valid past date');
                }
            }
        }
        
        // Optional pet preferences (if provided)
        if (isset($data['preferred_pet_types']) && !empty($data['preferred_pet_types'])) {
            if (is_array($data['preferred_pet_types'])) {
                $allowedTypes = ['dog', 'cat', 'bird', 'fish', 'reptile', 'small_animal', 'other'];
                foreach ($data['preferred_pet_types'] as $type) {
                    if (!in_array(strtolower($type), $allowedTypes)) {
                        $this->validator->addError('preferred_pet_types', "Pet type '{$type}' is not allowed");
                        break;
                    }
                }
            }
        }
    }

    /**
     * Validate password strength
     */
    public function validatePasswordStrength(string $password): void{
        $errors = [];
        
        // Check minimum length (already checked in main validation)
        if (strlen($password) < 8) {
            $errors[] = 'Password must be at least 8 characters long';
        }

        // Check for at least one lowercase letter
        if (!preg_match('/[a-z]/', $password)) {
            $errors[] = 'Password must contain at least one lowercase letter';
        }

        // Check for at least one uppercase letter
        if (!preg_match('/[A-Z]/', $password)) {
            $errors[] = 'Password must contain at least one uppercase letter';
        }

        // Check for at least one digit
        if (!preg_match('/\d/', $password)) {
            $errors[] = 'Password must contain at least one number';
        }

        // Check for at least one special character
        if (!preg_match('/[^a-zA-Z\d]/', $password)) {
            $errors[] = 'Password must contain at least one special character';
        }

        // Check for common weak passwords
        $commonPasswords = [
            'password', 'password123', '123456', '123456789', 'qwerty',
            'abc123', 'password1', 'admin', 'letmein', 'welcome'
        ];
        
        if (in_array(strtolower($password), $commonPasswords)) {
            $errors[] = 'Password is too common. Please choose a more secure password';
        }

        if (!empty($errors)) {
            $this->validator->addErrors(['password' => $errors]);
        }
    }

    /**
     * Validate login data
     */
    public function validateLogin(array $data): void{
        try {
            $this->validator = new Validator();
            
            $this->validator
                ->required($data, ['email', 'password'])
                ->email($data, 'email')
                ->minLength($data, 'password', 1); // Basic check, actual verification in auth service

            // Optional role validation
            if (isset($data['role'])) {
                $this->validator->in($data, 'role', ['customer', 'admin']);
            }

            if ($this->validator->fails()) {
                throw new ValidationException('Login validation failed', $this->validator->getErrors());
            }

        } catch (ValidationException $e) {
            Logger::debug('Login validation failed', [
                'email' => $data['email'] ?? 'unknown',
                'errors' => $e->getErrors()
            ]);
            throw $e;
        }
    }

   

    /**
     * Validate profile update data
     */
    public function validateProfileUpdate(array $data): void{
        try {
            $this->validator = new Validator();
            
            // Only validate provided fields
            if (isset($data['first_name'])) {
                $this->validator
                    ->required($data, ['first_name'])
                    ->maxLength($data, 'first_name', 50);
            }

            if (isset($data['last_name'])) {
                $this->validator
                    ->required($data, ['last_name'])
                    ->maxLength($data, 'last_name', 50);
            }

            if (isset($data['student_id'])) {
                $this->validator
                    ->maxLength($data, 'student_id', 50)
                    ->alphanumeric($data, 'student_id');
            }

            // Tutor-specific field validation
            if (isset($data['specialization'])) {
                $this->validator->maxLength($data, 'specialization', 200);
            }

            if (isset($data['bio'])) {
                $this->validator->maxLength($data, 'bio', 2000);
            }

            if (isset($data['experience_years'])) {
                $this->validator
                    ->numeric($data, 'experience_years')
                    ->min($data, 'experience_years', 0)
                    ->max($data, 'experience_years', 50);
            }

            if (isset($data['hourly_rate'])) {
                $this->validator
                    ->numeric($data, 'hourly_rate')
                    ->min($data, 'hourly_rate', 0)
                    ->max($data, 'hourly_rate', 1000);
            }

            if (isset($data['qualifications'])) {
                $this->validator->maxLength($data, 'qualifications', 1000);
            }

            if ($this->validator->fails()) {
                throw new ValidationException('Profile update validation failed', $this->validator->getErrors());
            }

        } catch (ValidationException $e) {
            Logger::debug('Profile update validation failed', [
                'errors' => $e->getErrors()
            ]);
            throw $e;
        }
    }

    /**
     * Validate refresh token request
     */
    public function validateRefreshToken(array $data): void{
        try {
            $this->validator = new Validator();
            
            $this->validator
                ->required($data, ['refresh_token'])
                ->minLength($data, 'refresh_token', 10);

            if ($this->validator->fails()) {
                throw new ValidationException('Refresh token validation failed', $this->validator->getErrors());
            }

        } catch (ValidationException $e) {
            Logger::debug('Refresh token validation failed', [
                'errors' => $e->getErrors()
            ]);
            throw $e;
        }
    }

    /**
     * Validate password change request
     */
    public function validatePasswordChange(array $data): void{
        try {
            $this->validator = new Validator();
            
            // Check if we have either 'old_password' or 'current_password'
            if (!isset($data['old_password']) && !isset($data['current_password'])) {
                throw new ValidationException('Current password is required', ['current_password' => ['Current password is required']]);
            }
            
            // Normalize the field name
            if (isset($data['current_password']) && !isset($data['old_password'])) {
                $data['old_password'] = $data['current_password'];
                unset($data['current_password']);
            }
            
            // Validate required fields
            $this->validator
                ->required($data, ['old_password', 'new_password'])
                ->minLength($data, 'old_password', 1)
                ->minLength($data, 'new_password', 8)
                ->maxLength($data, 'new_password', 128);
    
            // Validate new password strength
            if (isset($data['new_password'])) {
                $this->validatePasswordStrength($data['new_password']);
            }
    
            // Ensure new password is different from old password
            if (isset($data['old_password']) && isset($data['new_password'])) {
                if ($data['old_password'] === $data['new_password']) {
                    $this->validator->addErrors(['new_password' => ['New password must be different from current password']]);
                }
            }
    
            // Optional: validate password confirmation if provided
            if (isset($data['new_password_confirmation'])) {
                if ($data['new_password'] !== $data['new_password_confirmation']) {
                    $this->validator->addErrors(['new_password_confirmation' => ['Passwords do not match']]);
                }
            }
    
            if ($this->validator->fails()) {
                throw new ValidationException('Password change validation failed', $this->validator->getErrors());
            }
    
        } catch (ValidationException $e) {
            Logger::debug('Password change validation failed', [
                'errors' => $e->getErrors()
            ]);
            throw $e;
        }
    }

    /**
     * Validate email format (enhanced version)
     */
    public function validateEmailFormat(string $email): bool{
        // Basic format validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        // Additional checks
        $domain = substr(strrchr($email, '@'), 1);
        
        // Check for valid domain format
        if (!$domain || strlen($domain) < 3) {
            return false;
        }

        // Check for disposable email domains (optional)
        $disposableDomains = $_ENV['BLOCKED_EMAIL_DOMAINS'] ?? [];
        if (in_array($domain, $disposableDomains)) {
            return false;
        }

        return true;
    }

    /**
     * Validate file upload (for profile pictures, documents)
     */
    public function validateFileUpload(array $file, array $allowedTypes = [], int $maxSize = 5242880): array{
        $errors = [];

        // Check if file was uploaded
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            $errors[] = 'No file uploaded or upload failed';
            return $errors;
        }

        // Check file size (default 5MB)
        if ($file['size'] > $maxSize) {
            $errors[] = 'File size exceeds maximum allowed size (' . number_format($maxSize / 1048576, 1) . 'MB)';
        }

        // Check file type
        if (!empty($allowedTypes)) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);

            if (!in_array($mimeType, $allowedTypes)) {
                $errors[] = 'File type not allowed. Allowed types: ' . implode(', ', $allowedTypes);
            }
        }

        // Check for upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            switch ($file['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $errors[] = 'File too large';
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $errors[] = 'File upload incomplete';
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $errors[] = 'No file selected';
                    break;
                default:
                    $errors[] = 'File upload error';
            }
        }

        return $errors;
    }

    /**
     * Sanitize input data
     */
    public function sanitizeInput(array $data): array{
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Remove HTML tags and trim whitespace
                $sanitized[$key] = trim(strip_tags($value));
            } elseif (is_array($value)) {
                // Recursively sanitize arrays
                $sanitized[$key] = $this->sanitizeInput($value);
            } else {
                // Keep other data types as is
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }

    public function validateProduct(array $data): void {
        try {
            $this->validator = new Validator();
            
            $this->validator
                ->required($data, ['sku', 'name', 'category', 'price'])
                ->maxLength($data, 'sku', 100)
                ->maxLength($data, 'name', 255)
                ->maxLength($data, 'category', 100)
                ->numeric($data, 'price')
                ->min($data, 'price', 0);
            
            // SKU format validation (alphanumeric, dashes, underscores)
            if (isset($data['sku']) && !preg_match('/^[A-Z0-9\-_]+$/i', $data['sku'])) {
                $this->validator->addError('sku', 'SKU must contain only letters, numbers, dashes, and underscores');
            }
            
            // Optional fields
            if (isset($data['description'])) {
                $this->validator->maxLength($data, 'description', 5000);
            }
            
            if (isset($data['quantity'])) {
                $this->validator
                    ->numeric($data, 'quantity')
                    ->min($data, 'quantity', 0);
            }
            
            if (isset($data['weight'])) {
                $this->validator
                    ->numeric($data, 'weight')
                    ->min($data, 'weight', 0);
            }
            
            if (isset($data['image_url'])) {
                $this->validator->maxLength($data, 'image_url', 50000);
                // Validate URL format - all file types are allowed
                if (!filter_var($data['image_url'], FILTER_VALIDATE_URL)) {
                    $this->validator->addError('image_url', 'Invalid image URL format');
                }
            }
            
            if ($this->validator->fails()) {
                throw new ValidationException('Product validation failed', $this->validator->getErrors());
            }
        } catch (ValidationException $e) {
            throw $e;
        }
    }
    
    /**
     * Validate product update data
     */
    public function validateProductUpdate(array $data): void {
        try {
            $this->validator = new Validator();
            
            // Only validate provided fields
            if (isset($data['sku'])) {
                $this->validator
                    ->maxLength($data, 'sku', 100);
                if (!preg_match('/^[A-Z0-9\-_]+$/i', $data['sku'])) {
                    $this->validator->addError('sku', 'SKU must contain only letters, numbers, dashes, and underscores');
                }
            }
            
            if (isset($data['name'])) {
                $this->validator->maxLength($data, 'name', 255);
            }
            
            if (isset($data['category'])) {
                $this->validator->maxLength($data, 'category', 100);
            }
            
            if (isset($data['price'])) {
                $this->validator
                    ->numeric($data, 'price')
                    ->min($data, 'price', 0);
            }
            
            if (isset($data['quantity'])) {
                $this->validator
                    ->numeric($data, 'quantity')
                    ->min($data, 'quantity', 0);
            }
            
            if (isset($data['weight'])) {
                $this->validator
                    ->numeric($data, 'weight')
                    ->min($data, 'weight', 0);
            }
            
            if (isset($data['description'])) {
                $this->validator->maxLength($data, 'description', 5000);
            }
            
            if (isset($data['image_url'])) {
                $this->validator->maxLength($data, 'image_url', 50000);
                // Validate URL format - all file types are allowed
                if (!filter_var($data['image_url'], FILTER_VALIDATE_URL)) {
                    $this->validator->addError('image_url', 'Invalid image URL format');
                }
            }
            
            if ($this->validator->fails()) {
                throw new ValidationException('Product update validation failed', $this->validator->getErrors());
            }
        } catch (ValidationException $e) {
            throw $e;
        }
    }
    public function validateAdoption(array $data): void {
        try {
            $this->validator = new Validator();
            
            $this->validator
                ->required($data, ['name', 'species', 'breed', 'age', 'gender', 'size', 'location'])
                ->maxLength($data, 'name', 255)
                ->maxLength($data, 'species', 50)
                ->maxLength($data, 'breed', 100)
                ->maxLength($data, 'age', 50)
                ->maxLength($data, 'color', 100)
                ->maxLength($data, 'location', 255)
                ->maxLength($data, 'personality', 255);
            
            // Validate gender
            if (isset($data['gender'])) {
                $this->validator->in($data, 'gender', ['Male', 'Female']);
            }
            
            // Validate size
            if (isset($data['size'])) {
                $this->validator->in($data, 'size', ['Small', 'Medium', 'Large', 'Extra Large']);
            }
            
            // Validate status
            if (isset($data['status'])) {
                $this->validator->in($data, 'status', ['Available', 'Adopted', 'Pending']);
            }
            
            // Optional fields
            if (isset($data['description'])) {
                $this->validator->maxLength($data, 'description', 5000);
            }
            
            if (isset($data['medical_notes'])) {
                $this->validator->maxLength($data, 'medical_notes', 2000);
            }
            
            if (isset($data['image_url'])) {
                $this->validator->maxLength($data, 'image_url', 50000);
                // Validate URL format or data URI - all file types are allowed
                $isValidUrl = filter_var($data['image_url'], FILTER_VALIDATE_URL);
                $isDataUri = preg_match('/^data:[^;]+(;base64)?,.*$/', $data['image_url']);
                if (!$isValidUrl && !$isDataUri) {
                    $this->validator->addError('image_url', 'Invalid image URL format');
                }
            }
            
            if ($this->validator->fails()) {
                throw new ValidationException('Adoption validation failed', $this->validator->getErrors());
            }
        } catch (ValidationException $e) {
            throw $e;
        }
    }
    
    /**
     * Validate adoption update data
     */
    public function validateAdoptionUpdate(array $data): void {
        try {
            $this->validator = new Validator();
            
            // Only validate provided fields
            if (isset($data['name'])) {
                $this->validator->maxLength($data, 'name', 255);
            }
            
            if (isset($data['species'])) {
                $this->validator->maxLength($data, 'species', 50);
            }
            
            if (isset($data['breed'])) {
                $this->validator->maxLength($data, 'breed', 100);
            }
            
            if (isset($data['age'])) {
                $this->validator->maxLength($data, 'age', 50);
            }
            
            if (isset($data['gender'])) {
                $this->validator->in($data, 'gender', ['Male', 'Female']);
            }
            
            if (isset($data['size'])) {
                $this->validator->in($data, 'size', ['Small', 'Medium', 'Large', 'Extra Large']);
            }
            
            if (isset($data['status'])) {
                $this->validator->in($data, 'status', ['Available', 'Adopted', 'Pending']);
            }
            
            if (isset($data['color'])) {
                $this->validator->maxLength($data, 'color', 100);
            }
            
            if (isset($data['location'])) {
                $this->validator->maxLength($data, 'location', 255);
            }
            
            if (isset($data['personality'])) {
                $this->validator->maxLength($data, 'personality', 255);
            }
            
            if (isset($data['description'])) {
                $this->validator->maxLength($data, 'description', 5000);
            }
            
            if (isset($data['medical_notes'])) {
                $this->validator->maxLength($data, 'medical_notes', 2000);
            }
            
            if (isset($data['image_url'])) {
                $this->validator->maxLength($data, 'image_url', 50000);
                // Validate URL format or data URI - all file types are allowed
                $isValidUrl = filter_var($data['image_url'], FILTER_VALIDATE_URL);
                $isDataUri = preg_match('/^data:[^;]+(;base64)?,.*$/', $data['image_url']);
                if (!$isValidUrl && !$isDataUri) {
                    $this->validator->addError('image_url', 'Invalid image URL format');
                }
            }
            
            if ($this->validator->fails()) {
                throw new ValidationException('Adoption update validation failed', $this->validator->getErrors());
            }
        } catch (ValidationException $e) {
            throw $e;
        }
    }
}