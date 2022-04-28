USE ADMIN_ACADEMIAS
GO

IF OBJECT_ID('SP_Login') IS NOT NULL DROP PROC SP_Login
GO
CREATE PROC SP_Login
	@NOMINA INT,
	@Clave VARCHAR(255) AS
	IF NOT EXISTS (SELECT * FROM DOCENTE WHERE nomina = @NOMINA AND clave = TRIM(@Clave))
		RAISERROR(50001, 11, 1)
	ELSE BEGIN
		DECLARE @BAJA BIT
		SELECT @BAJA = baja FROM DOCENTE WHERE nomina = @NOMINA AND clave = TRIM(@Clave)
		IF @BAJA = 1
			RAISERROR(50003, 11, 1)
	END
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
	FROM DOCENTE WHERE Nivel != 1 AND Nivel != 0 AND baja != 1
GO

IF OBJECT_ID('SP_InfoDocente') IS NOT NULL DROP PROC SP_InfoDocente
GO
CREATE PROC SP_InfoDocente @DOC INT AS
	SELECT * FROM VW_InfoDocente WHERE nomina = @DOC AND baja != 1
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
		ON D.nomina = @Nomina AND C.nomina = @Nomina AND (C.puesto LIKE '%Presidente%' OR C.puesto IS NULL) AND D.baja != 1
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
		ON C.nomina = D.nomina AND D.baja != 1
		WHERE C.puesto LIKE '%Presidente' OR C.puesto IS NULL
	END
GO

IF OBJECT_ID('SP_InfoAcademiaPlanTrabajo') IS NOT NULL DROP PROC SP_InfoAcademiaPlanTrabajo
GO
CREATE PROC SP_InfoAcademiaPlanTrabajo @Clave VARCHAR(255) AS
	SELECT BASE.*, SEC.nombre AS Sec
	FROM (
		SELECT * FROM VW_InfoAcademia
		WHERE TRIM(clave_academia) LIKE '%'+TRIM(@Clave)+'%' AND puesto LIKE '%P%'
	) AS BASE
	LEFT JOIN (
		SELECT * FROM VW_InfoAcademia
		WHERE  puesto LIKE '%Secretario%'
	) AS SEC
	ON TRIM(SEC.clave_academia) LIKE '%'+TRIM(@Clave)+'%'
GO

IF OBJECT_ID('SP_MiembrosAcademia') IS NOT NULL DROP PROC SP_MiembrosAcademia
GO
CREATE PROC SP_MiembrosAcademia @Clave VARCHAR(255) AS
	SELECT D.nomina, D.nombre
	FROM ACADEMIA AS A
	JOIN CARGO AS C
	ON C.clave_academia = A.clave_academia
	JOIN DOCENTE AS D
	ON D.nomina = C.nomina AND D.baja != 1
	WHERE A.clave_academia = @Clave
GO

IF OBJECT_ID('SP_RegistrarPlan') IS NOT NULL DROP PROC SP_RegistrarPlan
GO
CREATE PROC SP_RegistrarPlan @Clave VARCHAR(255), @Ruta VARCHAR(255),
	@Fecha DATETIME, @ID INT, @Semestre VARCHAR(255) AS
	UPDATE PLANTRABAJO
		SET fecha = @Fecha,
			subido = 1,
			localizacion =  @Ruta+'.pdf',
			localizacionJson =  @Ruta+'.json',
			semestre = @Semestre
	WHERE id_planTrabajo = @ID
	INSERT INTO PLANES (id_planTrabajo, clave_academia)
	VALUES (@ID, @Clave)
GO

IF OBJECT_ID('SP_GetIDPlan') IS NOT NULL DROP PROC SP_GetIDPlan
GO
CREATE PROC SP_GetIDPlan @ID INT OUTPUT AS
	IF (SELECT MAX(id_planTrabajo) FROM PLANTRABAJO) IS NOT NULL
		SELECT @ID = (MAX(id_planTrabajo) + 1) FROM PLANTRABAJO
	ELSE
		SELECT @ID = 1
	INSERT INTO PLANTRABAJO (id_planTrabajo, fecha, subido, localizacion, localizacionJson)
	VALUES (@ID, GETDATE(), 0, '', '')
GO

IF OBJECT_ID('SP_AgendarFecha') IS NOT NULL DROP PROC SP_AgendarFecha
GO
CREATE PROC SP_AgendarFecha @ID INT, @Fecha DATETIME AS
	INSERT INTO AGENDA (id_planTrabajo, fecha)
	VALUES (@ID, @Fecha)
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
GO

IF OBJECT_ID('SP_RegistrarDocente') IS NOT NULL DROP PROC SP_RegistrarDocente
GO
CREATE PROC SP_RegistrarDocente @Nomina INT, @Nombre VARCHAR(255),
	@Telefono VARCHAR(255), @Correo VARCHAR(255), @Clave VARCHAR(255),
	@Foto VARCHAR(255) AS
	IF EXISTS(SELECT * FROM DOCENTE WHERE nomina = @Nomina) BEGIN
		RAISERROR(50002, 11, 1)
	END
	ELSE BEGIN
		INSERT INTO DOCENTE (nomina, foto, nombre, correo, telefono, clave)
		VALUES(@Nomina, @Foto, @Nombre, @Correo, @Telefono,	@Clave)
	END
GO

