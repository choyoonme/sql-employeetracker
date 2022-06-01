INSERT INTO 
employees 
(id, first_name, last_name, roles_id, manager_id)
VALUES 
(1,'Claude', 'Monet', 1, NULL),
(2, 'Paul', 'Cezanne', 5, 6),
(3, 'Pierre-Auguste', 'Renoir', 6, 7),
(4, 'Edouard', 'Manet', 3, 6),
(5, 'Paul', 'Gaughin', 7, 7),
(6, 'Henri', 'Matisse', 2, 1),
(7, 'Georges', 'Seurat', 4, 1),
(8, 'Henri', 'Rousseau', 7, 7),
(9, 'Georges', 'Braque', 6, 7),
(10, 'Eugene', 'Delacroix', 5, 6);


INSERT INTO 
departments 
(id, department_name)
VALUES 
(1, 'Administrative'),
(2, 'Technical Services'),
(3, 'Public Services'),
(4,'Support Staff');


INSERT INTO 
roles 
(id, title_name, salary, departments_id)
VALUES 
(1, 'Library Director', 100000, 1),
(2, 'Head of Technical Services', 90000, 1),
(3, 'Systems & Metadata Librarian', 80000, 2),
(4, 'Head of Access Services', 75000, 1),
(5, 'Electronic Resources & Serials Librarian', 75000, 2),
(6, 'Reference Librarian', 75000, 3),
(7, 'Library Clerk', 40000, 4);



