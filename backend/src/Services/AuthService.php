<?php 

namespace App\Services;

use App\backend\config\Database;
use PDO;
use App\Models\AuthUser;
use App\Models\Session;
use App\Models\CustomerUser;
use App\Exceptions\AuthenticateException;
use App\Exceptions\ValidationException;
use App\Utils\Logger;
use App\Services\JWTService;
use App\Services\ValidationService;

class AuthService {
    private $authUserModel;
    private $sessionModel;
    private $customerUserModel;
    private $jwtService;
    private $validationService;
    
    //INIT DEPENDENCIES (for later reuse)
    public function __construct() {
        $this->authUserModel = new AuthUser();
        $this->sessionModel = new Session();
        $this->customerUserModel = new CustomerUser();
        $this->jwtService = new JWTService();
        $this->validationService = new ValidationService();
    }

    //REGISTER A NEW USER 
        public function register(array $userData): array {
            try {
                //VALIDATE INPUT DATA BASED ON ROLE
                $this->validationService->validateRegistration($userData);

                //CHECK IF EMAIL(current) ALREADY EXISTS
                if($this->authUserModel->emailExists($userData['email'])) {
                    throw new AuthenticateException('Email already exists');
                }

                //PREPARE BASE USER DATA
                $baseUserData = [
                    'email' => $userData['email'],
                    'password' => $userData['password'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'role' => $userData['role'],
                    'is_active' => 1
                ];

                //ADD ROLE-SPECIFIC FIELDS TO BASE USER DATA
                if($userData['role'] === 'customer') {
                    $baseUserData['phone'] = $userData['phone'] ?? null;
                    $baseUserData['address'] = $userData['address'] ?? null;
                }

                //CREATE USER in DB
                $userId = $this->authUserModel->create($baseUserData);
                $user = $this->authUserModel->findById($userId);
                if(!$user) {
                    throw new AuthenticateException('Failed to create user account');
                }
                //CREATE CUSTOMER PROFILE if role is customer and phone/location provided
                if($userData['role'] === 'customer') {
                    $phone = $userData['phone'] ?? null;
                    $location = $userData['location'] ?? $userData['address'] ?? null; // Support both 'location' and 'address'
                    
                    if ($phone && $location) {
                        try {
                            $this->customerUserModel->create($userId, $phone, $location);
                            Logger::info('Customer profile created', [
                                'user_id' => $userId,
                                'phone' => $phone
                            ]);
                        } catch (\Exception $e) {
                            Logger::warning('Failed to create customer profile', [
                                'user_id' => $userId,
                                'error' => $e->getMessage()
                            ]);
                            // Don't throw - user is created, profile can be added later
                        }
                    }
                }

                    //LOG USER SUCCESSFUL REGISTRATION
                    Logger::info('User registered successfully', [
                        'user_id' => $userId,
                        'email' => $userData['email'],
                        'role' => $userData['role']
                    ]);

                    //RETURN USER DATA WITH TOKENS FOR IMMEDIATE LOGIN
                    return $this->createAuthResponse($user);
                } 
                catch(ValidationException $e) {
                    Logger::warning('Registration validation failed', [
                        'email' => $userData['email'],
                        'errors' => $e->getErrors()
                    ]);
                    throw $e;
                }
                catch(AuthenticateException $e) {
                    Logger::error('Registration failed', [
                        'email' => $userData['email'],
                        'error' => $e->getMessage()
                    ]);
                    throw $e;
                }
                catch(\Exception $e) {
                    Logger::error('Unexpected registration error', [
                        'email' => $userData['email'] ?? 'unknown',
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]); 
                    throw new AuthenticateException('Registration failed due to server error');
                }
        }


        //LOGIN USER WITH EMAIL AND PASSWORD
        public function login(string $email, string $password, string | null $role = null): array {
            try {
            $ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

            // VALIDATE INPUT
            $this->validationService->validateLogin(['email' => $email, 'password' => $password, 'role' => $role]);

            // FIND USER
            $user = $this->authUserModel->findByEmail($email);
            if (!$user || !$user['is_active']) {
                throw new AuthenticateException('Invalid email');
            }

            // CHECK ROLE IF SPECIFIED
            if ($role && $user['role'] !== $role) {
                throw new AuthenticateException('Invalid role for this account');
            }

            // VERIFY PASSWORD
            if (!$user['password'] || !password_verify($password, $user['password'])) {
                throw new AuthenticateException('Invalid credentials');
            }

            // UPDATE LAST LOGIN
            $this->authUserModel->updateLastLogin($user['id']);

            // CREATE AUTH RESPONSE
            $result = $this->createAuthResponse($user);

            Logger::info('Login successful', [
                'user_id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role'],
                'ip' => $ipAddress
            ]);

            return $result;

            } 
            catch (AuthenticateException $e) {
                throw $e;
            } 
            catch (\Exception $e) {
                Logger::error('Login error', [
                    'error' => $e->getMessage(),
                    'email' => $email,
                    'ip' => $ipAddress
                ]);
                throw new AuthenticateException('Login failed. Please try again.');
            }
        }