IF OBJECT_ID('SP_EditarDocente') IS NOT NULL DROP PROC SP_EditarDocente
GO
CREATE PROC SP_EditarDocente @Nivel INT, @Nomina INT AS
	IF @Nivel = 1 OR @Nivel = 0 BEGIN
		SELECT * FROM DOCENTE WHERE nivel != 0 AND nivel != 1
	END
	ELSE BEGIN
		SELECT DISTINCT D.nomina, D.nombre, D.foto, D.correo, D.telefono, D.clave, D.baja
		FROM CARGO AS C
		JOIN DOCENTE AS D
		ON D.nomina = C.nomina
		WHERE clave_academia LIKE (
			SELECT clave_academia FROM CARGO AS C
			WHERE C.nomina = @Nomina
			AND ( C.puesto LIKE '%Presidente%' OR C.puesto LIKE '%Secretario%')
		)
		AND C.nomina != @Nomina
	END
GO

IF OBJECT_ID('SP_ActualizarDocente') IS NOT NULL DROP PROC SP_ActualizarDocente
GO
CREATE PROC SP_ActualizarDocente @Nomina INT, @Nombre VARCHAR(255),
	@Telefono VARCHAR(255), @Correo VARCHAR(255), @Clave VARCHAR(255),
	@Foto VARCHAR(255) AS
	UPDATE DOCENTE
	SET nombre = @Nombre,
		telefono = @Telefono,
		correo = @Correo,
		clave = @Clave,
		foto = @Foto
	WHERE nomina = @Nomina
GO

IF OBJECT_ID('SP_BajaDocente') IS NOT NULL DROP PROC SP_BajaDocente
GO
CREATE PROC SP_BajaDocente @Nomina INT AS
	UPDATE DOCENTE
	SET baja = 1
	WHERE nomina = @Nomina AND nivel != 0 AND nivel != 1
GO

IF OBJECT_ID('SP_AltaDocente') IS NOT NULL DROP PROC SP_AltaDocente
GO
CREATE PROC SP_AltaDocente @Nomina INT AS
	UPDATE DOCENTE
	SET baja = 0
	WHERE nomina = @Nomina AND nivel != 0 AND nivel != 1
GO

IF OBJECT_ID('SP_EditarPlan') IS NOT NULL DROP PROC SP_EditarPlan
GO
CREATE PROC SP_EditarPlan @Clave VARCHAR(255) AS
	SELECT PT.*
	FROM PLANTRABAJO AS PT
	JOIN PLANES AS P
	ON P.id_planTrabajo = PT.id_planTrabajo
	JOIN ACADEMIA AS A
	ON A.clave_academia = P.clave_academia
	WHERE SUBIDO = 1 AND A.clave_academia LIKE @Clave
GO

IF OBJECT_ID('SP_DocenteSinCarrera') IS NOT NULL DROP PROC SP_DocenteSinCarrera
GO
CREATE PROC SP_DocenteSinCarrera AS
	SELECT *
	FROM DOCENTE AS DO
	WHERE DO.baja = 0 AND
	DO.nomina NOT IN (
		SELECT nomina FROM AFILIADO WHERE Activo = 1
	)
	AND DO.nivel != 0
GO

IF OBJECT_ID('SP_CrearCarrera') IS NOT NULL DROP PROC SP_CrearCarrera
GO
CREATE PROC SP_CrearCarrera
	@Clave VARCHAR(255),
	@Foto VARCHAR(255),
	@Nombre VARCHAR(255)
	AS
	IF EXISTS (SELECT * FROM CARRERA WHERE clave_carrera LIKE @Clave)
		RAISERROR(50004, 11, 1)
	ELSE
		INSERT INTO CARRERA (clave_carrera, foto_portada, nombre)
		VALUES (@Clave, @Foto, @Nombre)
GO

IF OBJECT_ID('SP_Afiliar') IS NOT NULL DROP PROC SP_Afiliar
GO
CREATE PROC SP_Afiliar
	@Clave VARCHAR(255),
	@Nomina VARCHAR(255),
	@Jefe BIT
	AS
	IF @Jefe = 1 BEGIN
		UPDATE AFILIADO
		SET jefe = 0
		WHERE clave_carrera LIKE @Clave
	END
	IF NOT EXISTS(SELECT * FROM AFILIADO WHERE nomina LIKE @Nomina)
		INSERT INTO AFILIADO (clave_carrera, nomina, jefe)
		VALUES (@Clave, @Nomina, @Jefe)
	ELSE
		UPDATE AFILIADO
		SET jefe = @Jefe, Activo = 1
		WHERE clave_carrera LIKE @Clave AND nomina LIKE @Nomina
GO

IF OBJECT_ID('SP_DocentesEnCarrera') IS NOT NULL DROP PROC SP_DocentesEnCarrera
GO
CREATE PROC SP_DocentesEnCarrera @Clave VARCHAR(255) AS
	SELECT AF.nomina, AF.clave_carrera, AF.jefe, AF.Activo, DO.nombre, DO.foto
	FROM AFILIADO AS AF
	JOIN CARRERA AS CA
	ON CA.clave_carrera LIKE AF.clave_carrera
	JOIN DOCENTE AS DO
	ON DO.nomina = AF.nomina
	WHERE AF.clave_carrera LIKE @Clave AND AF.Activo = 1
GO

IF OBJECT_ID('SP_GetCarreras') IS NOT NULL DROP PROC SP_GetCarreras
GO
CREATE PROC SP_GetCarreras @Nivel INT, @Nomina INT AS
	IF @Nivel = 0 OR @Nivel = 1 BEGIN
		SELECT * FROM CARRERA
	END
	ELSE BEGIN
		SELECT * FROM CARRERA WHERE clave_carrera IN (
			SELECT clave_carrera FROM AFILIADO WHERE jefe = 1 AND nomina = @Nomina
		) AND Activo = 1
	END
GO

