USE model;
GO
IF DB_ID('ADMIN_ACADEMIAS') IS NOT NULL
	DROP DATABASE ADMIN_ACADEMIAS
GO
IF DB_ID('ADMIN_ACADEMIAS') IS NULL
	CREATE DATABASE ADMIN_ACADEMIAS
GO
IF DB_ID('ADMIN_ACADEMIAS') IS NOT NULL
	USE ADMIN_ACADEMIAS
GO
IF OBJECT_ID('DOCENTE') IS NOT NULL
	DROP TABLE DOCENTE
GO
IF OBJECT_ID('MATERIAS') IS NOT NULL
	DROP TABLE MATERIAS
GO
IF OBJECT_ID('CARRERA') IS NOT NULL
	DROP TABLE CARRERA
GO
IF OBJECT_ID('AFILIADO') IS NOT NULL
	DROP TABLE AFILIADO
GO
IF OBJECT_ID('ACADEMIA') IS NOT NULL
	DROP TABLE ACADEMIA
GO
IF OBJECT_ID('EVALUACION') IS NOT NULL
	DROP TABLE EVALUACION
GO
IF OBJECT_ID('CARGO') IS NOT NULL
	DROP TABLE CARGO
GO
IF OBJECT_ID('PLANTRABAJO') IS NOT NULL
	DROP TABLE PLANTRABAJO
GO
IF OBJECT_ID('PLANES') IS NOT NULL
	DROP TABLE PLANES
GO
IF OBJECT_ID('ASISTENCIA') IS NOT NULL
	DROP TABLE ASISTENCIA
GO
IF OBJECT_ID('ACTA') IS NOT NULL
	DROP TABLE ACTA
GO
IF OBJECT_ID('AGENDA') IS NOT NULL
	DROP TABLE AGENDA
GO
IF OBJECT_ID('EVIDENCIA') IS NOT NULL
	DROP TABLE EVIDENCIA
GO
IF OBJECT_ID('SUBIR') IS NOT NULL
	DROP TABLE SUBIR
GO
IF OBJECT_ID('EVIDENCIAACTA') IS NOT NULL
	DROP TABLE EVIDENCIAACTA
GO
IF OBJECT_ID('SUBIRACTA') IS NOT NULL
	DROP TABLE SUBIRACTA
