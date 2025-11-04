<?php 

use Dotenv\Dotenv;
require_once __DIR__ . '/../../vendor/autoload.php';

if(file_exists(__DIR__ . '/../../.env')){
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();
}

require_once __DIR__ . '/../../config/HandleCors.php';
HandleCors();

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    \App\Utils\Response::error('Invalid Method', 405);
    exit;
}

$controller = new App\Controllers\AuthController();
$controller->register();