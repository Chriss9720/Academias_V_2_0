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


    $ruta = $_POST['ruta'];

    $data = file_get_contents($ruta);

    $json = json_decode($data, true);

    $acta = $json;

    function getAvance($id, $tarea) {
        $conectar = new Conectar();
        $con = $conectar->conn();
        $call = "{call dbo.SP_GetAvance(?,?)}";
        $params = array(
            array(&$id, SQLSRV_PARAM_IN),
            array(&$tarea, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server]", "", $error);
                http_response_code(401);
                die(json_encode(array("status"=>404, "msg"=>utf8_decode($error))));
            }
        }
        $res = [];
        while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
            array_push($res, $row);
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
        $av = 0;
        if (count($res) > 0 && $res[0]['T'] > 0) {
            $av = $res[0]['S'] / $res[0]['T'];
        }
        if ($res[0]['T'] == "0") {
            $av = 1;
        }
        return $av * 100;
    }

    if (array_key_exists('ant', $acta)) {
        $id = $acta['id'];
        $act = $acta['ant'];
        for ($i = 0; $i < count($act); $i++) {
            if (array_key_exists('responsables', $act[$i]) && array_key_exists('tareas', $act[$i])) {
                $tareas = $act[$i]['tareas'];
                for($j = 0; $j < count($tareas); $j++) {
                    $acta['ant'][$i]['Av'] = getAvance($id, $i);
                }
            }
        }
    }

    echo json_encode($acta);

?>