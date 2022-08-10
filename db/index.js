const connection = require("./connection");

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    
    viewAllRoles = () => {
        return this.connection.promise().query(
            `select title as job_title, employee_role.id AS employee_role_id, department.name AS department_name,salary from employee_role 
            JOIN department ON department.id = department_id 
            ORDER BY  department.name;`
        )
    }

    viewAllDepartments = () => {
        return this.connection.promise().query(
            `Select name, id from department;`
        );
    }

    viewAllEmployees = () => {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, 
            department.department_name , employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            
            from employee 
            LEFT JOIN employee_role on employee.role_id = employee_role.id 
            LEFT JOIN department on employee_role.department_id = department.id LEFT join employee manager on manager.id = employee.manager_id;`
        )
    }

    addDepartment = (department) => {
        return this.connection.promise().query("INSERT INTO department SET ?", department)
    }

    addRole = (employee_role) => {
        return this.connection.promise().query("INSERT INTO role SET ?", employee_role)
    }

    addEmployee = (employee) => {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }

    getAllManagers = () => {
        return this.connection.promise().query(`SELECT * FROM manager`)
    }

    updateEmployeeRole = (employee_id, employee_role_id) => {
       return this.connect.promise().query(
            `UPDATE employee SET employee_role_id = ? WHERE id = ?`,
            [ employee_id,employee_role_id]
        )
    }
}

module.exports = new Database(connection);