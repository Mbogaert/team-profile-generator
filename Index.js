const inquirer = require('inquirer');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');

const promptUser = () => {
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
        }
    ])
}

promptUser().then(answers => console.log(answers));