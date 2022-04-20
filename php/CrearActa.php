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

    function acuerdosAnt($data) {
        $r = "
            <div class='justificar m'>
                Aprobado el Orden del Día, se procede a la revisión de acuerdos de la minuta anterior bajo el siguiente:
            </div>

            <div class='centrar'>
                <b>SEGUIMIENTO DE ACUERDOS ANTERIORES:</b>
            </div>

            <table class='centrar m'>
                <tbody>
                    <tr class='enbacezado'>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo acuerdoAnt'>ACUERDO</td>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo respAnt'>RESPONSABLES</td>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo fechaAnt'>FECHA DE CUMPLIMIENTO</td>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo avance'>AVANCE</td>
                    </tr>";
        for ($i = 0; $i < count($data); $i++) {
            $ac = "";
            $fe = "";
            $res = "";
            $Av = 0;
            if (array_key_exists('acuerdo', $data[$i])) {
                $ac = $data[$i]['acuerdo'];
            }
            if (array_key_exists('fecha', $data[$i])) {
                $fe = str_replace('T', '', $data[$i]['fecha']);
            }
            if (array_key_exists('responsables', $data[$i])) {
                for ($j = 0; $j < count($data[$i]['responsables']); $j++) {
                    $n = $data[$i]['responsables'][$j]['nombre'];
                    $res = "$res <li>$n</li>";
                }
            }
            if (array_key_exists('Av', $data[$i])) {
                $Av = $data[$i]['Av'];
            }
            if (strlen($ac) > 0 || strlen($fe)> 0 || strlen($res) > 0) {
                $r = "$r
                    <tr>
                        <td class='justificar borde_inferior borde_superior borde_derecho borde_izquierdo acuerdoAnt'>$ac</td>
                        <td class='justificar borde_inferior borde_superior borde_derecho borde_izquierdo respAnt'><ul>$res</ul></td>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo fechaAnt'>$fe</td>
                        <td class='centrar borde_inferior borde_superior borde_derecho borde_izquierdo avance'>$Av%</td>
                    </tr>
                ";
            }
        }
        return "
            $r
                </tbody>
            </table>";
    }

    function firmas($doc) {
        $r = "
            <table class='centrar m'>
                <tbody>
                    <tr class='enbacezado'>
                        <td class='borde_derecho borde_izquierdo acuerdo borde_inferior borde_superior'>PROFESOR</td>
                        <td class='borde_derecho borde_izquierdo resp borde_inferior borde_superior'>MATERIA QUE IMPARTE</td>
                        <td class='fecha borde_derecho borde_izquierdo borde_inferior borde_superior'>FIRMA</td>
                    </tr>
        ";
        for ($i = 0; $i < count($doc); $i++) {
            $nombre = $doc[$i]['nombre'];
            if ($doc[$i]['estado'] != -1) {
                $mat = "<ul>";
                for ($j = 0; $j < count($doc[$i]['materias']); $j++) {
                    $m = $doc[$i]['materias'][$j]['materia'];
                    $mat = "$mat
                        <li>$m</li>
                    ";
                }
                $mat = "$mat</ul>";
                $info = "<tr>
                    <td class='borde_izquierdo borde_derecho acuerdo borde_superior borde_inferior'>$nombre</td>
                    <td class='borde_derecho borde_izquierdo resp borde_inferior borde_superior justificar'>$mat</td>
                    <td class='fecha borde_derecho borde_izquierdo borde_inferior borde_superior'></td>
                ";
                $info = "$info </tr>";
                $r = "$r $info";
            }
        }
        $r = "
            $r
                </tbody>
            </table>
        ";
        return $r;
    }

    function acuerdo($Acuerdos) {
        $r = "
        <div class='centrar'>
            <b>ACUERDOS DE REUNIÓN:</b>
        </div>
            <table class='centrar m'>
                <tbody>
                    <tr class='enbacezado'>
                        <td class='borde_derecho borde_izquierdo acuerdo borde_inferior borde_superior'>ACUERDO</td>
                        <td class='borde_derecho borde_izquierdo resp borde_inferior borde_superior'>RESPONSABLES</td>
                        <td class='borde_inferior borde_superior borde_derecho borde_izquierdo fecha'>FECHA DE CUMPLIMIENTO</td>
                    </tr>
        ";
        for($i = 0; $i < count($Acuerdos); $i++) {
            $acuerdo = "";
            $resp = "<ul>";
            $fecha = "";
            $v1 = False;
            $v2 = False;
            $lim = $Acuerdos[$i]['limite'];
            if (array_key_exists('acuerdo', $Acuerdos[$i])) {
                $acuerdo = $Acuerdos[$i]['acuerdo'];
                $v1 = True;
            }
            if (array_key_exists('responsables', $Acuerdos[$i])) {
                for($j = 0; $j < count($Acuerdos[$i]['responsables']); $j++) {
                    $nom = &$Acuerdos[$i]['responsables'][$j]['nombre'];
                    $resp = "$resp
                        <li>$nom</li>
                    ";
                }
                $v2 = True;
            }
            if ($lim == 1){
                $fecha = str_replace('T', ' ', $Acuerdos[$i]['fecha']);
            }
            $resp = "$resp</ul>";
            if ($v1 || $v2) {
                $r = "$r
                    <tr>
                        <td class='justificar borde_inferior borde_superior borde_derecho borde_izquierdo acuerdo'>$acuerdo</td>
                        <td class='justificar borde_inferior borde_superior borde_derecho borde_izquierdo resp'>$resp</td>
                        <td class='borde_inferior borde_superior borde_derecho borde_izquierdo fecha'>$fecha</td>
                    </tr>
                ";
            }
        }
        $r = "
                $r
            </tbody>
        </table>";
        return $r;
    }

    function crearCapera($ruta)
    {
        if (!file_exists($ruta)) {
            mkdir($ruta, 0777, true);
        }
    }

    function actualizarFecha($id, $hoy) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_HistorialActa(?,?)}";
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

    function getIDActa() {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $id = intval(-2);
        $call = "{call dbo.SP_GetIDActa(?)}";
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

    function fechaFormat($date)
    {
        $split = explode(' ', $date);
        $fecha = explode('-', $split[0]);
        $hora = $split[1];
        return "$fecha[2]/$fecha[1]/$fecha[0] $hora";
    }

    function salvarActa($ruta, $academia, $hoy, $sem)
    {
        $id = getIDActa();
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_RegistrarActa(?,?,?,?,?)}";
        $params = array(
            array(&$academia, SQLSRV_PARAM_IN),
            array(&$ruta, SQLSRV_PARAM_IN),
            array(&$id, SQLSRV_PARAM_IN),
            array(&$hoy, SQLSRV_PARAM_IN),
            array(&$sem, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error), "met"=>"REGISTRAR")));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
        actualizarFecha($id, $hoy);
        return $id;
    }

    function ligar($id, $Acuerdos, $sum) {
        for($i = 0; $i < count($Acuerdos); $i++) {
            if (array_key_exists('tareas', $Acuerdos[$i])) {
                for($j = 0; $j < count($Acuerdos[$i]['tareas']); $j++) {
                    $fecha = "";
                    $lim = $Acuerdos[$i]['limite'];
                    if ($lim == 1){
                        $fecha = str_replace('T', ' ', $Acuerdos[$i]['fecha']);
                    }
                    for($k = 0; $k < count($Acuerdos[$i]['responsables']); $k++) {
                        $no = $i + $sum;
                        salvarLigado($id, $Acuerdos[$i]['responsables'][$k]['nomina'], $j, $fecha, $no);
                    }
                }
            }
        }
    }

    function salvarLigado($id, $nomina, $punto, $fecha, $no) {
        $punto = $punto + 1;
        if (strlen($fecha) > 0) {
            $l = 1;
            $fecha = fechaFormat($fecha);
        } else {
            $l = 0;
        }
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_EvidenciaActa(?,?,?,?,?,?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN),
            array(&$nomina, SQLSRV_PARAM_IN),
            array(&$punto, SQLSRV_PARAM_IN),
            array(&$fecha, SQLSRV_PARAM_IN),
            array(&$l, SQLSRV_PARAM_IN),
            array(&$no, SQLSRV_PARAM_IN)
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

    $datos = json_decode(json_encode($_POST['acta']), true);
    $datosAcademia = $datos['DatosA'];
    $Clave = $datosAcademia['Clave'];
    $datosG = $datos['datosG'];
    $No = $datos['No'];
    $horaI = utf8_encode($datosG['horaI']);
    $Dia = utf8_encode($datosG['Dia']);
    $Mes = utf8_encode($datosG['Mes']);
    $Año = utf8_encode($datosG['Año']);
    $Lugar = utf8_encode($datosG['Lugar']);
    $horaF = utf8_encode($datosG['horaF']);
    $Orden = utf8_encode($datosG['Orden']);
    $Obs = utf8_encode($datosG['Obs']);
    $fecha = utf8_encode($datos['fecha']);
    $Sem = utf8_encode($datos['Sem']);

    $firmas = firmas($datos['Docentes']);
    $vp = $datos['vP'];

    $ant = [];
    $an = "";
    if (array_key_exists('ant', $datos)) {
        $ant = $datos['ant'];
        $an = acuerdosAnt($ant);
    }

    $Acuerdos = "";
    if (array_key_exists('Acuerdos', $datos)) {
        $Acuerdos = acuerdo($datos['Acuerdos']);
        if ($vp != 1) {
            for($i = 0; $i < count($datos['Acuerdos']); $i++) {
                array_push($ant, $datos['Acuerdos'][$i]);
            }
        }
    }
    if ($vp != 1) {
        $datos['ant'] = $ant;
    }

    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [215.9, 279.4],
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false'
    ]);

    $mpdf->SetHTMLFooter('Pag. {PAGENO} de {nb}');

    $miCss = file_get_contents('../css/generacionActa.css');
    $mpdf->WriteHTML($miCss, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->SetHTMLHeader("
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='area_IMG borde_derecho'>
                        <img src='../img/logo_ITESCA.png' alt='logo itesca' class='logo_ITESCA'>
                    </td>
                    <td class='area_titulo centrar'>
                        <label class='nombre_documento'><b>ACTA DE JUNTA DE ACADEMIA</b></label>
                        <br>
                        <label class='subtitulo'>F01PSA01.02</label>
                    </td>
                </tr>
            </tbody>
        </table>
    ");

    $mpdf->WriteHTML("
        <div class='align-right'>
            <label><b>Acta No. <u>$No</u></b></label>
        </div>

        <div class='justificar m'>
            En Ciudad Obregón, Sonora, siendo las $horaI horas del día $Dia de $Mes del año $Año reunidos en $Lugar del Tecnológico Superior de Cajeme, los maestros miembros de la 
            academia de ${datosAcademia['Academia']}, cuya lista se anexa a la presente acta; se inicia
            la reunión, bajo la presidencia de ${datosAcademia['Presidente']},
            auxiliado en la secretaria por ${datosAcademia['Sec']} de acuerdo con el siguiente:
        </div>

        <div class='centrar'>
            <b>ORDEN DEL DÍA:</b>
        </div>

        <div class='bordes justificar m'>
            $Orden
        </div>

        $an

        <br>

        $Acuerdos

        <div class='row justificar '>
            <p class='text-padding-1-5'>
                El presidente pone a la consideración de los presentes el acta, quienes la aprueban en todas sus partes firman de conformidad al final de la misma.
                <br><br> Sin otro asunto que tratar, el presidente da por terminada la reunión, siendo las $horaF horas del mismo día.
            </p>
        </div>

        <table class='centrar'>
            <tbody>
                <tr>
                    <td class='separacion'>
                    </td>
                    <td class='centrar fuente borde_izquierdo borde_superior borde_inferior borde_derecho firmas enbacezado'>
                        PRESIDENTE
                    </td>
                    <td class='separacion'>
                    </td>
                    <td class='centrar borde_superior borde_derecho borde_inferior borde_izquierdo fuente firmas enbacezado'>
                        SECRETARIO
                    </td>
                </tr>
                <tr>
                    <td class='separacion'>
                    </td>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior borde_derecho fuente firmas'>
                        ${datosAcademia['Presidente']}
                    </td>
                    <td class='separacion'>
                    </td>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior firmas'>
                        ${datosAcademia['Sec']}
                    </td>
                </tr>
                <tr>
                    <td class='separacion'>
                    </td>
                    <td class='centrar borde_superior fuente borde_izquierdo borde_derecho borde_inferior firmas enbacezado'>
                        Firma
                    </td>
                    <td class='separacion'>
                    </td>
                    <td class='centrar borde_superior borde_derecho borde_izquierdo fuente borde_inferior firmas enbacezado'>
                        Firma
                    </td>
                </tr>
            </tbody>
        </table>

        <div class='centrar m'>
            <b>CONSTANCIA DE APROBACIÓN:</b>
        </div>

        <div class='justificar'>
            Nombre y firma de los miembros de la academia que asistieron a la reunión y manifiestan su aprobación para la presente acta.
        </div>

        $firmas

        <div class='m'>
            <div class='enbacezado bordes centrar'>
                Revisión y Aprobación del Jefe de División
            </div>
            <div class='borde justificar obs bordes p-1'>
                <b>Observaciones: </b> $Obs
                <table style='width: 100%;' class='mF'>
                    <tbody>
                        <tr>
                            <td style='width: 70%'></td>
                            <td class='borde_superior centrar'>
                                Jefe de División
                                <br>Nombre y Firma
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    ");

    $nombre = utf8_encode($datos['fechaG']);
    if ($vp != 1) {
        $carpeta = "../Docs/Actas/$Clave";
    } else {
        $carpeta = "../Docs/Actas/$Clave/temp";
    }

    crearCapera("$carpeta");

    $ruta = "$carpeta/$nombre";
    $nombreArchivo = "$ruta.pdf";
    $nombreJson = "$ruta.json";

    $mpdf -> Output("$nombreArchivo", 'F');

    if ($vp != 1) {
        if ($datos['nueva'] == 0) {
            $id = $datos['id'];
        }else {
            $id = salvarActa($ruta, $Clave, $fecha, $Sem);
        }
    }

    if (array_key_exists('Acuerdos', $datos) && $vp != 1) {
        $sum = count($ant);
        ligar($id, $datos['Acuerdos'], $sum);
    }
    if ($vp != 1) {
        $datos['id'] = $id;
        $json = json_encode($datos);
        $bytes = file_put_contents($nombreJson, $json);
    }

    echo json_encode(array('ruta'=>"Acacemias/$ruta.pdf"));

?>