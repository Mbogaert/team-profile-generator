const inquirer = require('inquirer');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');

let employees = [];

function promptManager() {
    
    return inquirer.prompt([
        {
            // consider adding validations in the future
            type: 'input',
            name: 'name',
            message: 'Enter the managers name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the managers id number'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the managers email address'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the managers office phone number'
        }
        // ask to enter an intern or engineer or to finish

        // ask to enter another employee - end only after this returns false

        // populate the HTML with the manager, engineers and interns
    ])
    .then(answers => {
        employees.push(answers);
        console.log(employees)
    });
}

// function that creates an HTML file for overall page
// function that creates each employees html

promptManager()