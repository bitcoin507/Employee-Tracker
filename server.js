const express = require('express');


const connect_mysql = () =>{
    const mysql = require('mysql2');
    
    db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Hellobye1',
        database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
    );
    
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  