IF OBJECT_ID('SP_BajaCarrera') IS NOT NULL DROP PROC SP_BajaCarrera
GO
CREATE PROC SP_BajaCarrera @Clave VARCHAR(255), @Nomina VARCHAR(255) AS
	UPDATE AFILIADO
	SET Activo = 0, jefe = 0
	WHERE clave_carrera LIKE @Clave AND nomina LIKE @Nomina
GO

IF OBJECT_ID('SP_NuevoJefe') IS NOT NULL DROP PROC SP_NuevoJefe
GO
CREATE PROC SP_NuevoJefe @Clave VARCHAR(255), @Nomina VARCHAR(255) AS
	UPDATE AFILIADO
	SET jefe = 0
	WHERE clave_carrera LIKE @Clave
	UPDATE AFILIADO
	SET jefe = 1, Activo = 1
	WHERE clave_carrera LIKE @Clave AND nomina LIKE @Nomina
GO

IF OBJECT_ID('SP_AltaCarrera') IS NOT NULL DROP PROC SP_AltaCarrera
GO
CREATE PROC SP_AltaCarrera @Clave VARCHAR(255), @Nomina VARCHAR(255) AS
	UPDATE AFILIADO
	SET Activo = 1
	WHERE clave_carrera LIKE @Clave AND nomina LIKE @Nomina
GO

IF OBJECT_ID('SP_ActualizarFoto') IS NOT NULL DROP PROC SP_ActualizarFoto
GO
CREATE PROC SP_ActualizarFoto @Clave VARCHAR(255), @Foto VARCHAR(255) AS
	UPDATE CARRERA
	SET foto_portada = @Foto
	WHERE clave_carrera LIKE @Clave
GO

IF OBJECT_ID('SP_LigarMateria') IS NOT NULL DROP PROC SP_LigarMateria
GO
CREATE PROC SP_LigarMateria @Materia VARCHAR(255), @Nomina INT AS
	INSERT INTO MATERIAS (materia, nomina) VALUES (@Materia, @Nomina)
GO

IF OBJECT_ID ('SP_EvidenciaPlan') IS NOT NULL DROP PROC SP_EvidenciaPlan
GO
CREATE PROC SP_EvidenciaPlan @idPlan INT, @nomina INT,
	@noTarea INT, @punto INT, @fecha DATETIME, @Limite BIT AS
	INSERT INTO EVIDENCIA (localizacion, descripcion, nomina)
	VALUES (NULL, NULL, @nomina)
	DECLARE @IDEvidencia INT
	SELECT @IDEvidencia = @@IDENTITY
	INSERT INTO SUBIR (id_planTrabajo, id_evidencia, no_tarea, punto, fecha, limite)
	VALUES(@idPlan, @IDEvidencia, @noTarea, @punto, @fecha, @Limite)
GO

IF OBJECT_ID ('SP_BorrarEvidenciaPlan') IS NOT NULL DROP PROC SP_BorrarEvidenciaPlan
GO
CREATE PROC SP_BorrarEvidenciaPlan @idPlan INT AS
	DELETE FROM EVIDENCIA WHERE id_evidencia IN (
		SELECT id_evidencia FROM SUBIR WHERE id_planTrabajo = @idPlan
	)
	DELETE FROM SUBIR WHERE id_planTrabajo = @idPlan
GO

IF OBJECT_ID ('SP_GetRutasEvidenciaPlan') IS NOT NULL DROP PROC SP_GetRutasEvidenciaPlan
GO
CREATE PROC SP_GetRutasEvidenciaPlan @idPlan INT AS
	SELECT localizacion FROM EVIDENCIA WHERE id_evidencia IN (
		SELECT id_evidencia FROM SUBIR WHERE id_planTrabajo = @idPlan
	)
GO

IF OBJECT_ID ('SP_GetMaterias') IS NOT NULL DROP PROC SP_GetMaterias
GO
CREATE PROC SP_GetMaterias @Mat INT AS
	SELECT * FROM MATERIAS WHERE nomina = @Mat
GO

IF OBJECT_ID ('SP_GetAgenda') IS NOT NULL DROP PROC SP_GetAgenda
GO
CREATE PROC SP_GetAgenda @Nomina INT AS
	DECLARE @Ni INT
	SELECT @Ni = nivel FROM DOCENTE WHERE nomina = @Nomina
	IF @NI != 0 AND @NI != 1 BEGIN
		SELECT AGE.fecha, ACA.nombre
		FROM DOCENTE AS DOC
		JOIN CARGO AS CAR
		ON CAR.nomina = DOC.nomina
		JOIN ACADEMIA AS ACA
		ON ACA.clave_academia LIKE CAR.clave_academia
		JOIN PLANES AS PLS
		ON PLS.clave_academia LIKE ACA.clave_academia
		JOIN AGENDA AS AGE
		ON AGE.id_planTrabajo = PLS.id_planTrabajo
		WHERE DOC.nomina = @Nomina
		ORDER BY fecha
	END
		SELECT AG.fecha, ACA.nombre
		FROM AGENDA AS AG
		JOIN PLANES AS PT
		ON PT.id_planTrabajo = AG.id_planTrabajo
		JOIN ACADEMIA AS ACA
		ON ACA.clave_academia LIKE PT.clave_academia
		ORDER BY fecha
GO

IF OBJECT_ID ('SP_GetDocentesActivos') IS NOT NULL DROP PROC SP_GetDocentesActivos
GO
CREATE PROC SP_GetDocentesActivos AS
	SELECT * FROM DOCENTE WHERE baja = 0 AND nivel != 0
GO

