const inquirer = require('inquirer');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// consider adding validations in the future

let employees = [];

function promptManager() {

    return inquirer.prompt([
        {
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
    ])
}

function promptEngineer() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the engineers name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the engineers id number'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the engineers email address'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the engineers github username'
        }
    ])
}

function promptIntern() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the interns name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the interns id number'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the interns email address'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the interns school name'
        }
    ])
}

function promptRole() {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'role',
            message: 'Would you like to enter an intern, an engineer or end?',
            choices: ['Intern', 'Engineer', 'END']
        }
    )
};

function runEmployeeCreationLoop() {
    return promptRole()
        .then(({ role }) => {
            if (role === 'Intern') {
                return promptIntern()
                    .then(({ name, id, email, school }) => new Intern(name, id, email, school))
            }
            else if (role === 'Engineer') {
                return promptEngineer()
                    .then(({ name, id, email, github }) => new Engineer(name, id, email, github))
            }
            else {
                return null;
            }
        })
        .then((employee) => {
            if (employee) {
                employees.push(employee);
                return runEmployeeCreationLoop();
            }
        })
}

function createHTML () {

}

// function that creates each employees html

promptManager()
    .then(({ name, id, email, officeNumber }) => {
        employees.push(new Manager(name, id, email, officeNumber));
        return runEmployeeCreationLoop();
    })
    .then(() => {
        console.log(employees)
    }) 