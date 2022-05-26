//Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_db'
    });

//connect and call prompt function
connection.connect();
connection.query(`SELECT * FROM employees`,
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
            switch (answers.choice) {
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
                case 'EXIT':
                    connection.end();
                    break;

            }
        })
};

// view all employees
function viewAllEmployees() {
    connection
        .query('SELECT first_name, last_name FROM employees;',
            function (err, results) {
                if (err) throw err
                console.table(results)
                prompt();
            })
};

//view by department
function viewByDepartment() {
    connection.query('SELECT department_name FROM departments;',
        function (err, results) {
            if (err) throw err
            console.table(results)
            prompt();
        })
};

//view by role
function viewByRole() {
    connection.query('SELECT title_name FROM roles;',
        function (err, results) {
            if (err) throw err
            console.table(results)
            prompt();
        })
};

//add new employee
async function addEmployee() {
    const answers = await inquirer.prompt([
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
            message: 'Choose Role:',
            choices: [
                'Library Director',
                'Systems & Metadata Librarian',
                'Access Services Librarian',
                'Electronic Resources & Serials Librarian',
                'Reference Librarian',
                'Assistant Librarian',
                'Library Clerk'
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select Manager:',
            choices: ''
        }
    ])
};


//add role

//add department

//exit
