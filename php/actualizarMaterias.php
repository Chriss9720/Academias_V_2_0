<?php

    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    function delMat() {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_BorrarMaterias(?)}";
        $params = array(
            array(&$_POST['nomina'], SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(402);
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function salMat($mat) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_ActualizarMaterias(?, ?)}";
        $params = array(
            array(&$_POST['nomina'], SQLSRV_PARAM_IN),
            array(&$mat, SQLSRV_PARAM_IN)
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

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    delMat();

    $datos = json_decode(json_encode($_POST['mat']), true);

    for($i = 0; $i < count($datos); $i++) {
        salMat($datos[$i]['m']);
    }

?>