<?php 

     return [
        'app' => [
            'name' => $_ENV['APP_NAME'] ??'Pet Shop',
            'app_version' => '1.0.0',
            'debug' => $_ENV['APP_DEBUG'] ?? false,
            'timezone' => $_ENV['APP_TIMEZONE'] ?? 'UTC',
            'log_level' => $_ENV['APP_LOG_LEVEL'] ?? 'info',
        ],

        'jwt' => [
            'secret' => $_ENV['JWT_SECRET'] ?? 'b9ffe076bd39063d15858a48eee1def8',
            'access_expires' => $_ENV['JWT_ACCESS_EXPIRES'] ?? '',
            'refresh_expires' => $_ENV['JWT_REFRESH_EXPIRES'] ?? '',
            'algorithm' => 'HS256' //ALGO for JWT to verify the authenticity and integrity of data
        ],

        'cors' => [
            'allowed_origins' => explode(', ',$_ENV['CORS_ALLOWED_ORIGINS']) ?? 'http://localhost:5173',
            'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],
            'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
            'allowed_credentials' => true,
        ],
        
        'database' => [
            'host' => $_ENV['DB_HOST'] ?? 'localhost',
            'port' => $_ENV['DB_PORT'] ?? 3306,
            'username' => $_ENV['DB_USERNAME'] ?? 'root',
            'password' => $_ENV['DB_PASSWORD'] ?? '',
            'database' => $_ENV['DB_DATABASE'] ?? 'petshop_db',
        ],
    ];