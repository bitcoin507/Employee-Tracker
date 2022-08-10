const inquirer = require('inquirer');

const db = require("./db");
require('dotenv').config();
const connection = require("./db/connection");

function questions() {
    
    const all_departments=[];
    const all_roles=[];
    const all_employees=[{value:0, name:"NONE"}];
    
    inquirer.prompt([
        {
            name:"menu",
            type: "list",
            message: "Choose an option",
            choices: ["View All Employees","View All Roles","View All Department","Add Employee", "Add Role","Add Department","Update Employee Role","Exit"],
        }
        ]).then((answer) => {
            if (answer.menu == "View All Employees"){
                db.viewAllEmployees();
                questions()
                
            }if (answer.menu == "View All Roles"){        
                viewAllRoles()
                questions()
                
            }if (answer.menu == "View All Department"){
                viewAllDepartments()    
                questions()

            }if (answer.menu == "Add Employee"){
                renderAllEmployees()
                renderAllRoles()
                addEmployeeResponse()

            }if (answer.menu == "Add Role"){       
                renderAllDepartments()
                addRoleResponse()
                
            }if (answer.menu == "Add Department"){
                addDepartment_response()
    
            }if (answer.menu == "Update Employee Role"){
                renderAllEmployees()
                renderAllRoles()
        
                updateEmployeeResponse()
            }
            if (answer.menu == "Exit"){
                process.exit();
            }
        })
}

let addDepartment_response  = () =>{
    
    inquirer.prompt([
        {
            name:"add_name",
            type: "input",
            message: "Enter department name",
        },
    ]) 

    .then ((answers) => {
        addDepartment(answers.add_name)
        questions()
    })
}

let addRoleResponse  = () =>{
    
    inquirer.prompt([
        {
            name:"add_name",
            type: "input",
            message: "Enter employee role",
        },
        {
            name:"add_salary",
            type: "input",
            message: "Enter employee salary",
        },
        {
            name:"add_department",
            type: "list",
            message: "Which department does the role belong to?",
            choices: all_departments,
        },
    ]) .then ((answers) => {
        db.query('SELECT * FROM department ', function (err, results) {
            for (i=0; i< results.length; i++){
            if(results[i].department_name == answers.add_department){
                department_id=results[i].id
                addRole(answers.add_name, answers.add_salary, department_id)
                questions()
            }}
        });
    })
}

let addEmployeeResponse  = () =>{
    
    inquirer.prompt([
        {
            name:"add_firstname",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name:"add_lastname",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name:"add_employeeRole",
            type: "list",
            message: "Choose the employee's  role",
            choices: all_roles,
        },
        {
            name:"add_employeeManager",
            type: "list",
            message: "Choose the employee's manager",
            choices: all_employees,
        },
    ]).then ((answers) => {   
              
        addEmployee(answers.add_firstname, answers.add_lastname, answers.add_employeerole, answers.add_employeemanager)    

        questions()  
    })
}


let updateEmployeeResponse = () =>{ 
    inquirer.prompt([
        {
            name:"update_reference",
            type: "input",
            message: "Enter the update reference?",
        },
        {
            name: "update_role",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: all_employees,
        },
        {
            name:"new_role",
            type: "list",
            message: "Which new role do you want to assign the selected employee?",
            choices: all_roles,
        },
    ]) .then ((answers) => {   
        console.log(answers.employee_role_pick)
        console.log(answers.employee_pick)
        updateEmployeeRole(answers.employee_role_pick,answers.employee_pick)

        questions()
    })
}


let viewAllDepartments =() =>{
    db.query('SELECT * FROM department ', function (err, results) {
        for (i=0; i< results.length; i++){
            all_departments.push(results[i].department_name)
        }
});
}

let viewAllRoles =() =>{
    db.query('SELECT id as value, job_title as name FROM employee_role ', function (err, results) {
    
        let temp_pushlist=[];
                
        for(i=0; i< results.length; i++){
            temp_pushlist.push(results[i])
        }
        
        for (i=0; i< results.length; i++){
            let popped_name = temp_pushlist.pop()
            all_employee_roles.push(popped_name)
        } 
    });
}

let viewAllEmployees =() =>{
    db.query("SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee", function (err, results) {  
    
        let employeeList=[];
        
        for(i=0; i< results.length; i++){
            employeeList.push(results[i])
        }
        
        for (i=0; i< results.length; i++){
            let popped_name = employeeList.pop()
            all_employees.push(popped_name)
        }
    });
}

connection.connect(function(err) {
    if (err) throw err;
})

questions();