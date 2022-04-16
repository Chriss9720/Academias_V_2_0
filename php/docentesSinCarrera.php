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

    $call = "{call dbo.SP_DocenteSinCarrera()}";

    $stmt = sqlsrv_query($con, $call);

    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(404);
            die(json_encode(array("status"=>404, "msg"=>$error)));
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
        $data = array("nomina"=>$nomina, "foto"=>$foto, "nombre"=>$nombre, "correo"=>$correo, "seleccionado"=>False, "jefe" => 0);
        array_push($res, $data);
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    echo json_encode($res);

?>