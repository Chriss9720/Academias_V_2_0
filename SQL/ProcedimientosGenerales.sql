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