IF OBJECT_ID('SP_CrearAcademia') IS NOT NULL DROP PROC SP_CrearAcademia
GO
CREATE PROC SP_CrearAcademia
	@Clave VARCHAR(255),
	@Foto VARCHAR(255),
	@Nombre VARCHAR(255)
	AS
	IF EXISTS (SELECT * FROM ACADEMIA WHERE clave_academia LIKE @Clave)
		RAISERROR(50005, 11, 1)
	ELSE
		INSERT INTO ACADEMIA (clave_academia, foto_portada, nombre)
		VALUES (@Clave, @Foto, @Nombre)
GO

IF OBJECT_ID('SP_ActualizarPre') IS NOT NULL DROP PROC SP_ActualizarPre
GO
CREATE PROC SP_ActualizarPre
	@Clave VARCHAR(255),
	@Nomina INT AS
	UPDATE CARGO
	SET puesto = 'Docente'
	WHERE clave_academia LIKE '%'+TRIM(@Clave)+'%' AND puesto LIKE '%Presidente%'
	IF EXISTS (SELECT * FROM CARGO WHERE nomina = @Nomina AND  clave_academia LIKE '%'+TRIM(@Clave)+'%') BEGIN
		UPDATE CARGO
		SET puesto = 'Presidente', activo = 1
		WHERE nomina = @Nomina AND  clave_academia LIKE '%'+TRIM(@Clave)+'%'
	END
	ELSE BEGIN
		INSERT INTO CARGO (clave_academia, nomina, puesto)
		VALUES (@Clave, @Nomina, 'Presidente')
	END
GO

IF OBJECT_ID('SP_ActualizarSec') IS NOT NULL DROP PROC SP_ActualizarSec
GO
CREATE PROC SP_ActualizarSec
	@Clave VARCHAR(255),
	@Nomina INT AS
	UPDATE CARGO
	SET puesto = 'Docente'
	WHERE clave_academia LIKE '%'+TRIM(@Clave)+'%' AND puesto LIKE '%Secretario%'
	IF EXISTS (SELECT * FROM CARGO WHERE nomina = @Nomina AND  clave_academia LIKE '%'+TRIM(@Clave)+'%') BEGIN
		UPDATE CARGO
		SET puesto = 'Secretario', activo = 1
		WHERE nomina = @Nomina AND  clave_academia LIKE '%'+TRIM(@Clave)+'%'
	END
	ELSE BEGIN
		INSERT INTO CARGO (clave_academia, nomina, puesto)
		VALUES (@Clave, @Nomina, 'Secretario')
	END
GO

IF OBJECT_ID('SP_RegistrarDocenteAcademia') IS NOT NULL DROP PROC SP_RegistrarDocenteAcademia
GO
CREATE PROC SP_RegistrarDocenteAcademia
	@Clave VARCHAR(255),
	@Nomina INT AS
	IF EXISTS (SELECT * FROM CARGO WHERE nomina = @Nomina AND  clave_academia LIKE '%'+TRIM(@Clave)+'%') BEGIN
		UPDATE CARGO
		SET activo = 1, puesto = 'Docente'
		WHERE nomina = @Nomina AND clave_academia LIKE '%'+TRIM(@Clave)+'%'
	END
	ELSE BEGIN
		INSERT INTO CARGO (clave_academia, nomina, puesto)
		VALUES (@Clave, @Nomina, 'Docente')
	END
GO

IF OBJECT_ID('SP_HistorialPlan') IS NOT NULL DROP PROC SP_HistorialPlan
GO
CREATE PROC SP_HistorialPlan @ID INT, @Fecha DATETIME AS
	INSERT INTO HISTORIALPLAN (id_planTrabajo, fecha)
		VALUES (@ID, @Fecha)
GO

IF OBJECT_ID('SP_HistorialActa') IS NOT NULL DROP PROC SP_HistorialActa
GO
CREATE PROC SP_HistorialActa @ID INT, @Fecha DATETIME AS
	INSERT INTO HISTORIALACTAS(id_acta, fecha)
		VALUES (@ID, @Fecha)
GO

IF OBJECT_ID('SP_DelPlan') IS NOT NULL DROP PROC SP_DelPlan
GO
CREATE PROC SP_DelPlan @ID INT AS
	DELETE FROM AGENDA WHERE id_planTrabajo = @ID
	DELETE FROM EVIDENCIA WHERE id_evidencia IN (
		SELECT id_evidencia FROM SUBIR WHERE id_planTrabajo = @ID
	)
	DELETE FROM SUBIR WHERE id_planTrabajo = @ID
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

IF OBJECT_ID('SP_EditAcademia') IS NOT NULL DROP PROC SP_EditAcademia
GO
CREATE PROC SP_EditAcademia @Clave VARCHAR(255) AS
	SELECT D.nomina, D.nombre, D.baja, D.foto,
	dbo.FUN_ExisteDocenteAcademia(nomina , @Clave) AS Puesto
	FROM DOCENTE AS D
	WHERE baja = 0 AND nivel != 0
GO

IF OBJECT_ID('SP_AllAcademias') IS NOT NULL DROP PROC SP_AllAcademias
GO
CREATE PROC SP_AllAcademias AS
	SELECT * FROM ACADEMIA
GO

