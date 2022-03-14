USE ADMIN_ACADEMIAS
GO

IF OBJECT_ID('SP_Login') IS NOT NULL DROP PROC SP_Login
GO
CREATE PROC SP_Login
	@NOMINA INT,
	@Clave VARCHAR(255) AS
	IF NOT EXISTS (SELECT * FROM DOCENTE WHERE nomina = @NOMINA AND clave = TRIM(@Clave))
		RAISERROR(50001, 11, 1)
GO

IF OBJECT_ID('SP_GetCoordinador') IS NOT NULL DROP PROC SP_GetCoordinador
GO
CREATE PROC SP_GetCoordinador AS
	SELECT nomina, TRIM(foto) AS foto, TRIM(nombre) AS nombre, TRIM(correo) AS correo, TRIM(telefono) AS telefono, nivel
	FROM DOCENTE WHERE Nivel = 1
GO

IF OBJECT_ID('SP_BuscarCoordinadorNuevo') IS NOT NULL DROP PROC SP_BuscarCoordinadorNuevo
GO
CREATE PROC SP_BuscarCoordinadorNuevo AS
	SELECT nomina, TRIM(foto) AS foto, TRIM(nombre) AS nombre, TRIM(correo) AS correo, TRIM(telefono) AS telefono, nivel
	FROM DOCENTE WHERE Nivel != 1 AND Nivel != 0
GO

IF OBJECT_ID('SP_InfoDocente') IS NOT NULL DROP PROC SP_InfoDocente
GO
CREATE PROC SP_InfoDocente @DOC INT AS
	SELECT * FROM VW_InfoDocente WHERE nomina = @DOC
GO

IF OBJECT_ID('SP_DondeCrearPlanAcademia') IS NOT NULL DROP PROC SP_DondeCrearPlanAcademia
GO
CREATE PROC SP_DondeCrearPlanAcademia @Nomina INT, @nivel INT AS
	IF (@nivel != 1) BEGIN
		SELECT DISTINCT A.*, D.foto, T.T
		FROM ACADEMIA AS A
		JOIN CARGO AS C
		ON C.clave_academia = A.clave_academia
		JOIN DOCENTE AS D
		ON D.nomina = @Nomina AND C.nomina = @Nomina AND (C.puesto LIKE '%Presidente%' OR C.puesto IS NULL)
		JOIN (
			SELECT COUNT(*) AS T, C.clave_academia FROM CARGO AS C GROUP BY(clave_academia)
		) AS T
		ON T.clave_academia = A.clave_academia
	END
	ELSE BEGIN
		SELECT A.clave_academia, A.foto_portada, A.nombre, D.foto
		FROM ACADEMIA AS A
		JOIN CARGO AS C
		ON C.clave_academia = A.clave_academia
		JOIN DOCENTE AS D
		ON C.nomina = D.nomina
		WHERE C.puesto LIKE '%Presidente' OR C.puesto IS NULL
	END
GO

IF OBJECT_ID('SP_InfoAcademiaPlanTrabajo') IS NOT NULL DROP PROC SP_InfoAcademiaPlanTrabajo
GO
CREATE PROC SP_InfoAcademiaPlanTrabajo @Clave VARCHAR(255) AS
	SELECT A.clave_academia, A.nombre AS Academia,
	C.puesto, D.nombre, COR.nombre AS Coordinador,
	JC.nombre AS Jefe
	FROM ACADEMIA AS A
	JOIN CARGO AS C
	ON C.clave_academia = A.clave_academia
	JOIN DOCENTE AS D
	ON D.nomina = C.nomina
	JOIN (
		SELECT * FROM DOCENTE WHERE nivel = 1
	) AS COR
	ON COR.nivel = 1
	JOIN AFILIADO AS AF
	ON AF.nomina = D.nomina
	JOIN CARRERA AS CA
	ON CA.clave_carrera = AF.clave_carrera
	JOIN (
		SELECT * FROM AFILIADO WHERE jefe = 1
	) AS J
	ON J.clave_carrera = CA.clave_carrera
	JOIN (
		SELECT * FROM DOCENTE
	) AS JC
	ON JC.nomina = J.nomina
	WHERE TRIM(A.clave_academia) LIKE '%'+TRIM(@Clave)+'%'
		AND C.puesto LIKE '%Presidente%'
GO

IF OBJECT_ID('SP_MiembrosAcademia') IS NOT NULL DROP PROC SP_MiembrosAcademia
GO
CREATE PROC SP_MiembrosAcademia @Clave VARCHAR(255) AS
	SELECT D.nomina, D.nombre
	FROM ACADEMIA AS A
	JOIN CARGO AS C
	ON C.clave_academia = A.clave_academia
	JOIN DOCENTE AS D
	ON D.nomina = C.nomina
	WHERE A.clave_academia = @Clave
GO

IF OBJECT_ID('SP_RegistrarPlan') IS NOT NULL DROP PROC SP_RegistrarPlan
GO
CREATE PROC SP_RegistrarPlan @Clave VARCHAR(255), @Ruta VARCHAR(255), @Fecha DATETIME AS
	INSERT INTO PLANTRABAJO (fecha, subido, localizacion, localizacionJson)
	VALUES (@Fecha, 1, @Ruta+'.pdf', @Ruta+'.json')
	INSERT INTO PLANES (id_planTrabajo, clave_academia)
	VALUES ((SELECT @@IDENTITY), @Clave)
GO

IF OBJECT_ID('SP_AgendarFecha') IS NOT NULL DROP PROC SP_AgendarFecha
GO
CREATE PROC SP_AgendarFecha @Ruta VARCHAR(255), @Fecha DATETIME AS
	DECLARE @ID INT
	SELECT @ID = id_planTrabajo FROM PLANTRABAJO WHERE localizacion LIKE '%'+@Ruta+'.pdf%'
	INSERT INTO AGENDA (id_planTrabajo, fecha)
	VALUES (@ID, @Fecha)
GO