        //REFRESH ACCESS TOKEN
        public function refresh(string $refreshToken): array {
            try {
                //VALIDATE REFRESH TOKEN (in DB session table)
                $session = $this->sessionModel->findByToken($refreshToken);
                if(!$session) {
                    Logger::warning('Invalid refresh token used', ['token' => substr($refreshToken, 0, 10), '...']);
                    throw new AuthenticateException('Invalid refresh token');
                }   

                $user = $this->authUserModel->findById($session['user_id']);
                if(!$user) {
                    Logger::error('User not found for valid refresh token', [
                        'user_id' => $session['user_id']
                    ]);
                    throw new AuthenticateException('User not found');
                }

                //CHECK IF ACCOUNT IS STILL ACTIVE
                if(!$user['is_active']) {
                    //DELETE THE SESSION FOR DEACTIVATED ACCOUNT
                    $this->sessionModel->delete($refreshToken);
                    throw new AuthenticateException('Account is deactivated');
                }

                //GENERATE NEW ACCESS TOKEN
                $accessToken = $this->jwtService->generateAccessToken($user);

                Logger::info('Token refreshed successfully', [
                    'user_id' => $user['id'],
                    'email' => $user['email']
                ]);

                return [
                    'access_token' => $accessToken,
                    'token_type' => 'Bearer',
                    'expires_in' => $_ENV['JWT_ACCESS_EXPIRES'],
                    'user' => $this->formatUserData($user)
                ];
            }
            catch (AuthenticateException $e) {
                throw $e;
            }
            catch (\Exception $e) {
                Logger::error('Token refresh error', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw new AuthenticateException('Token refresh failed');
            }
        }

        //LOGOUT USER (invalidated refresh token)
        public function logout(string $refreshToken): bool {
            try {
                $session = $this->sessionModel->findByRefreshToken($refreshToken);
                if($session) {
                    Logger::info('User logged out', [
                        'user_id' => $session['user_id']
                    ]);
                }
                return $this->sessionModel->delete($refreshToken);
            }
            catch (\Exception $e) {
                Logger::error('Logout error', [
                    'error' => $e->getMessage()
                ]);
                return false;  //DONT THROW EXCEPTION FROM LOGOUT
            }
        }

        //LOG OUT FROM ALL DEVICES
        public function logoutFromAllDevices(int $userId): bool {
            try {
                $result = $this->sessionModel->deleteUserSessions($userId);
                Logger::info('User logged out from all devices', [
                    'user_id' => $userId
                ]);

                return $result;
            }
            catch (\Exception $e) {
                Logger::error('Logout from all devices error', [
                    'user_id' => $userId,
                    'error' => $e->getMessage()
                ]);
                return false;
            }
        }

        //GET USER PROFILE WITH ROLE-SPECIFIC DATA
        public function getUserProfile(int $userId): array {
            try {
                $user = $this->authUserModel->findById($userId);
                if (!$user) {
                    throw new AuthenticateException('User not found');
                }

                // Return basic user data if no profile exists
                return [
                    'user_id' => $user['id'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'] ?? null, 
                    'address' => $user['address'] ?? null,
                ];
            } catch (\Exception $e) {
                Logger::error('Get user profile error', [
                    'user_id' => $userId,
                    'error' => $e->getMessage()
                ]);
                throw new AuthenticateException('Failed to retrieve user profile');
            }
        }

        //UPDATE USER PROFILE
        public function updateUserProfile(int $userId, array $updateData): array {
            try {
                //VALIDATE UPDATE DATA
                $this->validationService->validateProfileUpdate($updateData);
                $user = $this->authUserModel->findById($userId);
                if(!$user){
                    throw new AuthenticateException('User not found');
                }

                //SEPARATE USER DATA FORM TUTOR PROFILE DATA
                $userUpdateData = [];

                $allowedUserFields = ['first_name', 'last_name', 'phone', 'address' ];

                foreach($updateData as $key => $value) {
                    if(in_array($key, $allowedUserFields)) {
                        $userUpdateData[$key] = $value;
                    }
                }

                //UPDATE USER DATA
                if(!empty($userUpdateData)){
                    if(!$this->authUserModel->update($userId, $userUpdateData)){
                        throw new AuthenticateException('Failed to update user profile');
                    }
                }
                

                Logger::info('User profile updated', [
                    'user_id' => $userId,
                    'updated_fields' => array_keys($userUpdateData)
                ]);

                return $this->getUserProfile($userId); //RETURN UPDATED PROFILE
            }
            catch(ValidationException $e) {
                throw $e;
            }
            catch(AuthenticateException $e) {
                throw $e;
            }
            catch(\Exception $e){
                Logger::error('Update user profile error', [
                    'user_id' => $userId,
                    'error' => $e->getMessage()
                ]);
                throw new AuthenticateException('Failed to update profile');
            }
        }   

        //UPDATE STUDENT PROFILE PICTURE
        public function updateUserProfilePicture(int $userId, string $profilePicturePath): array {
            try {
                // Update user table
                if (!$this->authUserModel->update($userId, ['profile_picture' => $profilePicturePath])) {
                    return [
                        'success' => false,
                        'error' => 'Failed to update profile picture'
                    ];
                }

                Logger::info('User profile picture updated', [
                    'user_id' => $userId,
                    'profilePicture' => $profilePicturePath
                ]);

                return [
                    'success' => true,
                    'user' => $this->authUserModel->findById($userId),
                    'message' => 'Profile picture updated successfully'
                ];
            }
            catch (\Exception $e) {
                Logger::error('Update user profile picture error', [
                    'user_id' => $userId,
                    'error' => $e->getMessage()
                ]);
                
                return [
                    'success' => false,
                    'error' => 'An unexpected error occurred'
                ];
            }
        }

        //CREATE USER AUTHENTICATION RESPONSE WITH TOKENS 
        private function createAuthResponse(array $user): array {
            try {
                $accessToken = $this->jwtService->generateAccessToken($user);
                $refreshToken = $this->jwtService->generateRefreshToken();
        
                //STORE REFRESH TOKEN IN DATABASE
                 $sessionData = [
                    'user_id' => $user['id'],
                    'refresh_token' => $refreshToken,
                    'expires_at' => date('Y-m-d H:i:s', time() + $this->jwtService->getRefreshExpires()), // Changed: Use JWTService method
                    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
                ];
        
                if(!$this->sessionModel->create($sessionData)) {
                    throw new AuthenticateException('Failed to create session');
                }
        
                return [
                    'access_token' => $accessToken,
                    'refresh_token' => $refreshToken,
                    'token_type' => 'Bearer',
                    'expires_in' => $this->jwtService->getAccessExpires(),
                    'user' => $this->formatUserData($user), 
                ];
        
            }
            catch (\Exception $e) {
                Logger::error('create auth response error', [
                    'user_id' => $user['id'],
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                // Try to generate tokens anyway as fallback
                try {
                    $accessToken = $this->jwtService->generateAccessToken($user);
                    $refreshToken = $this->jwtService->generateRefreshToken();
                    
                    return [
                        'access_token' => $accessToken,
                        'refresh_token' => $refreshToken,
                        'token_type' => 'Bearer',
                        'expires_in' => $this->jwtService->getAccessExpires(),
                        'user' => $this->formatUserData($user),
                        'warning' => 'Session not stored - please login again if you experience issues'
                    ];
                } catch (\Exception $fallbackError) {
                    Logger::error('Fallback token generation also failed', [
                        'user_id' => $user['id'],
                        'error' => $fallbackError->getMessage()
                    ]);
                    
                    // Last resort - return user data without tokens
                    return [
                        'user' => $this->formatUserData($user),
                        'message' => 'User created successfully. Please login to continue.'
                    ];
                }
            }
        }   

        
        //FORMATE USER DATA FOR API RESPONSE
        private function formatUserData(array $user): array {
            
            
            return [
                'id' => (int)$user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role'],
                'is_active' => (bool)$user['is_active'],
                'last_login_at' => $user['last_login_at'] ?? null,
                'created_at' => $user['created_at'],
            ];
        }
}