IF OBJECT_ID('SP_ActualizarAcademia') IS NOT NULL DROP PROC SP_ActualizarAcademia
GO
CREATE PROC SP_ActualizarAcademia @Clave VARCHAR(255), @Nomina INT,
	@Pre BIT, @Sec BIT, @Act BIT AS
	IF @Act = 1 BEGIN
		IF @Pre = 1 BEGIN
			EXEC SP_ActualizarPre @Clave, @nomina
		END
		ELSE IF @Sec = 1 BEGIN
			EXEC SP_ActualizarSec @Clave, @Nomina
		END
		ELSE BEGIN
			EXEC SP_RegistrarDocenteAcademia @Clave, @Nomina
		END
	END
	ELSE BEGIN
		UPDATE CARGO
		SET activo = 0, puesto = 'Docente'
		WHERE clave_academia LIKE '%'+@Clave+'%' AND nomina = @Nomina
	END
GO

IF OBJECT_ID('SP_GetIDActa') IS NOT NULL DROP PROC SP_GetIDActa
GO
CREATE PROC SP_GetIDActa @ID INT OUTPUT AS
	IF (SELECT MAX(id_acta) FROM ACTA) IS NOT NULL
		SELECT @ID = (MAX(id_acta) + 1) FROM ACTA
	ELSE
		SELECT @ID = 1
	INSERT INTO ACTA (id_acta, subido, localizacion, localizacionJson)
	VALUES (@ID, 0, '', '')
GO

IF OBJECT_ID('SP_RegistrarActa') IS NOT NULL DROP PROC SP_RegistrarActa
GO
CREATE PROC SP_RegistrarActa @Clave VARCHAR(255), @Ruta VARCHAR(255), @ID INT, @Fecha DATETIME, @Semestre VARCHAR(255) AS
	UPDATE ACTA
		SET subido = 1,
			fecha = @Fecha,
			localizacion =  @Ruta+'.pdf',
			localizacionJson =  @Ruta+'.json',
			semestre =  @Semestre
	WHERE id_acta = @ID
	INSERT INTO ACTAS(id_acta, clave_academia)
	VALUES (@ID, @Clave)
GO

IF OBJECT_ID ('SP_EvidenciaActa') IS NOT NULL DROP PROC SP_EvidenciaActa
GO
CREATE PROC SP_EvidenciaActa @idActa INT, @nomina INT,
	@punto INT, @fecha DATETIME, @Limite BIT, @no_tarea INT AS
	INSERT INTO EVIDENCIAACTA(localizacion, descripcion, nomina)
	VALUES (NULL, NULL, @nomina)
	DECLARE @IDEvidencia INT
	SELECT @IDEvidencia = @@IDENTITY
	INSERT INTO SUBIRACTA(id_acta, id_evidencia, punto, fecha, limite, no_tarea)
	VALUES(@idActa, @IDEvidencia, @punto, @fecha, @Limite, @no_tarea)
GO

IF OBJECT_ID('SP_EditarActa') IS NOT NULL DROP PROC SP_EditarActa
GO
CREATE PROC SP_EditarActa @Clave VARCHAR(255) AS
	SELECT PT.*
	FROM ACTA AS PT
	JOIN ACTAS AS P
	ON P.id_acta = PT.id_acta
	JOIN ACADEMIA AS A
	ON A.clave_academia = P.clave_academia
	WHERE SUBIDO = 1 AND A.clave_academia LIKE @Clave
GO

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

IF OBJECT_ID('SP_GetAvance') IS NOT NULL DROP PROC SP_GetAvance
GO
CREATE PROC SP_GetAvance @Id INT, @tarea INT AS
	SELECT dbo.FUN_ActasTotalesEvidencia(@Id, @tarea) AS T, dbo.FUN_ActasSubidasEvidencia(@Id, @tarea) AS S
GO

IF OBJECT_ID('SP_EvaluarDocentes') IS NOT NULL DROP PROC SP_EvaluarDocentes
GO
CREATE PROC SP_EvaluarDocentes @Nomina INT, @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE clave_academia LIKE (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nomina AND puesto LIKE '%Presidente%'
	) AND nomina != @nomina AND activo = 1 AND (periodo NOT LIKE @Periodo OR periodo IS NULL)
	AND puesto NOT LIKE '%Secretario%'
GO

IF OBJECT_ID('SP_SalvarEvaluacion') IS NOT NULL DROP PROC SP_SalvarEvaluacion
GO
CREATE PROC SP_SalvarEvaluacion @ruta VARCHAR(255), @Sem VARCHAR(255),
	@Aca VARCHAR(255), @Nom INT AS
	INSERT INTO EVALUACION (localizacion, localizacionJson, periodo, subido)
		VALUES (@ruta+'.pdf', @ruta+'.json', @Sem, 1)
	UPDATE CARGO
		SET id_evaluacion = (SELECT @@IDENTITY)
		WHERE nomina = @Nom AND clave_academia LIKE '%'+@Aca+'%'
GO

IF OBJECT_ID('SP_EditEvaluarDocentes') IS NOT NULL DROP PROC SP_EditEvaluarDocentes
GO
CREATE PROC SP_EditEvaluarDocentes @Nomina INT, @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE clave_academia LIKE (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nomina AND puesto LIKE '%Presidente%'
	) AND nomina != @nomina AND activo = 1 AND periodo LIKE @Periodo
	AND localizacion IS NOT NULL AND localizacionJson IS NOT NULL
GO

IF OBJECT_ID('SP_EvaluarPresidentes') IS NOT NULL DROP PROC SP_EvaluarPresidentes
GO
CREATE PROC SP_EvaluarPresidentes @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE puesto LIKE '%Presidente%' AND (periodo NOT LIKE @Periodo OR periodo IS NULL)
GO

IF OBJECT_ID('SP_EditEvaluarPresidentes') IS NOT NULL DROP PROC SP_EditEvaluarPresidentes
GO
CREATE PROC SP_EditEvaluarPresidentes @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE puesto LIKE '%Presidente%'
	AND activo = 1 AND periodo LIKE @Periodo
	AND localizacion IS NOT NULL AND localizacionJson IS NOT NULL
