const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const db = mysql.createConnection(
    {
        host: 'local host',
        user: 'tracker',
        password: '',
        database: 'employee_db'
    });

