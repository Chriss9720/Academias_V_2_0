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

IF OBJECT_ID('SP_MisDatos') IS NOT NULL DROP PROC SP_MisDatos
GO
CREATE PROC SP_MisDatos
	@NOMINA INT AS
	SELECT * FROM DOCENTE WHERE NOMINA = @NOMINA
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

IF OBJECT_ID('SP_ActualizarCoordinador') IS NOT NULL DROP PROC SP_ActualizarCoordinador
GO
CREATE PROC SP_ActualizarCoordinador @nue INT AS
	UPDATE DOCENTE
	SET NIVEL = 6
	WHERE NIVEL = 1
	UPDATE DOCENTE
	SET NIVEL = 1
	WHERE nomina = @nue
GROUP