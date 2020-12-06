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
            message: 'Enter the managers name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the managers id number',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter an ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the managers email address',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the managers office phone number',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        }
    ])
}

function promptEngineer() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the engineers name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the engineers id number',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter an ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the engineers email address',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the engineers github username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter a GitHub username!');
                    return false;
                }
            }
        }
    ])
}

function promptIntern() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the interns name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the interns id number',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter an ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the interns email address',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the interns school name',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('Please enter a school!');
                    return false;
                }
            }
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
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
    <title>My Team Generator</title>
</head>

<body style="font-family: sans-serif;">
    <nav class="navbar navbar-light justify-content-center" style="background-color:red; height: 150px;">
        <!-- Navbar content -->
        <span class="h1" style="color: white">My Team</span>
    </nav> 
    <div class="container"> 
        <div class="row" style="justify-content: center;"> 
    
    ${employees.map((employee) => {
        if (employee.getRole() === 'Intern') {
            return `<div class="card" style="width: 18rem; margin: 50px 6px 0 6px; display: inline-block">
<div class="card-header" style="background-color: blue; color: white;">
    <h5>${employee.name}</h5>
    <span class="fas fa-user-graduate"><span class="h5" style="font-family: sans-serif;"> Intern </span></span>
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
            return `<div class="card" style="width: 18rem; margin: 50px 6px 0 6px; display: inline-block">
            <div class="card-header" style="background-color: blue; color: white;">
                <h5>${employee.name}</h5>
                <span class="fas fa-glasses"><span class="h5" style="font-family: sans-serif;"> Engineer </span></span>
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
            return `<div class="card" style="width: 18rem; margin: 50px 6px 0 6px; display: inline-block">
            <div class="card-header" style="background-color: blue; color: white;">
                <h5>${employee.name}</h5>
                <span class="fas fa-mug-hot"><span class="h5" style="font-family: sans-serif;"> Manager</span></span>
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
    }).join('')}
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
        console.log("Your newly create HTML file is now in the dist folder!")
        writeHtml();
    }) 