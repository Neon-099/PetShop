<?php 

//ENABLE ERROR REPORTING FOR DEVELOPMENT
error_reporting(E_ALL);
ini_set('display_errors', 1);  //NEVER DISPLAY ERRORS TO USER(ui)
ini_set('log_errors',1);

//LOAD COMPOSER AUTOLOADER
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

//LOAD ENVIRONMENT VARIABLE
if(file_exists(__DIR__ . '/../.env')){
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
}
if (!function_exists('config')) {
    function config(string $key, $default = null) {
        static $config = null;
        
        if ($config === null) {
            $configFile = __DIR__ . '/../config/App.php';
            if (file_exists($configFile)) {
                $config = require $configFile;
            } else {
                $config = [];
            }
        }
        
        // Support dot notation (e.g., 'app.blocked_email_domains')
        $keys = explode('.', $key);
        $value = $config;
        
        foreach ($keys as $k) {
            if (isset($value[$k])) {
                $value = $value[$k];
            } else {
                return $default;
            }
        }
        
        return $value;
    }
}
//HANDLE CORS
require_once __DIR__ .'/../config/HandleCors.php';
HandleCors();

//USE THE RESPONSE UTILITY
use App\Utils\Response;
use App\Utils\Logger;

try {
    //GET THE REQUEST URI and METHOD (raw request info) (sample: /api/users?id=42&sort=asc)
    $requestUri = $_SERVER['REQUEST_URI'] ?? '/';
    $requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    //REMOVE QUERY STRING FROM URI: so it need to be cleaned up(sample: /api/users)
    $requestUri = strtok($requestUri, '?');

    //REMOVE LEADING SLASHES FROM URI: so the route stays consisted (sample: /api/auth/login/ → api/auth/login)
    $requestUri = ltrim($requestUri, '/');

    //PARSE THE URI TO GET THE ROUTE AND METHOD: splits the path into parts so it can easily use for routing logic
    //(sample: api/auth/login → ['api', 'auth', 'login'])
    $uriParts = explode('/', $requestUri);

    routeRequest($uriParts, $requestMethod);
} catch (\Exception $e){
    Logger::error('Entry point error: ', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
    Response::serverError('An unexpected error occurred');
    
}

function routeRequest(array $uriParts, string $requestMethod, ){
    //HANDLE ROOT AND HEALTH CHECK
    if(empty($uriParts[0]) || $uriParts[0] === ''){
        Response::success( [
            'message' => 'Pet Shop API',
            'version' => '1.0.0',
            'status' => 'online'
        ], 'API is running');
        return;
    }

    //CHECK IF ITS AN API REQUEST: ensuring all request begins with api prefix 
    if($uriParts[0] !== 'api'){
        Response::error('Invalid request', 400);
        return;
    }

    //remove API from part: remove api prefix 
    array_shift($uriParts);

    //ROUTE TO APPROPRIATE CONTROLLER BASED ON URI STRUCTURE (validate to make sure resource exists)
    if(empty($uriParts[0])){
        Response::error('Invalid Request', 400);
        return;
    }

    //THEY DETERMINE WHAT THE RESOURCE AND ACTION ARE
    $resource = $uriParts[0]; //e.g. auth, users, products, etc.
    
    // Check if second part is numeric (ID) or an action
    $secondPart = $uriParts[1] ?? null;
    $id = null;
    $action = null;
    
    if ($secondPart !== null) {
        if (is_numeric($secondPart)) {
            // Second part is an ID (e.g., /api/products/1)
            $id = $secondPart;
        } else {
            // Second part is an action (e.g., /api/auth/login)
            $action = $secondPart;
            // Check if there's a third part that could be an ID
            $id = $uriParts[2] ?? null;
        }
    }

    //ROUTE TO AUTH endpoints
    if($resource === 'auth'){
        routeAuthRequest($action, $requestMethod);
        return;
    }

    //ROUTE TO PRODUCT ENDPOINTS
    if($resource === 'products'){
        routeProductRequest($action, $id, $requestMethod);
        return;
    }

    //ROUTE TO ADOPTION ENDPOINTS
    if($resource === 'adoptions'){
        routeAdoptionRequest($action, $id, $requestMethod);
        return;
    }

    //ROUTE TO CUSTOMER ENDPOINTS
    if($resource === 'customers'){
        routeCustomerRequest($action, $id, $requestMethod);
        return;
    }
    
    Response::error('Invalid Resource', 404);
}
function routeCustomerRequest(?string $action, ?string $id, string $requestMethod): void {
    $controller = new App\Controllers\CustomerController();
    
    // Handle ID-based routes (e.g., /api/customers/123)
    if ($id !== null && is_numeric($id)) {
        switch ($requestMethod) {
            case 'GET':
                $controller->show();
                break;
            case 'PUT':
            case 'PATCH':
                $controller->update();
                break;
            case 'DELETE':
                $controller->delete();
                break;
            default:
                Response::methodNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE']);
        }
        return;
    }
    
    // Handle list route
    if ($action === null) {
        // GET /api/customers
        if ($requestMethod === 'GET') {
            $controller->index();
        } else {
            Response::methodNotAllowed(['GET']);
        }
        return;
    }
    
    Response::error('Customer endpoint not found', 404);
}
function routeAdoptionRequest(?string $action, ?string $id, string $requestMethod): void {
    $controller = new App\Controllers\AdoptionController();
    
    // Handle ID-based routes (e.g., /api/adoptions/123)
    if ($id !== null && is_numeric($id)) {
        switch ($requestMethod) {
            case 'GET':
                $controller->show();
                break;
            case 'PUT':
            case 'PATCH':
                $controller->update();
                break;
            case 'DELETE':
                $controller->delete();
                break;
            default:
                Response::methodNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE']);
        }
        return;
    }
    
    // Handle action-based routes or list/create
    if ($action === null) {
        // GET /api/adoptions or POST /api/adoptions
        if ($requestMethod === 'GET') {
            $controller->index();
        } elseif ($requestMethod === 'POST') {
            $controller->create();
        } else {
            Response::methodNotAllowed(['GET', 'POST']);
        }
        return;
    }
    
    Response::error('Adoption endpoint not found', 404);
}
function routeProductRequest(?string $action, ?string $id, string $requestMethod): void {
    $controller = new App\Controllers\ProductController();
    
    // Handle ID-based routes (e.g., /api/products/123)
    if ($id !== null && is_numeric($id)) {
        switch ($requestMethod) {
            case 'GET':
                $controller->show();
                break;
            case 'PUT':
            case 'PATCH':
                $controller->update();
                break;
            case 'DELETE':
                $controller->delete();
                break;
            default:
                Response::methodNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE']);
        }
        return;
    }
    
    // Handle action-based routes or list/create
    if ($action === null) {
        // GET /api/products or POST /api/products
        if ($requestMethod === 'GET') {
            $controller->index();
        } elseif ($requestMethod === 'POST') {
            $controller->create();
        } else {
            Response::methodNotAllowed(['GET', 'POST']);
        }
        return;
    }
    
    // If action is provided but not numeric, it's an invalid endpoint
    Response::error('Product endpoint not found', 404);
}
function routeAuthRequest(string $action, string $requestMethod):void {
    $controller = new App\Controllers\AuthController();

    switch($action){
        case 'register': 
            if($requestMethod !== 'POST'){
                Response::error('Invalid Method', 405);
                return;
            }
            $controller->register();
            break;
        case 'login': 
            if($requestMethod !== 'POST'){
                Response::error('Invalid Method', 405);
                return;
            }
            $controller->login();
            break;
        case 'refresh': 
            if($requestMethod !== 'POST'){
                Response::error('Invalid Method', 405);
                return;
            }
            $controller->refresh();
            break;
        case 'logout':
            if($requestMethod !== 'POST'){
                Response::error('Invalid Method', 405); 
                return;
            }
            $controller->logout();
            break;
        case 'logoutAll':
            if($requestMethod !== 'POST'){
                $controller->logoutAll();
                return;
            }
            $controller->logoutAll();
            break;
        case 'profile':
            case 'me':
                if ($requestMethod !== 'GET') {
                    $controller->me();
                } elseif ($requestMethod !== 'PUT' || $requestMethod !== 'PATCH') {
                    $controller->updateProfile();
                } else {
                    Response::error('Method not allowed. Use GET or PUT', 405);
                }
                break;
                
            case 'password':
                if ($requestMethod !== 'POST') {
                    $controller->changePassword();
                } else {
                    Response::error('Method not allowed. Use POST', 405);
                }
                break;
                
            case 'forgotPassword':
                if ($requestMethod !== 'POST') {
                    Response::error('Method not allowed. Use POST', 405);
                    return;
                }
                $controller->forgotPassword();
                break;
                
            case 'resetPassword':
                if ($requestMethod !== 'POST') {
                    Response::error('Method not allowed. Use POST', 405);
                    return;
                }
                $controller->resetPassword();
                break;
                
        default:
            Response::error('Auth endpoint not found', 404);
            break;
    }  
}



