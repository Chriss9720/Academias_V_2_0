<?php
    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    function salvar($jefe, $nomina, $con, $clave)
    {
        $call = "{call dbo.SP_Afiliar(?,?,$jefe)}";
        $params = array(
            array(&$clave, SQLSRV_PARAM_IN),
            array(&$nomina, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(400);
                die(json_encode(array("status"=>402, "msg"=>$error)));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    if (!$session->activo()) {
        http_response_code(404);
        die("Solicitar Reinicio de sesion");
    }

    $datos = json_decode(json_encode($_POST['data']), true);
    $nombre = utf8_decode($datos["nombreC"]);
    $clave = utf8_decode($datos["claveC"]);
    $foto = utf8_decode($datos["foto"]);

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_CrearCarrera(?,?,?)}";
    $params = array(
        array(&$clave, SQLSRV_PARAM_IN),
        array(&$foto, SQLSRV_PARAM_IN),
        array(&$nombre, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($con, $call, $params);
    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = print_r($errors[0]['message'], true);
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(400);
            die(json_encode(array("status"=>402, "msg"=>$error)));
        }
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    if (array_key_exists('jefe', $datos)) {
        $jefe = $datos["jefe"][0];
        $con = $conectar->conn();
        salvar(1, $jefe["nomina"], $con, $clave);
    }
    if (array_key_exists('miembros', $datos)) {
        $miembros = $datos["miembros"];
        for($i = 0; $i < count($miembros); $i++) {
            $con = $conectar->conn();
            salvar(0, $miembros[$i]["nomina"], $con, $clave);
        }
    }

    http_response_code(200);
    echo json_encode(array("status"=>"200", "msg"=>"Registro exitosa"));
