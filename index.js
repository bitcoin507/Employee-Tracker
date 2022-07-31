const {connect_mysql, viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment,addRole, addEmployee, updateEmployeeRole} = require('./lib/menu-functions'); 


function questions(){


    const inquirer = require('inquirer');
    const all_departments=[];
    const all_roles=[];
    const all_employeename=[{value:0, name:"NONE"}];
    
    inquirer
     .prompt([
        {name:"menu",
        type: "list",
        message: "What would you like to view?",
        choices: ["View All Employees","View All Roles","View All Department","Add Employee", "Add Role","Add Department","Update Employee Role","Quit"],
    },
    
]) 
    .then((answer) => {
        if (answer.menu == "View All Employees"){
            viewAllEmployees()
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
            addemployee_response()

        }if (answer.menu == "Add Role"){       
            renderAllDepartments()
            addrole_response()
            
        }if (answer.menu == "Add Department"){
            adddepartment_response()
 
        }if (answer.menu == "Update Employee Role"){
            renderAllEmployees()
            renderAllRoles()
      
            updateemployeeresponse()
          


            
        }if (answer.menu == "Quit"){
            process.exit();

        }
    })

    
    let adddepartment_response  = () =>{
        inquirer
        .prompt([
            {name:"add_name",
            type: "input",
            message: "What is the name of the department?"
            },
        ]) 
    
        .then ((answers) => {
            addDepartment(answers.add_name)
            questions()
            
        })
    
    }

    let addrole_response  = () =>{
        inquirer
        .prompt([
            {name:"add_name",
            type: "input",
            message: "What is the name of the role?"
            },

            {name:"add_salary",
            type: "input",
            message: "What is the salary of the role?"
            },

            {name:"add_department",
            type: "list",
            message: "Which department does the role belong to?",
            choices: all_departments,
            },
        ]) 
    
        .then ((answers) => {

            db.query('SELECT * FROM department ', function (err, results) {
                for (i=0; i< results.length; i++){
                if(results[i].department_name == answers.add_department){
                    department_id=results[i].id
                    addRole(answers.add_name, answers.add_salary, department_id)
                    questions()
                }
                }
            });
    
         
            
        })
    }

    let addemployee_response  = () =>{
        inquirer
        .prompt([
            {name:"add_firstname",
            type: "input",
            message: "What is the employee's first name?"
            },

            {name:"add_lastname",
            type: "input",
            message: "What is the employee's last name?"
            },

            {name:"add_employeerole",
            type: "list",
            message: "What is the employee's role?",
            choices: all_roles,
            },

            {name:"add_employeemanager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: all_employeename,
            },
        ]) 
    
        .then ((answers) => {   
                  
            addEmployee(answers.add_firstname, answers.add_lastname, answers.add_employeerole, answers.add_employeemanager)    

            questions()
            
        })
    }


    let updateemployeeresponse = () =>{ 
        inquirer
        .prompt([
            {name:"update_reference",
            type: "input",
            message: "Plense enter the update reference?",
            },
            {name:"employee_pick",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: all_employeename,
            },

            {name:"role_pick",
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: all_roles,
            },
        ]) 
    
        .then ((answers) => {   
            console.log(answers.role_pick)
            console.log(answers.employee_pick)
            updateEmployeeRole(answers.role_pick,answers.employee_pick)

            questions()
        })
        
    }

    


    
    let renderAllDepartments =() =>{
    db.query('SELECT * FROM department ', function (err, results) {
        for (i=0; i< results.length; i++){
            all_departments.push(results[i].department_name)
        }
        
        });
    }

    let renderAllRoles =() =>{
        db.query('SELECT id as value, job_title as name FROM employee_role ', function (err, results) {
        
            let temp_pushlist=[];
            
            
            for(i=0; i< results.length; i++){
                temp_pushlist.push(results[i])
            }
            
            for (i=0; i< results.length; i++){
                let popped_name = temp_pushlist.pop()
                all_roles.push(popped_name)
            }
            

        });
    }

    let renderAllEmployees =() =>{
        db.query("SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee", function (err, results) {  
        
            let employeeList=[];
            
            
            for(i=0; i< results.length; i++){
                employeeList.push(results[i])
            }
            
            for (i=0; i< results.length; i++){
                let popped_name = employeeList.pop()
                all_employeename.push(popped_name)

            }
        });
    }
   
  


}

connect_mysql()

questions()