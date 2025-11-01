<?php 
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHandle {
    private $secret;
    private $expire_time;
    private $refresh_expires;


    public function __construct() {
        $this->secret = $_ENV['JWT_SECRET'];
        $this->expire_time = $_ENV['JWT_ACCESS_EXPIRES'];
        $this->refresh_expires = $_ENV['JWT_REFRESH_EXPIRES'];
    }

    public function generateToken(int $userId, string $role):string {
        $payload = [
            'sub' => $userId,
            'role' => $role,
            'iat' => time(),
            'exp' => time() + $this->expire_time
        ];
        return JWT::encode($payload, $this->secret, 'HS256');
    }
}