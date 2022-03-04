USE ADMIN_ACADEMIAS
GO
/* VISTA DOCENTE - MATERIAS */
IF OBJECT_ID('VW_MATERIAS') IS NOT NULL DROP VIEW VW_MATERIAS
GO
CREATE VIEW VW_MATERIAS AS 
	SELECT D.nomina, D.nombre, M.materia
	FROM MATERIAS AS M
	JOIN DOCENTE AS D
	ON D.nomina = M.nomina
GO
/* VISTA DOCENTE - AFLIADO - CARRERA */
IF OBJECT_ID('VW_DOCENTE_CARRERA') IS NOT NULL DROP VIEW VW_DOCENTE_CARRERA
GO
CREATE VIEW VW_DOCENTE_CARRERA AS
	SELECT A.jefe, C.clave_carrera, C.foto_portada, C.nombre, D.nombre AS [docente]
	FROM AFILIADO AS A
	JOIN CARRERA AS C
	ON C.clave_carrera = A.clave_carrera
	JOIN DOCENTE AS D
	ON D.nomina = A.nomina
GO
SELECT * FROM VW_DOCENTE_CARRERA