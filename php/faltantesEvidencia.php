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

    try {
        $conectar = new Conectar();
        $con = $conectar->conn();
        if ($con) {
            $call = "{ call dbo.SP_EvidenciaPendiente(?) }";
            $params = array(
                array(&$_SESSION['nomina'], SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($con, $call, $params);
            if ($stmt === false) {
                if (($errors = sqlsrv_errors()) != null) {
                    $error = print_r($errors[0]['message'], true);
                    $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                    http_response_code(404);
                    die(json_encode(array("status"=>404, "msg"=>utf8_encode($error))));
                }
            }

            $res = [];

            while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
                $row['Academia'] = utf8_encode($row['Academia']);
                $row['localizacionJson'] = utf8_encode($row['localizacionJson']);
                $row['L2']  = utf8_encode($row['L2']);
                array_push($res, $row);
            }

            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);

            echo json_encode($res);
        } else {
            http_response_code(400);
            die(json_encode(array("status"=>400, "msg"=>"Fallo al conectarse")));
        }
    }catch (Exception $e) {
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>