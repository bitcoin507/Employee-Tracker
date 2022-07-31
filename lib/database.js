

const connect = require("./connect");



class Database {
    constructor(connection) {
        this.connection = connection;
    }

    
    viewAllRoles = () => {
        return this.connection.promise().query(
            `select title as job_title, role.id AS role_id, department.name AS department_name,salary from role 
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
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager from employee 
            LEFT JOIN role on role_id=role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT join employee manager on manager.id = employee.manager_id;`
        )
    }


    addADepartment = (department) => {
        return this.connection.promise().query("INSERT INTO department SET ?", department)
    }

    addARole = (role) => {
        return this.connection.promise().query("INSERT INTO role SET ?", role)
    }

    addAnEmployee = (employee) => {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }


    getAllManagers = () => {
        return this.connection.promise().query(`SELECT * FROM manager`)
    }

    updateEmployeeRole = (employee_id, role_id) => {
       return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [ employee_id,role_id]
        )
    }
}

module.exports = new Database(connection);