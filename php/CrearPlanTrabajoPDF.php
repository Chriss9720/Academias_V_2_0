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
            $dato = $data[$i];
            $path = "$ruta/$dato.pdf";
            if (file_exists($path)) {
                unlink($path);
            }
        }
    }

    function getResponsables($responsables, $in, $clave)
    {
        $ret = "<ul>";
        for ($i = 0; $i < count($responsables); $i++) {
            $nombre = $responsables[$i]["nombre"];
            $ret .= "<li>$nombre</li>";
        }
        $ret .= "</ul>";
        $in[$clave] = $ret;
        return $in;
    }

    function salvarPlan($ruta, $academia, $hoy)
    {
        $conectar = new Conectar();
        $con = $conectar->conn();

        $call = "{call dbo.SP_RegistrarPlan(?,?,?)}";
        $params = array(
            array(&$academia, SQLSRV_PARAM_IN),
            array(&$ruta, SQLSRV_PARAM_IN),
            array(&$hoy, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>$error)));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function fechaFormat($date)
    {
        $split = explode(' ', $date);
        $fecha = explode('-', $split[0]);
        $hora = $split[1];
        return $fecha[2]."/".$fecha[1]."/".$fecha[0];
    }

    function salvarFecha($ruta, $fecha)
    {
        if (strlen($fecha) > 0) {
            $fecha = fechaFormat($fecha);
            $conectar = new Conectar();
            $con = $conectar->conn();

            $call = "{call dbo.SP_AgendarFecha(?,?)}";
            $params = array(
                array(&$ruta, SQLSRV_PARAM_IN),
                array(&$fecha, SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($con, $call, $params);
            if ($stmt === false) {
                if (($errors = sqlsrv_errors()) != null) {
                    $error = print_r($errors[0]['message'], true);
                    $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                    http_response_code(402);
                    die(json_encode(array("status"=>402, "msg"=>$error)));
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

    $datos = json_decode(json_encode($_POST['data']), true);
    $del = false;
    if (array_key_exists('temp', json_decode(json_encode($_POST)))) {
        $del = true;
        $temp = json_decode(json_encode($_POST['temp']), true);
    }
    $academia = $datos['datos']['academia'];
    $preview = $datos['preview'];
    $claveAcademia = $datos['datos']['claveAcademia'];
    $semestre = $datos['datos']['semestre'];
    $presidente = $datos['datos']['presidente'];
    $jefe = $datos['datos']['jefe'];
    $coordinador = $datos['datos']['coordinador'];
    $fecha = $datos['fecha'];
    $fechas = $datos['fechas'];
    $fecha_1 = $datos['fechas']['fecha_1'];
    $fecha_2 = $datos['fechas']['fecha_2'];
    $fecha_3 = $datos['fechas']['fecha_3'];
    $fecha_4 = $datos['fechas']['fecha_4'];
    $actividad1 = $datos['1'];
    $actividad2 = $datos['2'];
    $actividad3 = $datos['3'];
    $actividad4 = $datos['4'];
    $actividad5 = $datos['5'];
    $actividad6 = $datos['6'];
    $actividad7 = $datos['7'];
    $actividad8 = $datos['8'];
    $actividad9 = $datos['9'];

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

    $mpdf->WriteHTML("
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='borde_derecho fuente academia negrita fondo_contenido texto_derecha'>
                        Nombre de la Academia:
                    </td>
                    <td class='borde_derecho academia_d centrar'>
                        $academia
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
                        ${actividad1['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad1['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[1]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad1['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad1['Evidencia']}
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
                        ${actividad2['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad2['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[2]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad2['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad2['Evidencia']}
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
                        ${actividad3['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad3['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[3]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad3['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad3['Evidencia']}
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
                        ${actividad4['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad4['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[4]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad4['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad4['Evidencia']}
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
                        ${actividad5['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad5['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[5]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad5['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad5['Evidencia']}
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
                        ${actividad6['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad6['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[6]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad6['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad6['Evidencia']}
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
                        ${actividad7['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad7['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[7]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad7['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad7['Evidencia']}
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
                        ${actividad8['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad8['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[8]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad8['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad8['Evidencia']}
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
                        ${actividad9['Acciones']}
                    </td>
                    <td class='columna_4 borde_superior borde_derecho fuente'>
                        ${actividad9['Asignaturas']}
                    </td>
                    <td class='columna_5 borde_superior borde_derecho fuente'>
                        ${responsables[9]}
                    </td>
                    <td class='columna_6 borde_superior borde_derecho fuente'>
                        ${actividad9['fecha']}
                    </td>
                    <td class='columna_7 borde_superior fuente'>
                        ${actividad9['Evidencia']}
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
                    <td class='firma centrar borde_superior borde_izquierdo borde_derecho borde_inferior borde_derecho fuente firmas'>
                        $presidente
                    </td>
                    <td class='firma centrar borde_superior borde_derecho borde_inferior borde_izquierdo borde_derecho fuente  firmas'>
                        $jefe
                    </td>
                    <td class='firma centrar borde_superior borde_izquierdo borde_derecho borde_inferior firmas'>
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

    crearCapera("$carpeta");

    $nombre = $datos['fechaG'];
    $ruta = "$carpeta/$nombre";
    $nombreArchivo = "$ruta.pdf";
    $nombreJson = "$ruta.json";

    $mpdf -> Output("$nombreArchivo", 'F');

    if ($preview == 0) {
        if ($del) {
            eliminar($temp, "$carpeta/temp");
        }
        salvarPlan($ruta, $claveAcademia, $fecha);
        salvarFecha($ruta, $fecha_1);
        salvarFecha($ruta, $fecha_2);
        salvarFecha($ruta, $fecha_3);
        salvarFecha($ruta, $fecha_4);
        $json = json_encode($datos);
        $bytes = file_put_contents($nombreJson, $json);
    }

    echo json_encode(array('ruta'=>"Acacemias/$ruta.pdf"));

?>