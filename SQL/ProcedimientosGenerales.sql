USE ADMIN_ACADEMIAS
GO

IF OBJECT_ID('SP_Login') IS NOT NULL DROP PROC SP_Login
GO
CREATE PROC SP_Login
	@NOMINA INT,
	@Clave VARCHAR(255) AS
	IF NOT EXISTS (SELECT * FROM DOCENTE WHERE nomina = @NOMINA AND clave = TRIM(@Clave)) BEGIN
		RAISERROR(50001, 11, 1)
	END
	SELECT * FROM DOCENTE WHERE nomina = @NOMINA AND clave = TRIM(@Clave)
GO
