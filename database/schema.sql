--USERS TABLE 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--CUSTOMER USERS TABLE 
CREATE TABLE customer_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

--PRODUCTS TABLE 
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    weight DECIMAL(8, 2) DEFAULT NULL COMMENT 'Weight in kg or lbs',
    image_url VARCHAR(500) DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_sku (sku),
    INDEX idx_is_active (is_active)
);

--ADOPTIONS TABLE 
CREATE TABLE adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large') NOT NULL,
    color VARCHAR(100) DEFAULT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('Available', 'Adopted', 'Pending') NOT NULL DEFAULT 'Available',
    description TEXT,
    personality VARCHAR(255) DEFAULT NULL,
    medical_notes TEXT DEFAULT NULL,
    image_url VARCHAR(500) DEFAULT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_species (species),
    INDEX idx_status (status),
    INDEX idx_location (location),
    INDEX idx_is_active (is_active)
);