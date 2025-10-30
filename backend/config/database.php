<?php 




class Database {
    private $servername;
    private $username;
    private $password;
    private $name;
    private $port;
    private $charset;
    private $conn;


    public function __construct($db_servername, $db_username, $db_password, $db_name){
        $this->servername = $_ENV['DB_HOST'];
        $this->name = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASS'];
        $this->port = $_ENV['DB_PORT'] ?? 3306;
        $this->charset = $_ENV['DB_CHARSET'] ?? 'utf8mb4';  
        
        $this->connect();
    }

    public function connect(): void{
        //DATA SOURCE 
        $dsn = "mysql:host={$this->servername};
                dbname={$this->name};
                port={$this->port};
                charset={$this->charset}";  
    }
    

}
