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
            $call = "{ call dbo.SP_GetCarreras(?,?) }";
            $params = array(
                array(&$_SESSION["nivel"], SQLSRV_PARAM_IN),
                array(&$_SESSION["nomina"], SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($con, $call, $params);
            if ($stmt === false) {
                if (($errors = sqlsrv_errors()) != null) {
                    print_r($errors);
                    $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                    http_response_code(404);
                    die(json_encode(array("status"=>404, "msg"=>$error)));
                }
            }

            $res = [];

            while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
                $foto = utf8_encode($row["foto_portada"]);
                if (!file_exists("../$foto")){
                    $foto = "img/portada.png";
                }
                $data = array(
                    "clave_carrera"=>utf8_encode($row["clave_carrera"]),
                    "foto_portada"=>utf8_encode($foto),
                    "nombre"=>utf8_encode($row["nombre"]),
                    "activo"=>$row["Activo"]
                );
                array_push($res, $data);
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