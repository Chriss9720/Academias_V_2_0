USE ADMIN_ACADEMIAS
GO
IF OBJECT_ID('VW_InfoDocente') IS NOT NULL DROP VIEW VW_InfoDocente
GO
CREATE VIEW VW_InfoDocente AS
	SELECT D.nomina, D.nivel, D.foto, D.nombre AS [ND], D.correo, D.telefono, D.baja,
	C.clave_carrera, C.nombre AS [NC], F.jefe, A.clave_academia, A.nombre, CA.puesto
	FROM DOCENTE AS D
	LEFT JOIN AFILIADO AS F
	ON F.nomina = D.nomina
	LEFT JOIN CARRERA AS C
	ON C.clave_carrera = F.clave_carrera
	LEFT JOIN CARGO AS CA
	ON CA.nomina = D.nomina
	LEFT JOIN ACADEMIA AS A
	ON A.clave_academia = CA.clave_academia
GO

IF OBJECT_ID('VW_InfoAcademia') IS NOT NULL DROP VIEW VW_InfoAcademia
GO
CREATE VIEW VW_InfoAcademia AS
	SELECT A.clave_academia, A.nombre AS Academia,
		C.puesto, D.nombre, COR.nombre AS Coordinador,
		JC.nombre AS Jefe
		FROM ACADEMIA AS A
		LEFT JOIN CARGO AS C
		ON C.clave_academia = A.clave_academia
		LEFT JOIN DOCENTE AS D
		ON D.nomina = C.nomina
		LEFT JOIN (
			SELECT * FROM DOCENTE WHERE nivel = 1
		) AS COR
		ON COR.nivel = 1
		LEFT JOIN AFILIADO AS AF
		ON AF.nomina = D.nomina
		LEFT JOIN CARRERA AS CA
		ON CA.clave_carrera = AF.clave_carrera
		LEFT JOIN (
			SELECT * FROM AFILIADO WHERE jefe = 1
		) AS J
		ON J.clave_carrera = CA.clave_carrera
		LEFT JOIN (
			SELECT * FROM DOCENTE
		) AS JC
		ON JC.nomina = J.nomina