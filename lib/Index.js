const inquirer = require('inquirer');

const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const Employee = require('./Employee');

function Index() {
    
}

Index.prototype.enterEmployee = function() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the employees name'
        })
        .then(({ name }) => {
            this.employee = new Employee(name);

            console.log(this.employee);
        });
}

module.exports = Index; 