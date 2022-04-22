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
GO

IF OBJECT_ID('VW_DocentesAcademias') IS NOT NULL DROP VIEW VW_DocentesAcademias
GO
CREATE VIEW VW_DocentesAcademias AS
	SELECT A.clave_academia, CAR.puesto, CAR.activo, DOC.nombre, DOC.nomina, DOC.baja, DOC.nivel
	FROM ACADEMIA AS A
	JOIN CARGO AS CAR
	ON CAR.clave_academia = A.clave_academia
	JOIN DOCENTE AS DOC
	ON DOC.nomina = CAR.nomina
GO

IF OBJECT_ID('VW_Evaluaciones') IS NOT NULL DROP VIEW VW_Evaluaciones
GO
CREATE VIEW VW_Evaluaciones AS
	SELECT CAR.clave_academia, ACA.nombre AS Academia, CAR.puesto,
		EV.id_evaluacion, EV.localizacion, EV.localizacionJson,
		EV.periodo, DOC.nombre, DOC.nomina, CAE.nombre AS Carrera, CAR.Activo, EV.subido
	FROM CARGO AS CAR
	LEFT JOIN EVALUACION AS EV
	ON EV.id_evaluacion = CAR.id_evaluacion
	LEFT JOIN DOCENTE AS DOC
	ON DOC.nomina = CAR.nomina
	LEFT JOIN ACADEMIA AS ACA
	ON ACA.clave_academia = CAR.clave_academia
	LEFT JOIN AFILIADO AS AFI
	ON AFI.nomina = DOC.nomina
	LEFT JOIN CARRERA AS CAE
	ON CAE.clave_carrera LIKE AFI.clave_carrera AND AFI.Activo = 1
GO