GO

IF OBJECT_ID('SP_EvaluarSec') IS NOT NULL DROP PROC SP_EvaluarSec
GO
CREATE PROC SP_EvaluarSec @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE puesto LIKE '%Secretario%' AND (periodo NOT LIKE @Periodo OR periodo IS NULL)
GO

IF OBJECT_ID('SP_EditEvaluarSec') IS NOT NULL DROP PROC SP_EditEvaluarSec
GO
CREATE PROC SP_EditEvaluarSec @Periodo VARCHAR(255) AS
	SELECT * FROM VW_Evaluaciones
	WHERE puesto LIKE '%Secretario%'
	AND activo = 1 AND periodo LIKE @Periodo
	AND localizacion IS NOT NULL AND localizacionJson IS NOT NULL
GO

IF OBJECT_ID('SP_FaltantesEvDoc') IS NOT NULL DROP PROC SP_FaltantesEvDoc
GO
CREATE PROC SP_FaltantesEvDoc  @nomina INT AS
	SELECT * FROM VW_Evaluaciones
	WHERE id_evaluacion IS NOT NULL AND puesto LIKE '%Docente%'
	AND subido = 1 AND clave_academia LIKE (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nomina AND puesto LIKE '%Presidente%'
	) AND nomina != @nomina AND activo = 1
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

IF OBJECT_ID('SP_FaltantesActa') IS NOT NULL DROP PROC SP_FaltantesActa
GO
CREATE PROC SP_FaltantesActa @nomina INT AS
	SELECT *, dbo.FUN_UltimaFechaActa(AC.id_acta) AS LAST
	FROM ACTA AS AC
	JOIN ACTAS AS ACS
	ON ACS.id_acta = AC.id_acta
	JOIN ACADEMIA AS ACA
	ON ACA.clave_academia LIKE ACS.clave_academia
	WHERE ACS.clave_academia LIKE (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nomina AND puesto LIKE '%Presidente%'
	) AND finalizada = 0
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

IF OBJECT_ID('SP_FaltantesPlan') IS NOT NULL DROP PROC SP_FaltantesPlan
GO
CREATE PROC SP_FaltantesPlan @nomina INT AS
	SELECT *, dbo.FUN_UltimaFecha(PT.id_planTrabajo) AS LAST
	FROM PLANES AS PN
	JOIN PLANTRABAJO AS PT
	ON PN.id_planTrabajo = PT.id_planTrabajo
	JOIN ACADEMIA AS ACA
	ON ACA.clave_academia LIKE PN.clave_academia
	WHERE PN.clave_academia LIKE (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nomina AND puesto LIKE '%Presidente%'
	) AND subido = 1
GO

IF OBJECT_ID('SP_FaltantesEvPre') IS NOT NULL DROP PROC SP_FaltantesEvPre
GO
CREATE PROC SP_FaltantesEvPre AS
	SELECT * FROM VW_Evaluaciones
	WHERE id_evaluacion IS NOT NULL AND puesto LIKE '%Presidente%'
	AND subido = 1 AND activo = 1
GO

IF OBJECT_ID('SP_FaltantesEvSec') IS NOT NULL DROP PROC SP_FaltantesEvSec
GO
CREATE PROC SP_FaltantesEvSec AS
	SELECT * FROM VW_Evaluaciones
	WHERE id_evaluacion IS NOT NULL AND puesto LIKE '%Secretario%'
	AND subido = 1 AND activo = 1
GO

IF OBJECT_ID('SP_LiberarPlan') IS NOT NULL DROP PROC SP_LiberarPlan
GO
CREATE PROC SP_LiberarPlan AS
	SELECT *, dbo.FUN_UltimaFecha(PT.id_planTrabajo) AS LAST
	FROM PLANES AS PN
	JOIN PLANTRABAJO AS PT
	ON PN.id_planTrabajo = PT.id_planTrabajo
	WHERE subido = 2
GO

IF OBJECT_ID('SP_LiberarEva') IS NOT NULL DROP PROC SP_LiberarEva
GO
CREATE PROC SP_LiberarEva @Puesto VARCHAR(255) AS
	SELECT CAR.*, EVA.*, ACA.nombre AS Academia, DOC.nombre, CARR.nombre AS Carrera
	FROM CARGO AS CAR
	JOIN EVALUACION AS EVA
	ON EVA.id_evaluacion = CAR.id_evaluacion AND subido = 2
	JOIN ACADEMIA AS ACA
	ON ACA.clave_academia LIKE CAR.clave_academia
	JOIN DOCENTE AS DOC
	ON DOC.nomina = CAR.nomina
	LEFT JOIN AFILIADO AS AF
	ON AF.nomina = DOC.nomina
	LEFT JOIN CARRERA AS CARR
	ON CARR.clave_carrera LIKE AF.clave_carrera
	WHERE puesto LIKE '%'+@Puesto+'%'
GO

IF OBJECT_ID('SP_EvidenciaPendiente') IS NOT NULL DROP PROC SP_EvidenciaPendiente
GO
CREATE PROC SP_EvidenciaPendiente @Nomina INT AS
	SELECT *
	FROM VW_InfoDocumentos
	WHERE EV.localizacion IS NULL  AND nomina = @Nomina
GO

IF OBJECT_ID('SP_FinalizarPlan') IS NOT NULL DROP PROC SP_FinalizarPlan
GO
CREATE PROC SP_FinalizarPlan @Id INT AS
	UPDATE PLANTRABAJO
		SET subido = 2
	WHERE id_planTrabajo = @id
