<?php 

function HandleCors() {
    $allowed_origins = explode(', ', $_ENV['CORS_ALLOWED_ORIGINS']);

    //GET THE ORIGIN OF THE REQUEST
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    //CHECK IF THE ORIGIN IS ALLOWED
    if(in_array($origin, $allowed_origins)){
        header("Access-Control-Allow-Origin: $origin");
    }

    //SET THE ALLOWED METHODS
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");

    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        http_response_code(200);
        exit();
    }
}