GO
CREATE TABLE DOCENTE (
	nomina INT PRIMARY KEY NOT NULL,
	foto VARCHAR(255) DEFAULT 'img/IconLog.png',
	nombre VARCHAR(255) DEFAULT '',
	correo VARCHAR(255) DEFAULT '',
	telefono VARCHAR(255) DEFAULT '',
	clave VARCHAR(255) DEFAULT '',
	baja BIT DEFAULT 0,
	nivel INT DEFAULT 6
)
GO
CREATE TABLE MATERIAS (
	id_materia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	materia VARCHAR(255) DEFAULT '',
	nomina INT NOT NULL,
	FOREIGN KEY (nomina) REFERENCES Docente(nomina)
)
GO
CREATE TABLE CARRERA (
	clave_carrera VARCHAR(255) PRIMARY KEY NOT NULL,
	foto_portada VARCHAR(255) NOT NULL DEFAULT 'img/portada.png',
	Activo BIT DEFAULT 1,
	nombre VARCHAR(255) NOT NULL
)
GO
CREATE TABLE AFILIADO (
	clave_carrera VARCHAR(255),
	nomina INT,
	jefe BIT DEFAULT 0,
	Activo BIT DEFAULT 1,
	PRIMARY KEY (clave_carrera, nomina),
	FOREIGN KEY (clave_carrera) REFERENCES carrera(clave_carrera),
	FOREIGN KEY (nomina) REFERENCES DOCENTE(nomina)
)
GO
CREATE TABLE ACADEMIA (
	clave_academia VARCHAR(255) PRIMARY KEY NOT NULL,
	foto_portada VARCHAR(255) NOT NULL DEFAULT 'img/portada.png',
	nombre VARCHAR(255) NOT NULL
)
GO
CREATE TABLE EVALUACION (
	id_evaluacion INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	localizacion VARCHAR(255) NOT NULL,
	localizacionJson VARCHAR(255) NOT NULL
)
GO
CREATE TABLE CARGO (
	clave_academia VARCHAR(255) NOT NULL,
	nomina INT NOT NULL,
	puesto VARCHAR(255) NOT NULL DEFAULT 'Docente',
	id_evaluacion INT DEFAULT NULL,
	PRIMARY KEY (clave_academia, nomina),
	FOREIGN KEY (clave_academia) REFERENCES ACADEMIA(clave_academia),
	FOREIGN KEY (nomina) REFERENCES DOCENTE(nomina),
	FOREIGN KEY (id_evaluacion) REFERENCES EVALUACION(id_evaluacion)
)
GO
CREATE TABLE PLANTRABAJO (
	id_planTrabajo INT PRIMARY KEY NOT NULL,
	fecha DATETIME NOT NULL,
	subido INT NOT NULL DEFAULT 0,
	localizacion VARCHAR(255) NOT NULL,
	localizacionJson VARCHAR(255) NOT NULL
)
GO
CREATE TABLE PLANES (
	id_planTrabajo INT NOT NULL,
	clave_academia VARCHAR(255) NOT NULL,
	PRIMARY KEY (id_planTrabajo, clave_academia),
	FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo),
	FOREIGN KEY (clave_academia) REFERENCES ACADEMIA(clave_academia)
)
GO
CREATE TABLE ACTA (
	id_acta INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	localizacion VARCHAR(255) NOT NULL,
	subido INT,
	finalizada BIT DEFAULT 0,
	liberada BIT DEFAULT 0,
	localizacionJson VARCHAR(255) NOT NULL
)
GO
CREATE TABLE ASISTENCIA (
	id_asistencia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	id_acta INT NOT NULL,
	presente BIT default 0,
	tarde BIT DEFAULT 0,
	inasistencia BIT DEFAULT 0,
	nomina INT,
	FOREIGN KEY (id_acta) REFERENCES ACTA(id_acta)
)
GO
CREATE TABLE AGENDA (
	idAgenda INT IDENTITY(1,1) NOT NULL,
	id_planTrabajo INT NOT NULL,
	id_acta INT NULL,
	fecha DATETIME DEFAULT NULL,
	PRIMARY KEY (idAgenda),
	FOREIGN KEY (id_acta) REFERENCES ACTA(id_acta),
	FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo)
)
GO
CREATE TABLE EVIDENCIA (
	id_evidencia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	localizacion VARCHAR(255) NULL,
	descripcion VARCHAR(255) DEFAULT '',
	nomina INT NOT NULL,
)
GO
CREATE TABLE SUBIR (
	id_subir INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	id_planTrabajo INT,
	id_evidencia INT,
	no_tarea INT,
	punto INT,
	fecha DATETIME DEFAULT NULL,
	limite BIT DEFAULT 0,
	FOREIGN KEY (id_planTrabajo) REFERENCES PLANTRABAJO(id_planTrabajo),
	FOREIGN KEY (id_evidencia) REFERENCES EVIDENCIA(id_evidencia)
)
GO
CREATE TABLE EVIDENCIAACTA (
	id_evidencia INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	localizacion VARCHAR(255) NULL,
	descripcion VARCHAR(255) DEFAULT '',
	nomina INT NOT NULL,
)
GO
CREATE TABLE SUBIRACTA (
	id_subir INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	id_acta INT,
	id_evidencia INT,
	no_tarea INT,
	punto INT,
	fecha DATETIME DEFAULT NULL,
	limite BIT DEFAULT 0,
	FOREIGN KEY (id_acta) REFERENCES ACTA(id_acta),
	FOREIGN KEY (id_evidencia) REFERENCES EVIDENCIAACTA(id_evidencia)
)