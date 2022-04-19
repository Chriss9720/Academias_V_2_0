<?php
    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    $datos = json_decode(json_encode($_POST['academia']), true);
    $docentes = [];
    if (array_key_exists('docentes', $datos)) {
        $docentes = $datos['docentes'];
    }
    $clave = $datos['claveA'];

    function salvar($pre, $sec, $nomina, $con, $clave, $act)
    {
        $call = "{call dbo.SP_ActualizarAcademia(?,?,?,?,?)}";
        $params = array(
            array(&$clave, SQLSRV_PARAM_IN),
            array(&$nomina, SQLSRV_PARAM_IN),
            array(&$pre, SQLSRV_PARAM_IN),
            array(&$sec, SQLSRV_PARAM_IN),
            array(&$act, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(400);
                die(json_encode(array("status"=>402, "msg"=>$error)));
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

    for($i = 0; $i < count($docentes); $i++) {
        if (array_key_exists('act', $docentes[$i])) {
            $con = $conectar->conn();
            salvar($docentes[$i]['pre'], $docentes[$i]['sec'], $docentes[$i]['nomina'], $con, $clave, $docentes[$i]['act']);
        }
    }

    http_response_code(200);
    echo json_encode(array("status"=>"200", "msg"=>"Actualizacion exitosa"));

?>