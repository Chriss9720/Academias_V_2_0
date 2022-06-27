<?php

    require_once 'vendor/autoload.php';
    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    if (!$session->activo()) {
        http_response_code(404);
        die("Solicitar Reinicio de sesion");
    }

    function eliminar($data, $ruta)
    {
        for ($i = 0; $i < count($data); $i++) {
            $dato = utf8_encode($data[$i]);
            $path = "$ruta/$dato.pdf";
            if (file_exists($path)) {
                unlink($path);
            }
        }
    }

    function limpiar($id) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_BorrarEvidenciaPlan(?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function salvarLigado($id, $nomina, $tarea, $punto, $fecha) {
        $punto = $punto + 1;
        if (strlen($fecha) > 0) {
            $fecha = fechaFormat($fecha);
            $l = 1;
        } else {
            $l = 0;
        }
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_EvidenciaPlan(?,?,?,?,?,?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN),
            array(&$nomina, SQLSRV_PARAM_IN),
            array(&$tarea, SQLSRV_PARAM_IN),
            array(&$punto, SQLSRV_PARAM_IN),
            array(&$fecha, SQLSRV_PARAM_IN),
            array(&$l, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function ligarResponsables($id, $data) {
        limpiar($id);
        $data = json_decode($data, true);
        for($i = 1; $i < 10; $i++) {
            $act = $data[$i];
            for ($j = 0; $j < count($act["Responsables"]); $j++){
                $nomina = $act["Responsables"][$j]["nomina"];
                $fecha = $act["fecha"];
                for ($k = 0; $k < count($act["tareas"]); $k++){
                    $t = $act["tareas"][$k];
                    salvarLigado($id, $nomina, $i, $k, $fecha);
                }
            }
        }
    }

    function getResponsables($responsables, $in, $clave)
    {
        $ret = "<ul>";
        for ($i = 0; $i < count($responsables); $i++) {
            $nombre = utf8_decode($responsables[$i]["nombre"]);
            $ret .= "<li>$nombre</li>";
        }
        $ret .= "</ul>";
        $in[$clave] = $ret;
        return $in;
    }

    function getIDPLan() {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $id = intval(-2);
        $call = "{call dbo.SP_GetIDPlan(?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_OUT)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
        return $id;
    }

    function actualizarFecha($id, $hoy) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_HistorialPlan(?,?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN),
            array(&$hoy, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function salvarPlan($ruta, $academia, $hoy, $sem)
    {
        $id = getIDPLan();
        $conectar = new Conectar();
        $con = $conectar->conn();
        $ruta2  = utf8_decode($ruta);
        $call = "{call dbo.SP_RegistrarPlan(?,?,?,?,?)}";
        $params = array(
            array(&$academia, SQLSRV_PARAM_IN),
            array(&$ruta2, SQLSRV_PARAM_IN),
            array(&$hoy, SQLSRV_PARAM_IN),
            array(&$id, SQLSRV_PARAM_IN),
            array(&$sem, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
        actualizarFecha($id, $hoy);
        return $id;
    }

    function fechaFormat($date)
    {
        $split = explode(' ', $date);
        $fecha = explode('-', $split[0]);
        $hora = $split[1];
        return "$fecha[2]/$fecha[1]/$fecha[0] $hora";
    }

    function salvarFecha($id, $fecha, $desc)
    {
        if (strlen($fecha) > 0) {
            $fecha = fechaFormat($fecha);
            $conectar = new Conectar();
            $con = $conectar->conn();
            $call = "{call dbo.SP_AgendarFecha(?,?,?)}";
            $params = array(
                array(&$id, SQLSRV_PARAM_IN),
                array(&$fecha, SQLSRV_PARAM_IN),
                array(&$desc, SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($con, $call, $params);
            if ($stmt === false) {
                if (($errors = sqlsrv_errors()) != null) {
                    $error = print_r($errors[0]['message'], true);
                    $errors = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $errors);
                    http_response_code(402);
                    die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
                }
            }
            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);
        }
    }

    function crearCapera($ruta)
    {
        if (!file_exists($ruta)) {
            mkdir($ruta, 0777, true);
        }
    }

    function delPlan($id) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_DelPlan(?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $errors = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $errors);
                http_response_code(402);
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    $datos = json_decode(json_encode($_POST['data']), true);
    $del = false;
    if (array_key_exists('temp', json_decode(json_encode($_POST)))) {
        $del = true;
        $temp = json_decode(json_encode($_POST['temp']), true);
    }
    $academia = utf8_decode($datos['datos']['academia']);
    $academiaN = utf8_encode($academia);
    $preview = $datos['preview'];
    $editar = $datos['editar'];
    $claveAcademia = utf8_decode($datos['datos']['claveAcademia']);
    $semestre = utf8_decode($datos['datos']['semestre']);
    $presidente = utf8_decode($datos['datos']['presidente']);
    $jefe = utf8_decode($datos['datos']['jefe']);
    $coordinador = utf8_decode($datos['datos']['coordinador']);
    $fecha = utf8_decode($datos['fecha']);
    $fechas = $datos['fechas'];
    $fecha_1 = utf8_decode($datos['fechas']['fecha_1']);
    $fecha_2 = utf8_decode($datos['fechas']['fecha_2']);
    $fecha_3 = utf8_decode($datos['fechas']['fecha_3']);
    $fecha_4 = utf8_decode($datos['fechas']['fecha_4']);
    $desc_1 = utf8_decode($datos['desc']['desc_1']);
    $desc_2 = utf8_decode($datos['desc']['desc_2']);
    $desc_3 = utf8_decode($datos['desc']['desc_3']);
    $desc_4 = utf8_decode($datos['desc']['desc_4']);
    $actividad1 = $datos['1'];
    $actividad2 = $datos['2'];
    $actividad3 = $datos['3'];
    $actividad4 = $datos['4'];
    $actividad5 = $datos['5'];
    $actividad6 = $datos['6'];
    $actividad7 = $datos['7'];
    $actividad8 = $datos['8'];
    $actividad9 = $datos['9'];
    if ($editar == 1) {
        $id = $datos["id"];
        delPlan($id);
    }

    $responsables = [];

    if (array_key_exists('Responsables', $actividad1)) {
        $responsables = getResponsables($actividad1["Responsables"], $responsables, 1);
    } else {
        $responsables[1] = "";
    }
    if (array_key_exists('Responsables', $actividad2)) {
        $responsables = getResponsables($actividad2["Responsables"], $responsables, 2);
    } else {
        $responsables[2] = "";
    }
    if (array_key_exists('Responsables', $actividad3)) {
        $responsables = getResponsables($actividad3["Responsables"], $responsables, 3);
    } else {
        $responsables[3] = "";
    }
    if (array_key_exists('Responsables', $actividad4)) {
        $responsables = getResponsables($actividad4["Responsables"], $responsables, 4);
    } else {
        $responsables[4] = "";
    }
    if (array_key_exists('Responsables', $actividad5)) {
        $responsables = getResponsables($actividad5["Responsables"], $responsables, 5);
    } else {
        $responsables[5] = "";
    }
    if (array_key_exists('Responsables', $actividad6)) {
        $responsables = getResponsables($actividad6["Responsables"], $responsables, 6);
    } else {
        $responsables[6] = "";
    }
    if (array_key_exists('Responsables', $actividad7)) {
        $responsables = getResponsables($actividad7["Responsables"], $responsables, 7);
    } else {
        $responsables[7] = "";
    }
    if (array_key_exists('Responsables', $actividad8)) {
        $responsables = getResponsables($actividad8["Responsables"], $responsables, 8);
    } else {
        $responsables[8] = "";
    }
    if (array_key_exists('Responsables', $actividad9)) {
        $responsables = getResponsables($actividad9["Responsables"], $responsables, 9);
    } else {
        $responsables[9] = "";
    }

    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [215.9, 279.4],
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false'
    ]);

    $mpdf->SetHTMLFooter('Pag. {PAGENO} de {nb}');

    $miCss = file_get_contents('../css/generacionPdfPlan.css');
    $mpdf->WriteHTML($miCss, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->SetHTMLHeader("
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='area_IMG borde_derecho'>
                        <img src='../img/logo_ITESCA.png' alt='logo itesca' class='logo_ITESCA'>
                    </td>
                    <td class='area_titulo centrar'>
                        <label class='nombre_documento'><b>PLAN DE TRABAJO DE ACADEMIAS</b></label>
                        <br>
                        <label class='subtitulo'>F03PSA01.03</label>
                    </td>
                </tr>
            </tbody>
        </table>
    ");

    function getTareas($act) {
        if (array_key_exists('tareas', $act)) {
            return $act['tareas'];
        } else{
            return [];
        }
    }

    $actividad_1 = array(
        "Acciones"=>utf8_encode($actividad1['Acciones']),
        "Asignaturas"=>utf8_encode($actividad1['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[1]),
        "fecha"=>utf8_encode($actividad1['fecha']),
        "Evidencia"=>utf8_encode($actividad1['Evidencia']),
        "tareas"=>getTareas($actividad1)
    );

    $actividad_2 = array(
        "Acciones"=>utf8_encode($actividad2['Acciones']),
        "Asignaturas"=>utf8_encode($actividad2['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[2]),
        "fecha"=>utf8_encode($actividad2['fecha']),
        "Evidencia"=>utf8_encode($actividad2['Evidencia']),
        "tareas"=>getTareas($actividad2)
    );

    $actividad_3 = array(
        "Acciones"=>utf8_encode($actividad3['Acciones']),
        "Asignaturas"=>utf8_encode($actividad3['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[3]),
        "fecha"=>utf8_encode($actividad3['fecha']),
        "Evidencia"=>utf8_encode($actividad3['Evidencia']),
        "tareas"=>getTareas($actividad3)
    );

    $actividad_4 = array(
        "Acciones"=>utf8_encode($actividad4['Acciones']),
        "Asignaturas"=>utf8_encode($actividad4['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[4]),
        "fecha"=>utf8_encode($actividad4['fecha']),
        "Evidencia"=>utf8_encode($actividad4['Evidencia']),
        "tareas"=>getTareas($actividad4)
    );

    $actividad_5 = array(
        "Acciones"=>utf8_encode($actividad5['Acciones']),
        "Asignaturas"=>utf8_encode($actividad5['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[5]),
        "fecha"=>utf8_encode($actividad5['fecha']),
        "Evidencia"=>utf8_encode($actividad5['Evidencia']),
        "tareas"=>getTareas($actividad5)
    );

    $actividad_6 = array(
        "Acciones"=>utf8_encode($actividad6['Acciones']),
        "Asignaturas"=>utf8_encode($actividad6['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[6]),
        "fecha"=>utf8_encode($actividad6['fecha']),
        "Evidencia"=>utf8_encode($actividad6['Evidencia']),
        "tareas"=>getTareas($actividad6)
    );

    $actividad_7 = array(
        "Acciones"=>utf8_encode($actividad7['Acciones']),
        "Asignaturas"=>utf8_encode($actividad7['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[7]),
        "fecha"=>utf8_encode($actividad7['fecha']),
        "Evidencia"=>utf8_encode($actividad7['Evidencia']),
        "tareas"=>getTareas($actividad7)
    );

    $actividad_8 = array(
        "Acciones"=>utf8_encode($actividad8['Acciones']),
        "Asignaturas"=>utf8_encode($actividad8['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[8]),
        "fecha"=>utf8_encode($actividad8['fecha']),
        "Evidencia"=>utf8_encode($actividad8['Evidencia']),
        "tareas"=>getTareas($actividad8)
    );

    $actividad_9 = array(
        "Acciones"=>utf8_encode($actividad9['Acciones']),
        "Asignaturas"=>utf8_encode($actividad9['Asignaturas']),
        "Responsables"=>utf8_encode($responsables[9]),
        "fecha"=>utf8_encode($actividad9['fecha']),
        "Evidencia"=>utf8_encode($actividad9['Evidencia']),
        "tareas"=>getTareas($actividad9)
    );

    $mpdf->WriteHTML("
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='borde_derecho fuente academia negrita fondo_contenido texto_derecha'>
                        Nombre de la Academia:
                    </td>
                    <td class='borde_derecho academia_d centrar'>
                        $academiaN
                    </td>
                    <td class='borde_derecho semestre fuente negrita fondo_contenido texto_derecha'>
                        Semestre:
                    </td>
                    <td class='semestre_d'>
                        $semestre
                    </td>
                </tr>
            </tbody>
        </table>
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='presiente negrita fuente borde_derecho texto_derecha fondo_contenido'>
                        Presidente:
                    </td>
                    <td class='presiente_d centrar'>
                        $presidente
                    </td>
                </tr>
            </tbody>
        </table>
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='fecha negrita fuente centrar fondo_contenido'>
                        Fechas de reuniones
                    </td>
                </tr>
            </tbody>
        </table>
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='reunion borde_derecho negrita fuente centrar fondo_contenido'>
                        1ra reunión:
                    </td>
                    <td class='reunion_d centrar borde_derecho'>
                        $fecha_1
                    </td>
                    <td class='reunion borde_derecho negrita fuente centrar fondo_contenido'>
                        2da reunión:
                    </td>
                    <td class='reunion_d centrar'>
                        $fecha_2
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho reunion negrita fuente centrar fondo_contenido'>
                        3ra reunión:
                    </td>
                    <td class='borde_superior reunion_d centrar borde_derecho'>
                        $fecha_3
                    </td>
                    <td class='borde_superior reunion borde_derecho negrita fuente centrar fondo_contenido'>
                        4ta reunión:
                    </td>
                    <td class='borde_superior reunion_d centrar'>
                        $fecha_4
                    </td>
                </tr>
            </tbody>
        </table>
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='fuente columna_1 centrar borde_derecho negrita fondo_contenido'>
                        No.
                    </td>
                    <td class='centrar fuente columna_2 borde_derecho negrita fondo_contenido'>
                        Actividades
                    </td>
                    <td class='fuente columna_3 borde_derecho negrita fondo_contenido'>
                        Acciones específicas para cada actividad
                    </td>
                    <td class='centrar fuente columna_4 borde_derecho negrita fondo_contenido'>
                        Asignaturas en las que impacta
                    </td>
                    <td class='centrar fuente columna_5 borde_derecho negrita fondo_contenido'>
                        Responsable
                    </td>
                    <td class='centrar fuente columna_6 borde_derecho negrita fondo_contenido'>
                        Fecha de cumplimiento
                    </td>
                    <td class='centrar fuente columna_7 negrita fondo_contenido'>
                        Evidencia a entregar
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        1
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Mejoras e innovación de procesos de enseñanza y aprendizaje, incluye implementación de casos, semanas académicas, visitas industriales, proyectos de desarrollo comunitario, etc.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_1['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_1['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_1['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_1['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_1['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        2
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Uniformizar actividades de formación práctica en asignaturas, talleres y laboratorios.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_2['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_2['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_2['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_2['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_2['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        3
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Programación de viajes académicos y/o actividades de vinculación.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_3['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_3['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_3['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_3['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_3['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        4
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Programa de seguimiento y solución estratégica de las materias (PSSEM).
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_4['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_4['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_4['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_4['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_4['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        5
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Integrar banco de proyectos integradores y de residencias profesionales.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_5['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_5['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_5['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_5['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_5['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        6
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Revisión y actualización de requerimientos de bibliografía básica y de consulta de los programas de curso.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_6['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_6['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_6['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_6['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_6['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        7
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Desarrollar proyectos de investigación. Publicación de artículos académicos.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_7['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_7['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_7['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_7['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_7['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        8
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Diseño, rediseño o actualización y validación de instrumentaciones didácticas.
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_8['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_8['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_8['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_8['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_8['Evidencia']}
                    </td>
                </tr>
                <tr>
                    <td class='borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido'>
                        9
                    </td>
                    <td class='columna_2 borde_superior borde_derecho fuente'>
                        Generar y validar instrumentos de evaluación (rubricas, listas de cotejo) y pruebas departamentales
                    </td>
                    <td class='columna_3 borde_superior borde_derecho fuente'>
                        ${actividad_9['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad_9['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${actividad_9['Responsables']}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad_9['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad_9['Evidencia']}
                    </td>
                </tr>
            </tbody>
        </table>

        <br/><br/>

        <table>
            <tbody>
                <tr>
                    <td class='centrar fuente borde_izquierdo borde_superior borde_derecho firmas'>
                        Elaboró
                    </td>
                    <td class='centrar fuente borde_superior borde_izquierdo borde_derecho firmas'>
                        Validó
                    </td>
                    <td class='centrar borde_superior borde_derecho borde_izquierdo fuente firmas'>
                        Supervisó
                    </td>
                </tr>
                <tr>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior borde_derecho fuente firmas'>
                        $presidente
                    </td>
                    <td class='firma bajar borde_superior borde_derecho borde_inferior borde_izquierdo borde_derecho fuente  firmas'>
                        $jefe
                    </td>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior firmas'>
                        $coordinador
                    </td>
                </tr>
                <tr>
                    <td class='centrar fuente borde_izquierdo borde_derecho borde_inferior firmas'>
                        Presidente de Academia
                    </td>
                    <td class='centrar fuente borde_izquierdo borde_derecho borde_inferior firmas'>
                        Jefe de División de Carrera y/o Coordinador de Extensión
                    </td>
                    <td class='centrar borde_derecho borde_izquierdo fuente borde_inferior firmas'>
                        Coordinador de Presidentes de Academias
                    </td>
                </tr>
            </tbody>
        </table>
    ");

    if ($preview == 0) {
        $carpeta = "../Docs/Planes/$claveAcademia";
    } else {
        $carpeta = "../Docs/Planes/$claveAcademia/temp";
    }

    if (array_key_exists('Responsables', $actividad1)) {
        $actividad_1["Responsables"] = $actividad1["Responsables"];
    } else{
        $actividad_1["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad2)) {
        $actividad_2["Responsables"] = $actividad2["Responsables"];
    } else{
        $actividad_2["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad3)) {
        $actividad_3["Responsables"] = $actividad3["Responsables"];
    } else{
        $actividad_3["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad4)) {
        $actividad_4["Responsables"] = $actividad4["Responsables"];
    } else{
        $actividad_4["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad5)) {
        $actividad_5["Responsables"] = $actividad5["Responsables"];
    } else{
        $actividad_5["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad6)) {
        $actividad_6["Responsables"] = $actividad6["Responsables"];
    } else{
        $actividad_6["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad7)) {
        $actividad_7["Responsables"] = $actividad7["Responsables"];
    } else{
        $actividad_7["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad8)) {
        $actividad_8["Responsables"] = $actividad8["Responsables"];
    } else{
        $actividad_8["Responsables"] = array();
    }
    if (array_key_exists('Responsables', $actividad9)) {
        $actividad_9["Responsables"] = $actividad9["Responsables"];
    } else{
        $actividad_9["Responsables"] = array();
    }

    crearCapera("$carpeta");

    $nombre = ($datos['fechaG']);
    $ruta = "$carpeta/$nombre";
    $nombreArchivo = utf8_decode("$ruta.pdf");
    $nombreJson = utf8_decode("$ruta.json");

    $mpdf -> Output("$nombreArchivo", 'F');

    if ($preview == 0) {
        if ($del) {
            eliminar($temp, "$carpeta/temp");
        }
        if ($editar == 0) {
            $id = salvarPlan($ruta, $claveAcademia, $fecha, $semestre);
        }
        salvarFecha($id, $fecha_1, $desc_1);
        salvarFecha($id, $fecha_2, $desc_2);
        salvarFecha($id, $fecha_3, $desc_3);
        salvarFecha($id, $fecha_4, $desc_4);
        $json = json_encode(array(
            "1"=>($actividad_1),
            "2"=>($actividad_2),
            "3"=>($actividad_3),
            "4"=>($actividad_4),
            "5"=>($actividad_5),
            "6"=>($actividad_6),
            "7"=>($actividad_7),
            "8"=>($actividad_8),
            "9"=>($actividad_9),
            "fecha"=>$fecha,
            "fechaG"=>utf8_encode($nombre),
            "datos"=>array(
                "claveAcademia"=> utf8_encode($claveAcademia),
                "academia"=> utf8_encode($academia),
                "presidente"=> utf8_encode($presidente),
                "semestre"=> $semestre,
                "jefe"=> utf8_encode($jefe),
                "coordinador"=> utf8_encode($coordinador)
            ),
            "fechas"=>array(
                "fecha_1"=>$fecha_1,
                "fecha_2"=>$fecha_2,
                "fecha_3"=>$fecha_3,
                "fecha_4"=>$fecha_4
            ),
            "desc"=> array(
                "desc_1"=>$desc_1,
                "desc_2"=>$desc_2,
                "desc_3"=>$desc_3,
                "desc_4"=>$desc_4
            )
        ));
        $bytes = file_put_contents($nombreJson, $json);
        ligarResponsables($id, $json);
    }

    $nombreArchivo = utf8_encode($nombreArchivo);
    echo json_encode(array('ruta'=>"Academias/$nombreArchivo"));

?>