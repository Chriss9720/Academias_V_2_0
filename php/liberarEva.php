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
            $call = "{ call dbo.SP_LiberarEva(?) }";
            $params = array(
                array(&$_POST["puesto"], SQLSRV_PARAM_IN)
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
                $datos = array(
                    "clave_academia" => utf8_encode($row["clave_academia"]),
                    "nomina"=>utf8_encode($row["nomina"]),
                    "puesto" => utf8_encode($row["puesto"]),
                    "id_evaluacion" => utf8_encode($row["id_evaluacion"]),
                    "activo" => utf8_encode($row["activo"]),
                    "Academia" => utf8_encode($row["Academia"]),
                    "localizacion" => utf8_encode($row["localizacion"]),
                    "localizacionJson" => utf8_encode($row["localizacionJson"]),
                    "periodo" => utf8_encode($row["periodo"]),
                    "subido" => utf8_encode($row["subido"]),
                    "nombre" => utf8_encode($row["nombre"]),
                    "Carrera" => utf8_encode($row["Carrera"])
                );
                array_push($res, $datos);
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