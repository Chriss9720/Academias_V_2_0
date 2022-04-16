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
        $call = "{ call dbo.SP_DocentesEnCarrera(?) }";
        $params = array(
            array(&$_POST["clave"], SQLSRV_PARAM_IN),
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(404);
                die(json_encode(array("status"=>404, "msg"=>$error)));
            }
        }

        $res = [];

        while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
            $foto = utf8_encode($row["foto"]);
            if (!file_exists("../$foto")){
                $foto = "img/IconLog.png";
            }
            $data = array(
                "nomina"=>utf8_encode($row["nomina"]),
                "jefe"=>utf8_encode($row["jefe"]),
                "activo"=>utf8_encode($row["Activo"]),
                "foto"=>$foto,
                "nombre"=>utf8_encode($row["nombre"])
            );
            array_push($res, $data);
        }

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);

        echo json_encode($res);
    }catch (Exception $e) {
        http_response_code(400);
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>