<?php
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

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_ActualizarCoordinador(?)}";
    $params = array(
        array(&$_POST["nomina"], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($con, $call, $params);
    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = print_r($errors[0]['message'], true);
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(404);
            echo $error;
            die(json_encode(array("status"=>404, "msg"=>$error)));
        }
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);
    http_response_code(200);

?>