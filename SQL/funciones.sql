IF OBJECT_ID('FUN_ActasTotalesEvidencia') IS NOT NULL DROP FUNCTION FUN_ActasTotalesEvidencia
GO
CREATE FUNCTION FUN_ActasTotalesEvidencia (@Id INT, @No INT)
	RETURNS INT AS BEGIN
		DECLARE @R INT
		SELECT @R = COUNT(*)
		FROM SUBIRACTA AS SA
		JOIN EVIDENCIAACTA AS EA
		ON EA.id_evidencia = SA.id_evidencia
		WHERE id_acta = @Id AND no_tarea = @No
		RETURN @R
	END
GO

IF OBJECT_ID('FUN_ActasSubidasEvidencia') IS NOT NULL DROP FUNCTION FUN_ActasSubidasEvidencia
GO
CREATE FUNCTION FUN_ActasSubidasEvidencia (@Id INT, @No INT)
	RETURNS INT AS BEGIN
		DECLARE @R INT
		SELECT @R = COUNT(*)
		FROM SUBIRACTA AS SA
		JOIN EVIDENCIAACTA AS EA
		ON EA.id_evidencia = SA.id_evidencia
		WHERE id_acta = @Id AND no_tarea = @No AND EA.localizacion IS NOT NULL
		RETURN @R
	END
GO

IF OBJECT_ID('FUN_UltimaFechaActa') IS NOT NULL DROP FUNCTION FUN_UltimaFechaActa
GO
CREATE FUNCTION FUN_UltimaFechaActa (@ID INT)
	RETURNS DATETIME AS BEGIN
		DECLARE @F DATETIME
		SELECT @F = fecha
		FROM HISTORIALACTAS
		WHERE id = (
			SELECT MAX(ID) FROM HISTORIALACTAS WHERE id_acta = @ID
		)
		RETURN @F
	END
GO

IF OBJECT_ID('FUN_UltimaFecha') IS NOT NULL DROP FUNCTION FUN_UltimaFecha
GO
CREATE FUNCTION FUN_UltimaFecha (@ID INT)
	RETURNS DATETIME AS BEGIN
		DECLARE @F DATETIME
		SELECT @F = fecha
		FROM HISTORIALPLAN
		WHERE id = (
			SELECT MAX(ID) FROM HISTORIALPLAN WHERE id_planTrabajo = @ID
		)
		RETURN @F
	END
GO


IF OBJECT_ID('FUN_ExisteDocenteAcademia') IS NOT NULL DROP FUNCTION FUN_ExisteDocenteAcademia
GO
CREATE FUNCTION FUN_ExisteDocenteAcademia (@Nomina INT, @Clave VARCHAR(255))
	RETURNS VARCHAR(255) AS BEGIN
		DECLARE @R VARCHAR(255)
		IF EXISTS(SELECT * FROM VW_DocentesAcademias WHERE nomina = @Nomina AND clave_academia LIKE '%'+@Clave+'%')
			SELECT @R = puesto FROM VW_DocentesAcademias WHERE nomina = @Nomina AND clave_academia LIKE '%'+@Clave+'%'
		ELSE
			SET @R = NULL
		RETURN @R
	END
GO