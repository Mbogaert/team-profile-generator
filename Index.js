const inquirer = require('inquirer');
const fs = require("fs");

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
            choices: ['Engineer', 'Intern', 'END']
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

function writeHtml() {
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
    </nav>  
    
    ${employees.map((employee) => {
        if (employee.getRole() === 'Intern') {
            return `<div class="card" style="width: 18rem; padding: 70px 10px 10px 10px; display: inline-block">
<div class="card-header" style="background-color: blue; color: white;">
    <h5>${employee.name}</h5>
    <h5> Intern </h5>
</div>
<div class="card-body">
    <ul class="list-group list-group-flush">
        <li class="list-group-item card-text">ID: ${employee.id}</li>
        <li class="list-group-item">Email: <a href= "mailto:${employee.email}" target="_blank">${employee.email}</a> </li>
        <li class="list-group-item">School: ${employee.school} </li>
    </ul>
</div>
</div>`
        } 
        else if (employee.getRole() === 'Engineer') {
            return `<div class="card" style="width: 18rem; padding: 70px 10px 10px 10px; display: inline-block">
            <div class="card-header" style="background-color: blue; color: white;">
                <h5>${employee.name}</h5>
                <h5> Engineer </h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item card-text">ID: ${employee.id}</li>
                    <li class="list-group-item">Email: <a href= "mailto:${employee.email}" target="_blank">${employee.email}</a> </li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${employee.github}"target="_blank">${employee.github}</a> </li>
                </ul>
            </div>
        </div>`
        } 
        else if (employee.getRole() === 'Manager') {
            return `<div class="card" style="width: 18rem; padding: 70px 10px 10px 10px; display: inline-block">
            <div class="card-header" style="background-color: blue; color: white;">
                <h5>${employee.name}</h5>
                <h5> Manager </h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item card-text">ID: ${employee.id}</li>
                    <li class="list-group-item">Email: <a href= "mailto:${employee.email}" target="_blank">${employee.email}</a> </li>
                    <li class="list-group-item">Office Number: ${employee.officeNumber} </li>
                </ul>
            </div>
        </div>`;
        }
    }) .join( '' )}
    </body>

</html>`

    fs.writeFile("./dist/index.html", html, err => {
        if (err) {
            console.log(err);
        }
    });
};

promptManager()
    .then(({ name, id, email, officeNumber }) => {
        employees.push(new Manager(name, id, email, officeNumber));
        return runEmployeeCreationLoop();
    })
    .then(() => {
        writeHtml();
    }) 