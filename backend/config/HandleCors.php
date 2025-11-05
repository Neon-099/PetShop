<?php 

function HandleCors() {
    //GET THE ORIGIN OF THE REQUEST
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    //GET ALLOWED ORIGINS FROM ENVIRONMENT VARIABLES 
    $corsOriginsEnv = $_ENV['CORS_ALLOWED_ORIGINS'] ?? 'http://localhost:5173';
    $allowed_origins = explode(', ', $corsOriginsEnv);
    
    //TRIM WHITESPACE FROM EACH ORIGIN 
    $allowed_origins = array_map('trim', $allowed_origins);
    
    //REMOVE EMPTY VALUES
    $allowed_origins = array_filter($allowed_origins);
    
    //DEFAULT ALLOWED ORIGINS FOR DEVELOPMENT (if incase env var is not available)
    if(empty($allowed_origins)){
        $allowed_origins = ['http://localhost:5173'];
    }
    
    // Check if origin is allowed
    $isOriginAllowed = !empty($origin) && (in_array($origin, $allowed_origins) || in_array('*', $allowed_origins));
    
    // Handle preflight OPTIONS request FIRST
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // For preflight, ALWAYS return 200 OK with CORS headers if origin exists
        if (!empty($origin)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Max-Age: 86400");
            http_response_code(200);
        } else {
            http_response_code(200);
        }
        exit();
    }
    
    // For actual requests, ALWAYS set CORS headers if origin is present
    // This ensures ALL responses (including errors) have CORS headers
    if (!empty($origin)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Max-Age: 86400");
    }
}