<?php
    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    $datos = json_decode(json_encode($_POST['academia']), true);
    $docentes = [];
    if (array_key_exists('docentes', $datos)) {
        $docentes = $datos['docentes'];
    }
    $nombre = $datos['nombre'];
    $clave = $datos['claveA'];
    $foto = $datos['foto'];

    function salvar($pre, $sec, $nomina, $con, $clave)
    {
        $sp = "SP_RegistrarDocenteAcademia";
        if($pre == 1) {
            $sp = "SP_ActualizarPre";
        } else if($sec == 1) {
            $sp = "SP_ActualizarSec";
        }
        $call = "{call dbo.$sp(?,?)}";
        $params = array(
            array(&$clave, SQLSRV_PARAM_IN),
            array(&$nomina, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(400);
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    if (!$session->activo()) {
        http_response_code(404);
        die("Solicitar Reinicio de sesion");
    }

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_CrearAcademia(?,?,?)}";
    $params = array(
        array(&$clave, SQLSRV_PARAM_IN),
        array(&$foto, SQLSRV_PARAM_IN),
        array(&$nombre, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($con, $call, $params);
    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = print_r($errors[0]['message'], true);
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(400);
            die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
        }
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    for($i = 0; $i < count($docentes); $i++) {
        $con = $conectar->conn();
        if ($docentes[$i]['Pre'] == 'true') {
            salvar(true, false, $docentes[$i]['nomina'], $con, $clave);
        } else if ($docentes[$i]['Sec'] == 'true') {
            salvar(false, true, $docentes[$i]['nomina'], $con, $clave);
        }else{
            salvar(false, false, $docentes[$i]['nomina'], $con, $clave);
        }
    }

    http_response_code(200);
    echo json_encode(array("status"=>"200", "msg"=>"Registro exitoso"));

?>