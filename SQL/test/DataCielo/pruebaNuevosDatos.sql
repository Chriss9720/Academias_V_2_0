INSERT INTO ACADEMIA (clave_academia, nombre)
VALUES
('ACBA06','Academia base 6')



INSERT INTO CARRERA (clave_carrera, nombre)
VALUES
('LAEM','Lic. administración de empresas')



INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032222,'Jesus Alfredo Gonzales','14032222@cajeme.tecnm.mx','6437291601','AAAAA')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032216,'Karina Perez Estrada','14032216@cajeme.tecnm.mx','6435925502','SSSSS')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032217,'Jose Armando Mendoza','14032217@cajeme.tecnm.mx','6434559303','DDDDD')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032218,'Beatriz Pinzon Solano','14032218@cajeme.tecnm.mx','6433193204','FFFFF')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032219,'Marcela Valencia','14032219@cajeme.tecnm.mx','6431827005','GGGGG')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032220,'Ana Maria Orozco','14032220@cajeme.tecnm.mx','6430460906','HHHHH')


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave)
VALUES (14032221,'Patricia Fernandez','14032221@cajeme.tecnm.mx','6429094807','JJJJJ')


INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032218, 'Presidente');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032216, 'Secretario');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032217, 'Docente');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032219, 'Docente');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032220, 'Docente');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032221, 'Docente');
INSERT INTO CARGO (clave_academia, nomina, puesto) VALUES ('ACBA06',14032222, 'Docente');

INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032218, 1);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032216, 0);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032217, 0);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032219, 0);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032220, 0);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032221, 0);
INSERT INTO AFILIADO (clave_carrera, nomina, jefe) VALUES ('LAEM',14032222, 0);


INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave, nivel)
VALUES
(14032201,'Jose Luis Beltran','14032201@itesca.edu.mx','6442345654','EIFJG',0)

INSERT INTO DOCENTE ( nomina , nombre , correo , telefono, clave, nivel)
VALUES
(14032202,'Anabel Guierrez','14032202@itesca.edu.mx','6444328765','EIFJG',1)

INSERT INTO MATERIAS (materia, nomina) VALUES ('Español', 14032218)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Ingles', 14032216)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Matematicas', 14032217)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Ciencias', 14032219)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Etica', 14032220)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Valores', 14032221)
INSERT INTO MATERIAS (materia, nomina) VALUES ('Algebra', 14032222)
