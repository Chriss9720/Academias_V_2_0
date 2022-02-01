use model;
go
IF DB_ID('ADMIN_ACADEMIAS') IS NOT NULL
	DROP DATABASE ADMIN_ACADEMIAS
GO
IF DB_ID('ADMIN_ACADEMIAS') IS NULL
	CREATE DATABASE ADMIN_ACADEMIAS
GO
IF DB_ID('ADMIN_ACADEMIAS') IS NOT NULL
	USE ADMIN_ACADEMIAS
GO
IF OBJECT_ID('DOCENTE') IS NULL
	CREATE TABLE DOCENTE (
		nomina INT PRIMARY KEY NOT NULL,
		foto varchar(255) DEFAULT 'img/perfil.png',
		correo varchar(255) DEFAULT '',
		telefono varchar(255) DEFAULT ''
	)
GO
IF OBJECT_ID('MATERIAS') IS NULL
	CREATE TABLE MATERIAS (
		id_materia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		materia VARCHAR(255) DEFAULT '',
		nomina INT NOT NULL,
		FOREIGN KEY (nomina) REFERENCES Docente(nomina)
	)
GO
IF OBJECT_ID('CARRERAS') IS NULL
	CREATE TABLE CARRERAS (
		clave_carreras VARCHAR(255) PRIMARY KEY NOT NULL,
		foto_portada VARCHAR(255) NOT NULL DEFAULT 'img/perfil.png',
		clave VARCHAR(255) NOT NULL DEFAULT ''
	)
GO
IF OBJECT_ID('AFILIADO') IS NULL
	CREATE TABLE AFILIADO (
		clave_carreras VARCHAR(255),
		nomina INT,
		jefe BIT DEFAULT 0,
		PRIMARY KEY (clave_carreras, nomina),
		FOREIGN KEY (clave_carreras) REFERENCES CARRERAS(clave_carreras),
		FOREIGN KEY (nomina) REFERENCES DOCENTE(nomina)
	)
GO
IF OBJECT_ID('ACADEMIAS') IS NULL
	CREATE TABLE ACADEMIAS (
		clave_academia VARCHAR(255) PRIMARY KEY NOT NULL,
		foto_portada VARCHAR(255) NOT NULL DEFAULT 'img/perfil.png',
		nombre VARCHAR(255) NOT NULL
	)
GO
IF OBJECT_ID('EVALUACIONES') IS NULL
	CREATE TABLE EVALUACIONES (
		id_evaluacion INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		localizacion VARCHAR(255) NOT NULL
	)
GO
IF OBJECT_ID('CARGO') IS NULL
	CREATE TABLE CARGO (
		clave_academia VARCHAR(255) NOT NULL,
		nomina INT NOT NULL,
		puesto varchar(255) NOT NULL DEFAULT 'Docente',
		id_evaluacion INT DEFAULT NULL,
		PRIMARY KEY (clave_academia, nomina),
		FOREIGN KEY (clave_academia) REFERENCES ACADEMIAS(clave_academia),
		FOREIGN KEY (nomina) REFERENCES DOCENTE(nomina),
		FOREIGN KEY (id_evaluacion) REFERENCES EVALUACIONES(id_evaluacion)
	)
GO
IF OBJECT_ID('PLANTRABAJO') IS NULL
	CREATE TABLE PLANTRABAJO (
		id_planTrabajo INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		fecha DATETIME NOT NULL,
		subido INT NOT NULL,
		localizacion VARCHAR(255) NOT NULL,
	)
GO
IF OBJECT_ID('PLANES') IS NULL
	CREATE TABLE PLANES (
		id_planTrabajo INT NOT NULL,
		clave_academia VARCHAR(255) NOT NULL,
		PRIMARY KEY (id_planTrabajo, clave_academia),
		FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo),
		FOREIGN KEY (clave_academia) REFERENCES ACADEMIAS(clave_academia)
	)
GO
IF OBJECT_ID('ASISTENCIA') IS NULL
	CREATE TABLE ASISTENCIA (
		id_asistencia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		presente BIT default 0,
		tarde BIT DEFAULT 0,
		inasistencia BIT DEFAULT 0
	)
GO
IF OBJECT_ID('ACTAS') IS NULL
	CREATE TABLE ACTAS (
		id_acta INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		localizacion VARCHAR(255) NOT NULL,
		subido INT,
		finalizada BIT DEFAULT 0
	)
GO
IF OBJECT_ID('AGENDA') IS NULL
	CREATE TABLE AGENDA (
		id_asistencia INT IDENTITY(1,1) NOT NULL,
		id_planTrabajo INT NOT NULL,
		id_acta INT NOT NULL,
		fecha DATETIME DEFAULT NULL,
		PRIMARY KEY (id_asistencia, id_planTrabajo, id_acta),
		FOREIGN KEY (id_asistencia) REFERENCES ASISTENCIA(id_asistencia),
		FOREIGN KEY (id_acta) REFERENCES ACTAS(id_acta),
		FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo)
	)
GO
IF OBJECT_ID('EVIDENCIA') IS NULL
	CREATE TABLE EVIDENCIA (
		id_evidencia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		localizacion VARCHAR(255) NOT NULL,
		descripcion VARCHAR(255) DEFAULT '',
		nomina INT NOT NULL,
	)
GO
IF OBJECT_ID('SUBIR') IS NULL
	CREATE TABLE SUBIR (
		id_subir INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
		id_planTrabajo INT,
		id_evidencia INT,
		no_tarea INT,
		FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo),
		FOREIGN KEY (id_evidencia) REFERENCES EVIDENCIA(id_evidencia)
	)