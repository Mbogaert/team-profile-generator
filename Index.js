const inquirer = require('inquirer');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');

function promptUser () {
    let employees = [];
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the employees name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employees id number'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the employees email address'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the employees role from the list',
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ])
    .then(answers => {
        employees.push(answers);
        console.log(employees)
    });
}


promptUser()