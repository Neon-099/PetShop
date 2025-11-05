<?php 
 
namespace App\backend\config;  //IMPORTANT TO USE THE CORRECT NAMESPACE (it just like a folder path that need to like exporting )

use PDO;
use PDOException;
use Exception;

class Database {
    private static $instance = null; //SINGLETON INSTANCE
    //OBJECTS PROPERTIES    
    private PDO $connection;
 
    private $servername;
    private $username;
    private $password;
    private $database;
    private $port;
    private $charset;



    public function __construct(){
        $this->servername = $_ENV['DB_HOST'];
        $this->database = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USER'];
        $this->password = $_ENV['DB_PASS'];
        $this->port = $_ENV['DB_PORT'] ?? 3306;
        $this->charset = $_ENV['DB_CHARSET'] ?? 'utf8mb4';  
        
        $this->connect();
    }
    public static function getInstance() {
        if(self::$instance === null){
            self::$instance = new Database();
        }
        return self::$instance;   //TO USE SINGLETON INSTANCE (saves memory, consistent connection)
    }
    public function connect(): void{
        //DATA SOURCE 
        $dsn = "mysql:host={$this->servername};dbname={$this->database};port={$this->port};charset={$this->charset}";  

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false, //PREVENT SQL INJECTION (PREPARE STATEMENT = PREPARE AND EXECUTE THE QUERY)
            PDO::ATTR_STRINGIFY_FETCHES => true //CONNECTION POOLING
        ];
        
        try {
            $this->connection = new PDO (
                $dsn,
                $this->username,
                $this->password,
                $options
            );     
        } catch (PDOException $e){
            error_log("Connection failed:" . $e->getMessage());
            throw new Exception("Connection failed: ");
        }
    }


    public function getConnection(): PDO {
        return $this->connection;
    }

    //PREVENT CLONING OF THE DATABASE OBJECT (to make sure that it only make single instance of the database object)
    private function __clone(){}

    //
    public function __wakeup(){
        throw new Exception("Cannot unserialize a singleton.");
    }

}
