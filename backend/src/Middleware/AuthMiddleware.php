<?php 

namespace App\Middlewares;

use App\Services\JWTService;
use App\Models\AuthUser;
use App\Utils\Response;
use App\Utils\Logger;
use App\Exceptions\AuthenticateException;

class AuthMiddleware {
    private $jwtService;
    private $userModel;
    private $excludedRoute;

    public function __construct() {
        $this->jwtService = new JWTService();
        $this->userModel = new AuthUser;
        
        $this->excludedRoute = [
            '/api/v1/auth/register',
            '/api/v1/auth/login',
            '/api/v1/auth/refresh',
            '/api/v1/auth/logout',
            '/api/v1/health',
            '/api/v1/status'
        ];
    }

    //HANDLE AUTHENTICATION MIDDLEWARE
    public function handle(string | null $requestPath) :? array {
        try {
            $currentPath = $requestPath ?? $this->getCurrentPath();

            //CHECK IF ROUTE IS EXCLUDE FORM AUTHENTICATION
            if($this->isExcludedRoute($currentPath)){
                Logger::Debug("Route excluded from authentication");
                return null;
            }

        //GET TOKEN FROM REQUEST HEADER 
        $token = $this->getTokenFromHeader();
        if(!$token){
            Logger::warning("Authorization token required", [
                'path' => $currentPath,
                'ip' => $_SERVER['REMOTE_ADDR'],
                'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            ]);
            
            Response::unauthorized("Authorization token required");
            return null;
        }


        //VERIFY AND DECODE TOKEN
        $userData = $this->verifyToken($token);
        if(!$userData){
            Logger::debug("Invalid or expired token");
            return null;  
        }

        //VALIDATE USER STILL EXISTS AND ACTIVE 
        $dbUser = $this->validateUserInDatabase($userData['user_id']);
        if(!$dbUser){
            Logger::warning("User not found or inactive",[
                'user_id' => $userData['user_id'],
                'path' => $currentPath
            ]);
            return null;
        }

        //MERGE TOKEN DATA WITH FRESH DATABASE DATA
        $enrichUserData = $this->enrichUserData($userData, $dbUser);

        //LOG SUCCESSFUL AUTHENTICATION
        Logger::info("User authentication Successful", [
            'user_id' => $userData['user_id'],
            'email' => $userData['email'],
            'role' => $userData['role'],
            'path' => $currentPath
        ]);
        return $enrichUserData;
        } catch (AuthenticateException $e){
            Logger::error("Authentication failed", [
                'error' => $e->getMessage(),
                'path' => $currentPath ?? 'unknown',
            ]);
            return null;
            
        } catch (\Exception $e){
            Logger::error("Authentication failed", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'path' => $currentPath ?? 'unknown',
            ]);
            return null;
        }
    }


    public function verifyToken(string $token):? array {
        try{
            $decoded = $this->jwtService->decodeToken($token);

            if(!isset($decoded['user']) || !isset($decoded['user'])){
                Logger::warning("Invalid missing user data");
                return null;
            }

            $user = (array) $decoded['user'];

            //VALIDATE REQUIRED USER FIELDS
            $requiredFields = ['user_id', 'email', 'role'];
            foreach($requiredFields as $field){
                if(!isset($user[$field])){
                    Logger::warning("Token missing required user field", ['field' => $field]);
                    return null;
                }
            }

            //CHECK TOKEN EXPIRATION WITH BUFFER
            if(isset($decoded['exp'])) {
                $expiryTime = $decoded['exp'];
                $currentTime = time();

                if($currentTime >= $expiryTime){
                    Logger::debug('Token expired', [
                        'exp' => $expiryTime,
                        'current' => $currentTime
                    ]);
                    return null;
                }

                //WARN IF TOKEN EXPIRES SOON  (within 5 minutes)
                if($currentTime + 300 >= $expiryTime){
                    Logger::warning("Token expires soon", [
                        'user_id' => $user['user_id'],
                        'expires_in' => $expiryTime - $currentTime
                    ]);
                }
            }
        
            return $user;
        } catch (\Exception $e){
            Logger::error("Token verification failed", [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    private function validateUserInDatabase(int $userId):? array {
        try {
            $user = $this->userModel->findById($userId);
            if(!$user){
                Logger::warning("User not found in database", ['user_id' => $userId]);
                return null;
            }

            if(!$user['is_active']){
                Logger::warning("User is inactive", [
                    'user_id' => $userId,
                    'email' => $user['email'],
                ]);
                return null;
            }
   
            return $user;
        } catch (\Exception $e){
            Logger::error("Database error while validating user", [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    private function enrichUserData(array $tokenData, array $dbData): array {
        return [
            'user_id' =>(int) $dbData['user_id'],
            'email' => $dbData['email'],
            'role' => $dbData['role'],
            'first_name' => $dbData['first_name'],
            'last_name' => $dbData['last_name'],
            'is_active' => $dbData['is_active'],
            'created_at' => $dbData['created_at'],
            'updated_at' => $dbData['updated_at'],

            'token_issued_at' => $tokenData['iat'] ?? null,
            'token_expires_at' => $tokenData['exp'] ?? null,
        ];
    }

    private function updateLastActivity(int $userId): void {
        try {
            $this->userModel->updateLastActivity($userId);
        } catch (\Exception $e){
            Logger::error("Failed to update last activity", [
                'user_id' => $userId,
                'error' => $e->geTMessage(),
            ]);
        }
    }

    private function getCurrentPath(): string {
        $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

        //REMOVE BACKEND PREFIX (if present)
        $path = preg_replace('/^\/api\/v1/', '', $path);
        return rtrim($path, '/' ) ?? '/';
    }

    private function isExcludedRoute(string $path): bool {
        return in_array($path, $this->excludedRoute);
    }

    public function addExcludedRoute($routes): void {
        $routes = is_array($routes) ? $routes : [$routes];
        $this->excludedRoute = array_merge($this->excludedRoute, $routes);
    }

    public function hasValidToken(): bool{ 
        try {
            $token = $this->jwtService->getTokenFromHeader();
            return $token && $this->verifyToken($token) !== null;
        } catch (\Exception $e){
            return false;
        }
    }

    public function getCurrentUser():? array{
        try{
            return $this->handle(null);
        } catch (\Exception $e){
            return null;
        }
    }

    public function validateApiKey():?array {
        try {
            $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
            if(!$apiKey){
                return null;
            }

            try {
                $user = $this->userModel->findByApiKey($apiKey);
                if($user && $user['is_active']){
                    Logger::info("API KEY authentication successful", [
                        'user_id' => $user['user_id'],
                        'api_key_prefix' => substr($apiKey, 0, 8) . '...',
                    ]);
                    return $this->enrichUserData(['user_id' => $user['id']], $user);
                }
            } catch (\Exception $e){
                Logger::error("Api key validation error", [
                    'error' => $e->getMessage()
                ]);
            }
        }
        return null;
    }
}