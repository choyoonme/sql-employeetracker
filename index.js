// Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const connection = mysql.createConnection({host: "localhost", user: "root", database: "employee_db"});

// connect and call prompt function
connection.connect(function (err, results) {
    if (err) {
        throw err
    };


    prompt();
});

// main function
async function prompt() {
    const answers = await inquirer.prompt([{
            type: "list",
            name: "choice",
            message: "Choose action:",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add New Employee",
                "Add Role",
                "Add Department",
                "Update Employee",
                "EXIT",
            ]
        },]).then((answers) => {
        switch (answers.choice) {
            case "View All Employees": viewAllEmployees();
                break;
            case "View All Departments": viewAllDepartments();
                break;
            case "View All Roles": viewAllRoles();
                break;
            case "Add New Employee": addEmployee();
                break;
            case "Add Role": addRole();
                break;
            case "Add Department": addDepartment();
                break;
            case "Update Employee": updateEmployee();
                break;
            case "EXIT": leaveApp();
                break;
        }

    });
}

// view all employees
function viewAllEmployees() {
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title_name, departments.department_name 
            AS departments, roles.salary, 
            CONCAT (managers.first_name, " ", managers.last_name) 
            AS manager 
            FROM employees
            LEFT JOIN roles 
            ON employees.roles_id = roles.id
            LEFT JOIN departments ON roles.departments_id = departments.id
            LEFT JOIN employees managers ON employees.manager_id = managers.id;`, function (err, results) {
        if (err) {
            throw err
        };


        console.table(results);
        prompt();
    });
}

// view by department
function viewAllDepartments() {
    connection.query(`SELECT departments.department_name, roles.title_name 
            FROM roles 
            JOIN departments 
            ON departments.id = roles.departments_id 
            JOIN employees 
            ON employees.roles_id = roles.id;`, function (err, results) {
        if (err) {
            throw err
        };


        console.table(results);
        prompt();
    });
}

// view by role
function viewAllRoles() {
    connection.query(`SELECT roles.title_name, roles.salary
            FROM employees 
            JOIN roles 
            ON employees.roles_id = roles.id;`, function (err, results) {
        if (err) {
            throw err
        };


        console.table(results);
        prompt();
    });
}

// add new employee
async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter First Name:"
        }, {
            type: "input",
            name: "lastName",
            message: "Enter Last Name:"
        }, {
            type: "list",
            name: "role",
            message: "Choose Role:",
            choices: [
                {
                    value: 1,
                    name: "Library Director"
                },
                {
                    value: 2,
                    name: "Head of Technical Services"
                },
                {
                    value: 3,
                    name: "Systems & Metadata Librarian"
                },
                {
                    value: 4,
                    name: "Head of Access Services"
                }, {
                    value: 5,
                    name: "Electronic Resources & Serials Librarian"
                }, {
                    value: 6,
                    name: "Reference Librarian"
                }, {
                    value: 7,
                    name: "Library Clerk"
                },
            ]
        }, {
            type: "list",
            name: "manager",
            message: "Select Manager:",
            choices: [
                {
                    value: 1,
                    name: "Library Director"
                },
                {
                    value: 2,
                    name: "Head of Technical Services"
                },
                {
                    value: 3,
                    name: "Head of Access Services"
                },
                {
                    value: 4,
                    name: "Systems & Metadata Librarian"
                }, {
                    value: 5,
                    name: "Electronic Resources & Serials Librarian"
                }, {
                    value: 0,
                    name: "none"
                },
            ]
        },
    ]);
    connection.query(`INSERT INTO employees(first_name, last_name, roles_id, manager_id) 
            VALUES ('${
        answers.firstName
    }', '${
        answers.lastName
    }' ,'${
        answers.role
    }','${
        answers.manager
    }');`, function (err, results) {
        if (err) {
            throw err
        };

        console.log("Employee Added!");
        prompt();
    });

}

// add role
async function addRole() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "titleName",
            message: "Enter Name of Title:"
        }, {
            type: "input",
            name: "salary",
            message: "Enter Salary:"
        }, {
            type: "list",
            name: "departmentID",
            message: "Select Department",
            choices: [
                {
                    value: 1,
                    name: "Administrative"
                }, {
                    value: 2,
                    name: "Technical Services"
                }, {
                    value: 3,
                    name: "Public Services"
                }, {
                    value: 4,
                    name: "Support Staff"
                },
            ]
        },
    ]);
    connection.query(`INSERT INTO roles(title_name, salary, departments_id) 
            VALUES ('${
        answers.titleName
    }', '${
        answers.salary
    }','${
        answers.departmentID
    }');`, function (err, results) {
        if (err) {
            throw err
        };


        console.log("Role Added!");
        prompt();
    });
}

// add department
async function addDepartment() {
    const answers = await inquirer.prompt([{
            type: "input",
            name: "addDept",
            message: "Enter Department Name:"
        },]);
    connection.query(`INSERT INTO departments (department_name) 
            VALUES ('${
        answers.addDept
    }');`, function (err, results) {
        if (err) {
            throw err
        };

        console.log("Department Added!");
        prompt();
    });
}

// update employee
function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployee',
            message: 'Enter Employee ID to Update:'
        }, {
            type: 'input',
            name: "updateRole",
            message: "Enter ID of New Role:"
        },
    ]).then(function (results) {
        const updateEmployee = results.updateEmployee;
        const updateRole = results.updateRole;
        const queryUpdate = `UPDATE employees 
        SET roles_id = '${updateRole}' 
        WHERE id = '${updateEmployee}'`;
        connection.query(queryUpdate, function (err, results) {
            if (err) {
                throw err
            };


        })

        console.log("Updated!")
        console.table(results);
        prompt();
    });
}

// exit function
function leaveApp() {
    console.log('Bye!')
    connection.end()
    process.exit();
}
