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

        $call = "{call dbo.SP_EditarDocente(?,?)}";

        $params = array(
            array(&$_SESSION["nivel"], SQLSRV_PARAM_IN),
            array(&$_SESSION["nomina"], SQLSRV_PARAM_IN)
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

        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $nombre = utf8_encode($row['nombre']);
            $foto = utf8_encode($row["foto"]);
            if (!file_exists("../$foto")){
                $foto = "img/IconLog.png";
            }
            $correo = utf8_encode($row["correo"]);
            $telefono = utf8_encode($row["telefono"]);
            $clave = utf8_encode($row["clave"]);
            $baja = utf8_encode($row["baja"]);
            $data = array("nomina"=>$row["nomina"], "nombre"=>$nombre, "foto"=>$foto, "correo"=>$correo, "telefono"=>$telefono, "clave"=>$clave, "baja"=>$baja);
            array_push($res, $data);
        }

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);

        echo json_encode($res);
    } catch (Exception $e) {
        die(json_encode(array("status"=>400, "msg"=>"Datos incorrectos")));
    }

?>