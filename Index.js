const inquirer = require('inquirer');
const fs = require("fs");

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { create } = require('domain');

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
            console.log("working");
            if (employee) {
                employees.push(employee);
                writeEmployeeHtml(employee)
                .then(() => {
                    return runEmployeeCreationLoop();
                })
            }
        })
}

function writeHtmlBeginning() {
    const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <title>My Team Generator</title>
</head>

<body>
    <nav class="navbar navbar-light justify-content-center" style="background-color:red; height: 150px;">
        <!-- Navbar content -->
        <span class="h1" style="color: white">My Team</span>
    </nav>`
    
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/index.html", html, err => {
            // if there's an error, reject the Promise and send the error to the Promise's "catch()" method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the ".then()" method
            resolve({
                ok: true,
                message: "File Created!"
            });
        });
    });
};

function writeEmployeeHtml() {
    console.log("working");
}

// function that creates each employees html - how do I access the object that has the array of data is it called employees?

promptManager()
    .then(() => {
        return writeHtmlBeginning();
    })
    .then(({ name, id, email, officeNumber }) => {
        employees.push(new Manager(name, id, email, officeNumber));
        return runEmployeeCreationLoop();
    })
    .then(() => {
        console.log(employees)
    }) 