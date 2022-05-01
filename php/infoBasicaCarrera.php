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

    $call = "{call dbo.SP_InfoBasicaCarrera(?)}";
    $param = array(
        array(&$_POST['nomina'], SQLSRV_PARAM_IN)
    );

    $stmt = sqlsrv_query($con, $call, $param);

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
        $clave_carrera = utf8_encode($row["clave_carrera"]);
        $foto_portada = utf8_encode($row["foto_portada"]);
        if (!file_exists("../$foto_portada")){
            $foto_portada = "img/portada.png";
        }
        $carrera = utf8_encode($row["Carrera"]);
        $nomina = utf8_encode($row["nomina"]);
        $FD = utf8_encode($row["FD"]);
        if (!file_exists("../$FD")){
            $FD = "img/IconLog.png";
        }
        $ND = utf8_encode($row["ND"]);
        $data = array("clave_carrera"=>$clave_carrera, "foto_portada"=>$foto_portada, "carrera"=>$carrera, "nomina"=>$nomina, "FD"=>$FD, "ND"=>$ND);
        array_push($res, $data);
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    echo json_encode($res);

?>