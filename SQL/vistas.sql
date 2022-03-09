USE ADMIN_ACADEMIAS
GO
IF OBJECT_ID('VW_InfoDocente') IS NOT NULL DROP VIEW VW_InfoDocente
GO
CREATE VIEW VW_InfoDocente AS
	SELECT D.nomina, D.nivel, D.foto, D.nombre AS [ND], D.correo, D.telefono,
	C.clave_carrera, C.nombre AS [NC], F.jefe, A.clave_academia, A.nombre, CA.puesto
	FROM DOCENTE AS D
	JOIN AFILIADO AS F
	ON F.nomina = D.nomina
	JOIN CARRERA AS C
	ON C.clave_carrera = F.clave_carrera
	JOIN CARGO AS CA
	ON CA.nomina = D.nomina
	JOIN ACADEMIA AS A
	ON A.clave_academia = CA.clave_academia
GO