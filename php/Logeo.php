<?php

    require('./contectar.php');
    require('./validarSession.php');

    try {

        $conectar = new Conectar();
        $con = $conectar->conn();
        if ($con) {
            $json = json_decode(json_encode($_POST), true);
            $call = "{ call dbo.SP_Login(?, ?) }";
            $params = array(
                array(&$json["nomina"], SQLSRV_PARAM_IN),
                array(&$json["clave"], SQLSRV_PARAM_IN)
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
            sqlsrv_next_result($stmt);
            sqlsrv_close($con);

            $session = new Session();
            $session->entrar($json["nomina"]);

            http_response_code(200);
            echo json_encode(
                array(
                    "cambio"=>"/Academias/panel.html"
                )
            );
        } else {
            http_response_code(400);
            die(json_encode(array("status"=>400, "msg"=>"Fallo al conectarse")));
        }
    }catch (Exception $e) {
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>