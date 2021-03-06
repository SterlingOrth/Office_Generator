const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let emp = [];

//emp.push(

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

inquirer
  .prompt([
    {
      type: "input",
      message: "What is the name of manager?",
      name: "name",
    },
    {
      type: "input",
      message: "What is id of the manager?",
      name: "id",
    },
    {
      type: "input",
      message: "What is manager role?",
      name: "role",
    },
    {
      type: "input",
      message: "What is manager office number?",
      name: "officeNumber",
    },
  ])

  .then((response) => {
    const manager = new Manager(
      response.name,
      response.role,
      response.id,
      response.officeNumber
    );
    console.log(manager);
    emp.push(manager);
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to add, engineer or intern?",
          name: "employee",
          choices: ["engineer", "intern", "none"],
        },
      ])
      .then((response) => {
        if (response.employee === "engineer") {
          inquirer
            .prompt([
              {
                type: "input",
                message: "What is your name?",
                name: "name",
              },
              {
                type: "input",
                message: "What is your ID?",
                name: "id",
              },
              {
                type: "input",
                message: "What is your email?",
                name: "email",
              },
              {
                type: "input",
                message: "What is your Github?",
                name: "github",
              },
            ])
            .then((response) => {
              const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
              );
              emp.push(engineer);
              var html = render(emp);
              fs.writeFileSync("team.html", html);
              console.log(html);
              console.log(emp);
            });
        } else if (response.employee === "intern") {
          inquirer
            .prompt([
              {
                type: "input",
                message: "What is your name?",
                name: "name",
              },
              {
                type: "input",
                message: "What is your ID?",
                name: "id",
              },
              {
                type: "input",
                message: "What is your email?",
                name: "email",
              },
              {
                type: "input",
                message: "What school do you attend?",
                name: "school",
              },
            ])
            .then((response) => {
              const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
              );
              console.log(intern);
              emp.push(intern);
              var html = render(emp);
              fs.writeFileSync("team.html", html);
              console.log(html);
              console.log(emp);
            });
        } else {
          var html = render(emp);
          fs.writeFileSync("team.html", html);
          console.log(html);
          process.exit();
        }
      })
      .catch((err) => {
        throw err;
      });
  });

// save as var and feed into render method

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