GO

IF OBJECT_ID('SP_FinalizarActas') IS NOT NULL DROP PROC SP_FinalizarActas
GO
CREATE PROC SP_FinalizarActas @Id INT AS
	UPDATE ACTA
		SET finalizada = 1
	WHERE id_acta = @Id
GO

IF OBJECT_ID('SP_FinalizarEvDoc') IS NOT NULL DROP PROC SP_FinalizarEvDoc
GO
CREATE PROC SP_FinalizarEvDoc @Id INT AS
	UPDATE EVALUACION
		SET subido = 2
	WHERE id_evaluacion = @Id
GO

IF OBJECT_ID('SP_LiberarActa') IS NOT NULL DROP PROC SP_LiberarActa
GO
CREATE PROC SP_LiberarActa AS
	SELECT *, dbo.FUN_UltimaFechaActa(id_acta) AS LAST
	FROM ACTA WHERE finalizada = 1 AND liberada = 0
GO

IF OBJECT_ID('SP_LiberarActas') IS NOT NULL DROP PROC SP_LiberarActas
GO
CREATE PROC SP_LiberarActas @Id INT AS
	UPDATE ACTA
		SET liberada = 1
	WHERE id_acta = @Id
GO

IF OBJECT_ID('SP_LiberarPlanes') IS NOT NULL DROP PROC SP_LiberarPlanes
GO
CREATE PROC SP_LiberarPlanes @Id INT AS
	UPDATE PLANTRABAJO
		SET subido = 3
	WHERE id_planTrabajo = @id
GO

IF OBJECT_ID('SP_LiberarEvDocs') IS NOT NULL DROP PROC SP_LiberarEvDocs
GO
CREATE PROC SP_LiberarEvDocs @Id INT AS
	UPDATE EVALUACION
		SET subido = 3
	WHERE id_evaluacion = @Id
GO

IF OBJECT_ID('SP_CancelarPlan') IS NOT NULL DROP PROC SP_CancelarPlan
GO
CREATE PROC SP_CancelarPlan @Id INT AS
	UPDATE PLANTRABAJO
		SET subido = 1
	WHERE id_planTrabajo = @Id
GO

IF OBJECT_ID('SP_CancelarActa') IS NOT NULL DROP PROC SP_CancelarActa
GO
CREATE PROC SP_CancelarActa @Id INT AS
	UPDATE ACTA
		SET subido = 1, finalizada = 0, liberada = 0
	WHERE id_acta = @Id
GO

IF OBJECT_ID('SP_CancelarEva') IS NOT NULL DROP PROC SP_CancelarEva
GO
CREATE PROC SP_CancelarEva @Id INT AS
	UPDATE EVALUACION
		SET subido = 1
	WHERE id_evaluacion = @Id
GO

IF OBJECT_ID('SP_Entregar') IS NOT NULL DROP PROC SP_Entregar
GO
CREATE PROC SP_Entregar @Id INT, @Ruta VARCHAR(255) AS
	UPDATE EVIDENCIA
		SET localizacion = @Ruta
	WHERE id_evidencia = @Id
GO

IF OBJECT_ID('SP_EntregarActa') IS NOT NULL DROP PROC SP_EntregarActa
GO
CREATE PROC SP_EntregarActa @Id INT, @Ruta VARCHAR(255) AS
	UPDATE EVIDENCIAACTA
		SET localizacion = @Ruta
	WHERE id_evidencia = @Id
GO

IF OBJECT_ID ('SP_ActualizarMaterias') IS NOT NULL DROP PROC SP_ActualizarMaterias
GO
CREATE PROC SP_ActualizarMaterias @Nom INT, @Mat VARCHAR(255) AS
	INSERT INTO MATERIAS (materia, nomina)
	VALUES (@Mat, @Nom)
GO

IF OBJECT_ID ('SP_BorrarMaterias') IS NOT NULL DROP PROC SP_BorrarMaterias
GO
CREATE PROC SP_BorrarMaterias @Nom INT AS
	DELETE FROM MATERIAS WHERE nomina = @Nom
GO

IF OBJECT_ID ('SP_GetAllDocentes') IS NOT NULL DROP PROC SP_GetAllDocentes
GO
CREATE PROC SP_GetAllDocentes AS
	SELECT * FROM DOCENTE WHERE nivel != 0 AND baja = 0
GO

IF OBJECT_ID ('SP_InfoBasicaCarrera') IS NOT NULL DROP PROC SP_InfoBasicaCarrera
GO
CREATE PROC SP_InfoBasicaCarrera @Nom INT AS
	SELECT *
	FROM VW_InfoCarrera
	WHERE clave_carrera LIKE (
		SELECT clave_carrera FROM AFILIADO WHERE nomina = @Nom
	)
GO

IF OBJECT_ID ('SP_InfoBasicaAcademia') IS NOT NULL DROP PROC SP_InfoBasicaAcademia
GO
CREATE PROC SP_InfoBasicaAcademia @Nom INT AS
	SELECT *
	FROM VW_InfoAcademias
	WHERE clave_academia IN (
		SELECT clave_academia FROM CARGO WHERE nomina = @Nom
	)
GO

IF OBJECT_ID ('SP_InfoBasicaDocumentos') IS NOT NULL DROP PROC SP_InfoBasicaDocumentos
GO
CREATE PROC SP_InfoBasicaDocumentos @Nom INT AS
	SELECT *
	FROM VW_InfoDocumentos
	WHERE localizacion IS NOT NULL AND nomina = @Nom
	UNION
	SELECT id_evaluacion, localizacion, null, nomina,
	'Evaluacion', NULL, 0, 0 ,0, localizacionJson, null,
	Academia, 0
	FROM VW_Evaluaciones
	WHERE id_evaluacion IS NOT NULL AND localizacion IS NOT NULL AND nomina = @Nom
