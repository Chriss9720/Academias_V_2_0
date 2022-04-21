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

    function crearCapera($ruta)
    {
        if (!file_exists($ruta)) {
            mkdir($ruta, 0777, true);
        }
    }

    function tacha($pos, $valor) {
        $r = "";
        if (intval($pos) == intval($valor)) {
            $r ="<img src='../img/tacha.png' class='tacha'>";
        }
        return $r;
    }

    function fechaFormat($date)
    {
        $fecha = explode('-', $date[0]);
        return "$fecha[2]/$fecha[1]/$fecha[0]";
    }

    function salvarEv($ruta, $sem, $aca, $nom)
    {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_SalvarEvaluacion(?,?,?,?)}";
        $params = array(
            array(&$ruta, SQLSRV_PARAM_IN),
            array(&$sem, SQLSRV_PARAM_IN),
            array(&$aca, SQLSRV_PARAM_IN),
            array(&$nom, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error), "met"=>"SP_SalvarEvaluacion")));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    $datos = json_decode(json_encode($_POST['Ev']), true);

    $info = $datos['infoDoc'];

    $fecha =$datos['elaborada'];
    $periodo = $info['periodo'];
    $profesor = $info['nombre'];
    $aca = $info["Academia"];
    $carrera = $info["Carrera"];
    $Ev1 = $datos['ev'][0];
    $Ev2 = $datos['ev'][1];
    $Ev3 = $datos['ev'][2];
    $Ev4 = $datos['ev'][3];
    $Ev5 = $datos['ev'][4];
    $calf = $datos['calif'];
    $obs = $datos['obs'];
    $pre = $_SESSION["ND"];
    $resp = $datos['resp'];
    $c = $datos['c'];

    $tachas = [];
    $t = 0;
    for ($i = 0; $i < 6; $i++) {
        for ($j = 0; $j < 5; $j++) {
            if ($i < 5)
                $tachas[$i][$j] =  tacha($j, $resp[$i]);
            else {
                if ($j < 3) {
                    $tachas[$i][$j] =  tacha($j, $resp[$i]);
                }
            }
        }
    }

    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [215.9, 279.4],
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false'
    ]);

    $mpdf->SetHTMLFooter('Pag. {PAGENO} de {nb}');

    $miCss = file_get_contents('../css/generacionEv.css');
    $mpdf->WriteHTML($miCss, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->SetHTMLHeader("
        <table class='borde_tabla'>
            <tbody>
                <tr>
                    <td class='area_IMG borde_derecho'>
                        <img src='../img/logo_ITESCA.png' alt='logo itesca' class='logo_ITESCA'>
                    </td>
                    <td class='area_titulo centrar'>
                        <label class='nombre_documento'><b>EVALUACIÓN AL DOCENTE POR EL PRESIDENTE DE ACADEMIA</b></label>
                        <br>
                        <label class='subtitulo'>F04PSA01.01</label>
                    </td>
                </tr>
            </tbody>
        </table>
    ");

    $mpdf->WriteHTML("
        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='col-1 enbacezado all-bordes centrar'>
                        FECHA:
                    </td>
                    <td class='area-f all-bordes centrar'>
                        $fecha
                    </td>
                    <td class='enbacezado all-bordes centrar'>
                        PERIODO EVALUADO:
                    </td>
                    <td class='area-p all-bordes centrar'>
                        $periodo
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='col-1 enbacezado all-bordes'>
                        NOMBRE DEL PROFESOR:
                    </td>
                    <td class='all-bordes'>
                        $profesor
                    </td>
                </tr>
                <tr>
                    <td class='col-1 enbacezado all-bordes'>
                        ACADEMIA DE ADSCRIPCIÓN:
                    </td>
                    <td class='all-bordes'>
                        $aca
                    </td>
                </tr>
                <tr>
                    <td class='col-1 enbacezado all-bordes'>
                        JEFATURA A LA QUE PERTENECE:
                    </td>
                    <td class='all-bordes'>
                        $carrera
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='w-100 enbacezado'>
            <tbody>
                <tr>
                    <td class='col-1 all-bordes'>
                        INDICADOR
                    </td>
                    <td class='col-r centrar all-bordes'>
                        RESPUESTA
                    </td>
                    <td class='all-bordes centrar'>
                        EVALUACIÓN
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='col-1 all-bordes'>
                        Asistencia en el periodo (%)
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[0][0]."
                        <div class='bold'>4</div>
                        4 reuniones atendidas
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[0][1]."
                        <div class='bold'>3</div>
                        3 reuniones atendidas
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[0][2]."
                        <div class='bold'>2</div>
                        2 reuniones atendidas
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[0][3]."
                        <div class='bold'>1</div>
                        1 reuniones atendidas
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[0][4]."
                        <div class='bold'>0</div>
                        <div>0 reuniones atendidas</div>
                    </td>
                    <td class='all-bordes'>
                        $Ev1
                    </td>
                </tr>

                <tr>
                    <td class='col-1 all-bordes'>
                        Cumplimiento de acuerdos de Academias
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[1][0]."
                        <div class='bold'>4</div>
                        100%
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[1][1]."
                        <div class='bold'>3</div>
                        Entre 80% y 100%
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[1][2]."
                        <div class='bold'>2</div>
                        Entre 60% y 40%
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[1][3]."
                        <div class='bold'>1</div>
                        Entre 40% y 20%
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[1][4]."
                        <div class='bold'>0</div>
                        Menos de 20%
                    </td>
                    <td class='all-bordes'>
                        $Ev2
                    </td>
                </tr>

                <tr>
                    <td class='col-1 all-bordes'>
                        Participación Proactiva
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[2][0]."
                        <div class='bold'>4</div>
                        Cuatro o más
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[2][1]."
                        <div class='bold'>3</div>
                        Tres veces
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[2][2]."
                        <div class='bold'>2</div>
                        Dos veces
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[2][3]."
                        <div class='bold'>1</div>
                        Una vez
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[2][4]."
                        <div class='bold'>0</div>
                        Ninguna
                    </td>
                    <td class='all-bordes'>
                        $Ev3
                    </td>
                </tr>

                <tr>
                    <td class='col-1 all-bordes'>
                        Entrega oportuna de información de reprobación y bajas.
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[3][0]."
                        <div class='bold'>4</div>
                        En tiempo
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[3][1]."
                        <div class='bold'>3</div>
                        4 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[3][2]."
                        <div class='bold'>2</div>
                        8 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[3][3]."
                        <div class='bold'>1</div>
                        12 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[3][4]."
                        <div class='bold'>0</div>
                        Más de 12 días de retraso
                    </td>
                    <td class='all-bordes'>
                        $Ev4
                    </td>
                </tr>

                <tr>
                    <td class='col-1 all-bordes'>
                        Entrega de instrumentaciones didácticas
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[4][0]."
                        <div class='bold'>4</div>
                        En tiempo
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[4][1]."
                        <div class='bold'>3</div>
                        De 1 a 4 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[4][2]."
                        <div class='bold'>2</div>
                        De 5 a 8 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[4][3]."
                        <div class='bold'>1</div>
                        De 9 a12 días de retraso
                    </td>
                    <td class='area-cal all-bordes centrar text-size'>
                        ".$tachas[4][4]."
                        <div class='bold'>0</div>
                        Mas de 12 días de retraso
                    </td>
                    <td class='all-bordes'>
                        $Ev5
                    </td>
                </tr>

            </tbody>
        </table>

        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='all-bordes area-calif enbacezado text-right'>
                        Calificación final de Indicadores:
                    </td>
                    <td class='all-bordes'>
                        $calf
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='col-1-2 all-bordes'>
                        Con base en el promedio obtenido, evalúe su recomendación de recontratarlo (aplica para los de asignatura)
                    </td>
                    <td class='col-1-3 all-bordes centrar'>
                        ".$tachas[5][0]."
                        <div class='bold'>15 a 20</div>
                        Sí
                    </td>
                    <td class='col-1-4 all-bordes centrar'>
                        ".$tachas[5][1]."
                        <div class='bold'>9 a 14</div>
                        Condicionado a mejorar el cumplimiento en academias
                    </td>
                    <td class='all-bordes centrar'>
                        ".$tachas[5][2]."
                        <div class='bold'>9 o menos</div>
                        No
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='w-100'>
            <tbody>
                <tr>
                    <td class='col-1-2 all-bordes'>
                        Observaciones y comentarios
                    </td>
                    <td class='all-bordes'>
                        $obs
                    </td>
                </tr>
            </tbody>
        </table>

        <table class='centrar'>
            <tbody>
                <tr>
                    <td class='centrar borde_izquierdo borde_superior borde_inferior borde_derecho firmas enbacezado-s'>
                        Evaluó
                    </td>
                    <td class='centrar borde_superior borde_derecho borde_inferior borde_izquierdo firmas enbacezado-s'>
                        Vo. Bo.
                    </td>
                </tr>
                <tr>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior borde_derecho firmas'>
                        $pre
                    </td>
                    <td class='firma bajar borde_superior borde_izquierdo borde_derecho borde_inferior firmas'>
                    </td>
                </tr>
                <tr>
                    </td>
                    <td class='centrar borde_superior borde_izquierdo borde_derecho borde_inferior firmas enbacezado-s'>
                        Presidente de Academia
                    </td>
                    <td class='centrar borde_superior borde_derecho borde_izquierdo borde_inferior firmas enbacezado-s'>
                        Jefe de Departamento de Desarrollo Académico
                    </td>
                </tr>
            </tbody>
        </table>

    ");

    $Clave = $info['clave_academia'];
    $nomina = $info['nomina'];
    $nombre = "$nomina - $periodo";
    $pw = $datos['pw'];
    if ($pw == 0) {
        $carpeta = "../Docs/EVDocente/$Clave";
    } else {
        $carpeta = "../Docs/EVDocente/$Clave/temp";
    }

    crearCapera("$carpeta");

    $ruta = "$carpeta/$nombre";
    $nombreArchivo = "$ruta.pdf";
    $nombreJson = "$ruta.json";

    $mpdf -> Output("$nombreArchivo", 'F');

    if (intval($c) == 1) {
        salvarEv($ruta, $periodo, $Clave, $nomina);
    }

    if ($pw == 0) {
        $json = json_encode($datos);
        $bytes = file_put_contents($nombreJson, $json);
    }

    echo json_encode(array('ruta'=>"Academias/$ruta.pdf"));

    ?>