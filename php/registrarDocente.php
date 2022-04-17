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

    $datos = json_decode(json_encode($_POST['data']), true);
    $nomina = utf8_decode($datos["nominaR"]);
    $nombre = utf8_decode($datos["nombre"]);
    $telefone = utf8_decode($datos["telefono"]);
    $correo = utf8_decode($datos["correo"]);
    $clave = utf8_decode($datos["claveR"]);
    $foto = utf8_decode($datos["foto"]);

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_RegistrarDocente(?,?,?,?,?,?)}";
    $params = array(
        array(&$nomina, SQLSRV_PARAM_IN),
        array(&$nombre, SQLSRV_PARAM_IN),
        array(&$telefone, SQLSRV_PARAM_IN),
        array(&$correo, SQLSRV_PARAM_IN),
        array(&$clave, SQLSRV_PARAM_IN),
        array(&$foto, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($con, $call, $params);
    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = print_r($errors[0]['message'], true);
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(402);
            die(json_encode(array("status"=>402, "msg"=>$error)));
        }
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    echo json_encode(array("status"=>"200", "msg"=>"Registro exitoso"));

?>