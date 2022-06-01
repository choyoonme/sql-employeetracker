//Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql
    .createConnection(
        {
            host: 'localhost',
            user: 'root',
            database: 'employee_db'
        });

//connect and call prompt function
connection
    .connect();
connection
    .query(`SELECT * FROM employees`,
        function (err, results) {
            if (err) throw err
            prompt();
        });

//main function
async function prompt() {
    const answers = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choose action:',
                choices: [
                    'View All Employees',
                    'View By Department',
                    'View By Role',
                    'Add New Employee',
                    'Add Role',
                    'Add Department',
                    'Exit'
                ]
            }
        ])
        .then(answers => {
            switch (answers
                .choice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View By Department':
                    viewByDepartment();
                    break;
                case 'View By Role':
                    viewByRole();
                    break;
                case 'Add New Employee':
                    addEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Update Employee':
                    updateEmployee();
                    break;
                case 'EXIT':
                    connection
                        .end();
                    break;

            }
        })
};

// view all employees
function viewAllEmployees() {
    connection
        .query(
            `SELECT first_name, last_name 
            FROM employees 
            ORDER BY last_name;`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
                prompt();
            })
};

//view by department
function viewByDepartment() {
    connection
        .query(
            `SELECT employees.first_name, employees.last_name, departments.department_name 
            FROM roles 
            JOIN departments 
            ON departments.id = roles.departments_id 
            JOIN employees 
            ON employees.roles_id = roles.id;`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
                prompt();
            })
};

//view by role
function viewByRole() {
    connection
        .query(
            `SELECT employees.first_name, employees.last_name, roles.title_name 
            FROM employees 
            JOIN roles 
            ON employees.roles_id = roles.id;`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
                prompt();
            })
};

//add new employee
async function addEmployee() {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter First Name:'

            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter Last Name:'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Choose Role ID:',
                choices: [
                    { value: 1, name: 'Library Director' },
                    { value: 2, name: 'Head of Technical Services' },
                    { value: 3, name: 'Systems & Metadata Librarian' },
                    { value: 4, name: 'Head of Access Services' },
                    { value: 5, name: 'Electronic Resources & Serials Librarian' },
                    { value: 6, name: 'Reference Librarian' },
                    { value: 7, name: 'Library Clerk' }
                ]
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select Manager ID:',
                choices: [
                    { value: 1, name: 'Library Director' },
                    { value: 2, name: 'Head of Technical Services' },
                    { value: 3, name: 'Head of Access Services' },
                    { value: 4, name: 'Systems & Metadata Librarian' },
                    { value: 5, name: 'Electronic Resources & Serials Librarian' },
                    { value: 0, name: 'none' }
                ]
            },

        ])
    connection
        .query(
            `INSERT INTO employees(first_name, last_name, roles_id, manager_id) 
            VALUES ('${answers.firstName}', '${answers.lastName}' ,'${answers.role}','${answers.manager}');`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
            });
    connection
        .end();
};


//add role
async function addRole() {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'titleName',
                message: 'Enter Name of Title:'
            },
            {
                type: 'list',
                name: 'salary',
                message: 'Select Figure:',
                choices: [
                    '100000',
                    '90000',
                    '80000',
                    '75000',
                    '40000'
                ]
            },
            {
                type: 'list',
                name: 'departmentID',
                message: 'Select Department',
                choices: [
                    { value: 1, name: 'Administrative' },
                    { value: 2, name: 'Technical Services' },
                    { value: 3, name: 'Public Services' },
                    { value: 4, name: 'Support Staff' }
                ]
            }
        ])
    connection
        .query(
            `INSERT INTO roles(title_name, salary, departments_id) 
            VALUES ('${answers.titleName}', '${answers.salary}','${answers.departmentID}');`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
            });
    connection
        .end();
};


//add department
async function addDepartment() {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDept',
                message: 'Enter Department Name:'
            }
        ])
    connection
        .query(
            `INSERT INTO departments (department_name) 
            VALUES ('${answers.addDept}');`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
            });
};

//update employee
function updateEmployee() {
    const answers = inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Choose Employee to Update:',
                choices: []
            }
        ]);
    connection
        .query(
            `SELECT employees.last_name, roles.title 
            FROM employees 
            JOIN roles 
            ON employees.role_id = roles.id;`,
            function (err, results) {
                if (err) throw err
                console
                    .table(results)
            });
};