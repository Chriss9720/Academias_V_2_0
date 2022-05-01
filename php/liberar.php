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

    $Sp = "";
    switch ($_POST['case']) {
        case "Actas":
            $Sp = "SP_LiberarActas";
            break;
        case "Planes":
            $Sp = "SP_LiberarPlanes";
            break;
        case "EVDocente":
        case "EVPresidente":
        case "EVSecretario":
            $Sp = "SP_LiberarEvDocs";
            break;
        default:
            print_r($_POST['case']);
    }

    try {
        $conectar = new Conectar();
        $con = $conectar->conn();
        if ($con) {
            $call = "{ call dbo.$Sp(?) }";
            $params = array(
                array(&$_POST['id'], SQLSRV_PARAM_IN)
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

            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);

            die(json_encode(array("status"=>200, "msg"=>"Exito")));
        } else {
            http_response_code(400);
            die(json_encode(array("status"=>400, "msg"=>"Fallo al conectarse")));
        }
    }catch (Exception $e) {
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>