DROP DATABASE IF EXISTS 
employee_db;
CREATE DATABASE 
employee_db;

USE 
employee_db;

CREATE TABLE 
departments 
(
    id SERIAL NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE 
roles 
(
    id SERIAL NOT NULL,
    title_name VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    departments_id INT,
    PRIMARY KEY (id)
 );

 CREATE TABLE 
 employees 
 (
     id SERIAL NOT NULL,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     roles_id INT,
     manager_id INT,
     PRIMARY KEY (id)
 );