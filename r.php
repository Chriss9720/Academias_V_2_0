<?php
    require('php/contectar.php');

    try {

        $conectar = new Conectar();
        $con = $conectar->conn();
        if ($con) {
            $id = -10;
            $call = "{ call dbo.SP_SALIDA(?) }";
            $params = array(
                array(&$id, SQLSRV_PARAM_OUT),
            );
            $stmt = sqlsrv_query($con, $call, $params);
            if ($stmt === false) {
                if (($errors = sqlsrv_errors()) != null) {
                    $error = print_r($errors[0]['message'], true);
                    $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                    http_response_code(404);
                    die(json_encode(array("status"=>404, "msg"=>$error)));
                }
            }
            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);

            echo $id;
        } else {
            http_response_code(400);
            die(json_encode(array("status"=>400, "msg"=>"Fallo al conectarse")));
        }
    }catch (Exception $e) {
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>