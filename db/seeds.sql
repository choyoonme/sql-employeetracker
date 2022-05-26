INSERT INTO employees (id, first_name, last_name, roles_id, manager_id)
VALUES (1,'bob', 'dylan', 1, 1),
(2, 'paul', 'mccartney', 1, 2);


INSERT INTO departments (id, department_name)
VALUES (1, 'mailroom'),
(2, 'janitor closet');

INSERT INTO roles (id, title_name, salary, departments_id)
VALUES (1, 'singer', 25000, 1),
(2, 'musician', 30000, 3);

