const mysql = require('mysql2');
const inquirer = require('inquirer');
//running console.table code, no variable
require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
    });

function addEmployee() {
    const sql = `INSERT INTO employees(id, first_name, last_name, role_id, department_id)VALUES(3, 'neil', 'young', 1, 1)`

    connection.query(sql, function (err, results) {
        if (err) throw err;
    })
}

async function main() {
    connection.connect();
    connection.query(`SELECT * FROM employees`,
        function (err, results) {
            if (err) throw err;
        });
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter employee ID:'

        },
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name:'
        }
    ]);
    console.log(`looking up emp id ${answers.id}`)
    connection.query(`SELECT * FROM employees WHERE id = ${answers.id});`, function (err, results) {
        if (err) throw err;
        console.table(results)
    });
    connection.query(`INSERT INTO employees(first_name, last_name) VALUES ('${answers.firstName}', '${answers.lastName}'
    );`, function (err, results) {
        if (err) throw err;
        console.table(results)
    });
    connection.end();
};

main().then(() => {
    console.log('goodbye');
})
    .catch(console.log);


//prompt user to enter employee id
//take id and query the database for that user
//SELECT * FROM employees WHERE id = whatever the user gave us
//print result as a table

// //mysql> SELECT * FROM employees;
// +----+------------+-----------+---------+---------------+
// | id | first_name | last_name | role_id | department_id |
// +----+------------+-----------+---------+---------------+
// |  1 | bob        | dylan     |       1 |             1 |
// |  2 | paul       | mccartney |       1 |             2 |
// +----+------------+-----------+---------+---------------+
// 2 rows in set (0.00 sec)

// mysql> SELECT * FROM empoyees WHERE department_id = 2;
// ERROR 1146 (42S02): Table 'employee_db.empoyees' doesn't exist
// mysql> SELECT * FROM employees WHERE department_id = 2;
// +----+------------+-----------+---------+---------------+
// | id | first_name | last_name | role_id | department_id |
// +----+------------+-----------+---------+---------------+
// |  2 | paul       | mccartney |       1 |             2 |
// +----+------------+-----------+---------+---------------+
// 1 row in set (0.00 sec)

// mysql> SELECT employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles ON employees.role_id = roles.id;
// +------------+-----------+--------+
// | first_name | last_name | title  |
// +------------+-----------+--------+
// | bob        | dylan     | singer |
// | paul       | mccartney | singer |
// +------------+-----------+--------+
// 2 rows in set (0.00 sec)
