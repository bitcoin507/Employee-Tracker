 use employee_db;

INSERT INTO department (department_name)
VALUES ("Bricolaje"), 
("Carpinteria"), 
("Electrodomesticos"), 
("Pintura"), 
("Plomeria"), 
("Cerrajeria");
       





INSERT INTO employee_role (title, salary, department_id)
VALUES ("dependiente", 18.000,1),
("carpintero", 20.000,2),
("electricista", 52.000,3),
("pintor", 24.000,4),
("plomero", 26.000,5),
("cerrajero", 28.000,6);

    INSERT INTO employee (first_name, last_name, role_id, manager_id)     
VALUES ("Jorge", "Gonzalez", 1, NULL),
       ("Teofimo", "Lopez", 2, 1),
       ("Kafu", "Bantan", 3, 1),
       ("Frankie","Paul",4, 1),
       ("Jimmy", "JZorrilo",5, 1),
       ("Monica", "Garcia",6 ,1);

