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

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_GetAllDocentes(?,?)}";
    $params = array(
        array(&$_SESSION['nivel'], SQLSRV_PARAM_IN),
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
        $nomina = utf8_encode($row["nomina"]);
        $foto = utf8_encode($row["foto"]);
        if (!file_exists("../$foto")){
            $foto = "img/IconLog.png";
        }
        $nombre = utf8_encode($row["nombre"]);
        $correo = utf8_encode($row["correo"]);
        $telefono = utf8_encode($row["telefono"]);
        $data = array("nomina"=>$nomina, "foto"=>$foto, "nombre"=>$nombre, "correo"=>$correo, "telefono"=>$telefono);
        array_push($res, $data);
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    echo json_encode($res);

?>