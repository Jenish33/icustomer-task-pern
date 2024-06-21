/* Replace with your SQL commands */-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255)
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    data_category VARCHAR(100) NOT NULL,
    record_count INTEGER NOT NULL,
    fields TEXT[]
);

INSERT INTO users (username, password) VALUES
('icustomer', '$2a$10$0rYQ64Hah7qdTsLg9iw0pOrVOGhcPjaSOxIpC0OFPRYc.MhJZd5ii'); -- password: icustomer@123

-- Insert Sample Products
INSERT INTO products (name, data_category, record_count, fields) VALUES
('Product A', 'Firmographic', 100, ARRAY['Company name', 'Company address', 'Website']),
('Product B', 'Demographic', 200, ARRAY['First name', 'Last name', 'Age', 'Gender', 'Occupation']),
('Product C', 'Geographic', 150, ARRAY['Country', 'State', 'City', 'Postal code']),
('Product D', 'Financialistic', 150, ARRAY['Revenue', 'Profit', 'Market value', 'Assets', 'Liabilities']),
('Product E', 'Historic', 150, ARRAY['Event name', 'Event date', 'Location', 'Description']),
('Product F', 'Artistic', 150, ARRAY['Artist name', 'Art form', 'Title of work', 'Year created', 'Medium']),
('Product G', 'Culturistic', 150, ARRAY['Culture name', 'Tradition', 'Language', 'Festivals', 'Rituals']);

