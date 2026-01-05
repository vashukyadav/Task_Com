-- High-level database design (simplified)

CREATE TABLE companies (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE warehouses (
  id INT PRIMARY KEY,
  company_id INT,
  name VARCHAR(255),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  company_id INT,
  name VARCHAR(255),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2)
);

CREATE TABLE inventory (
  id INT PRIMARY KEY,
  product_id INT,
  warehouse_id INT,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE suppliers (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  contact_email VARCHAR(255)
);
