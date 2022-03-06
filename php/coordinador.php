<?php
    require('./contectar.php');

    $conectar = new Conectar();
    $con = $conectar->conn();

    $call = "{call dbo.SP_GetCoordinador()}";

    $stmt = sqlsrv_query($con, $call);

    if ($stmt === false) {
        if (($errors = sqlsrv_errors()) != null) {
            $error = print_r($errors[0]['message'], true);
            $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
            http_response_code(404);
            die(json_encode(array("status"=>404, "msg"=>$error)));
        }
    }

    $res;

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        $res = $row;
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($con);

    echo json_encode($res);

?>