GO

IF OBJECT_ID ('SP_InfoBasicaCarreras') IS NOT NULL DROP PROC SP_InfoBasicaCarreras
GO
CREATE PROC SP_InfoBasicaCarreras AS
	SELECT CAR.*, D.foto, D.nombre AS ND
	FROM CARRERA AS CAR
	JOIN AFILIADO AS AF
	ON AF.clave_carrera LIKE CAR.clave_carrera AND AF.Activo = 1
	JOIN DOCENTE AS D
	ON D.nomina = AF.nomina AND AF.jefe = 1
	WHERE CAR.activo = 1
GO

IF OBJECT_ID ('SP_InfoDocentesCarreraBasica') IS NOT NULL DROP PROC SP_InfoDocentesCarreraBasica
GO
CREATE PROC SP_InfoDocentesCarreraBasica @Clave VARCHAR(255) AS
	SELECT *
	FROM AFILIADO AS AF
	JOIN DOCENTE AS D
	ON D.nomina = AF.nomina AND AF.Activo = 1
	WHERE AF.clave_carrera LIKE '%'+@Clave+'%' AND AF.jefe != 1
GO

IF OBJECT_ID ('SP_GetPuestoAcademia') IS NOT NULL DROP PROC SP_GetPuestoAcademia
GO
CREATE PROC SP_GetPuestoAcademia @Clave VARCHAR(255), @Puesto VARCHAR(255) AS
	SELECT D.nomina, D.nombre, D.correo, D.foto
	FROM CARGO AS C
	JOIN DOCENTE AS D
	ON C.nomina = D.nomina
	WHERE puesto LIKE '%'+@Puesto+'%' AND clave_academia LIKE '%'+@Clave+'%'
GO

IF OBJECT_ID ('SP_GetActasAcademia') IS NOT NULL DROP PROC SP_GetActasAcademia
GO
CREATE PROC SP_GetActasAcademia @Clave VARCHAR(255) AS
	SELECT A.fecha, A.Semestre, localizacion, A.id_acta, A.localizacionJson
	FROM ACTAS AS AC
	JOIN ACTA AS A
	ON AC.id_acta = A.id_acta
	WHERE clave_academia LIKE '%'+@Clave+'%'
GO

IF OBJECT_ID ('SP_GetAgendaAcademia') IS NOT NULL DROP PROC SP_GetAgendaAcademia
GO
CREATE PROC SP_GetAgendaAcademia @Clave VARCHAR(255) AS
	SELECT DISTINCT AG.fecha
	FROM AGENDA AS AG
	JOIN PLANTRABAJO AS PT
	ON PT.id_planTrabajo = AG.id_planTrabajo
	JOIN PLANES AS PS
	ON PS.id_planTrabajo = PT.id_planTrabajo
	WHERE PS.clave_academia LIKE '%'+@Clave+'%'
GO

IF OBJECT_ID ('SP_GetDocentesAcademia') IS NOT NULL DROP PROC SP_GetDocentesAcademia
GO
CREATE PROC SP_GetDocentesAcademia @Clave VARCHAR(255) AS
	SELECT D.nomina, D.foto, D.correo, D.nombre
	FROM CARGO AS CA
	JOIN DOCENTE AS D
	ON D.nomina = CA.nomina
	WHERE CA.clave_academia LIKE '%'+@Clave+'%' AND activo = 1
GO

IF OBJECT_ID ('SP_GetPlanesAcademia') IS NOT NULL DROP PROC SP_GetPlanesAcademia
GO
CREATE PROC SP_GetPlanesAcademia @Clave VARCHAR(255) AS
	SELECT PT.fecha, PT.localizacion, PT.Semestre, PT.id_planTrabajo, PT.localizacionJson
	FROM PLANES AS P
	JOIN PLANTRABAJO AS PT
	ON PT.id_planTrabajo = P.id_planTrabajo
	WHERE clave_academia LIKE '%'+@Clave+'%'
GO

IF OBJECT_ID ('SP_InfoLigadaActa') IS NOT NULL DROP PROC SP_InfoLigadaActa
GO
CREATE PROC SP_InfoLigadaActa @Id INT AS
	SELECT EA.*, D.nombre, SA.no_tarea, SA.punto
	FROM ACTA AS AC
	JOIN SUBIRACTA AS SA
	ON SA.id_acta = AC.id_acta
	JOIN EVIDENCIAACTA AS EA
	ON EA.id_evidencia = SA.id_evidencia
	JOIN DOCENTE AS D
	ON D.nomina = EA.nomina
	WHERE AC.id_acta = @ID AND EA.localizacion IS NOT NULL
GO

IF OBJECT_ID ('SP_InfoLigadaPlan') IS NOT NULL DROP PROC SP_InfoLigadaPlan
GO
CREATE PROC SP_InfoLigadaPlan @Id INT AS
	SELECT EV.*, D.nombre, SU.no_tarea, SU.punto
	FROM PLANTRABAJO AS PT
	JOIN SUBIR AS SU
	ON SU.id_planTrabajo = PT.id_planTrabajo
	JOIN EVIDENCIA AS EV
	ON EV.id_evidencia = SU.id_evidencia
	JOIN DOCENTE AS D
	ON D.nomina = EV.nomina
	WHERE PT.id_planTrabajo = @Id AND EV.localizacion IS NOT NULL
GO