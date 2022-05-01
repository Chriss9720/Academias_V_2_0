<?php

    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    function altaCarrera($clave, $con, $nomina) {
        $call = "{call dbo.SP_AltaCarrera(?,?)}";
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
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function bajaCarrera($clave, $con, $nomina) {
        $call = "{call dbo.SP_BajaCarrera(?,?)}";
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
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function nuevoJefe($clave, $con, $nomina) {
        $call = "{call dbo.SP_NuevoJefe(?,?)}";
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
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function afiliacion($clave, $con, $nomina, $jefe) {
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
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function actualizarFoto($clave, $con, $foto) {
        $call = "{call dbo.SP_ActualizarFoto(?,?)}";
        $params = array(
            array(&$clave, SQLSRV_PARAM_IN),
            array(&$foto, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(400);
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    function salvarNombre($name, $con, $clave)
    {
        $call = "{call dbo.SP_ActualizarNombreCarrera(?,?)}";
        $params = array(
            array(&$clave, SQLSRV_PARAM_IN),
            array(&$name, SQLSRV_PARAM_IN),
        );
        $stmt = sqlsrv_query($con, $call, $params);
        if ($stmt === false) {
            if (($errors = sqlsrv_errors()) != null) {
                $error = print_r($errors[0]['message'], true);
                $error = str_replace("[Microsoft][ODBC Driver 17 for SQL Server][SQL Server]", "", $error);
                http_response_code(400);
                die(json_encode(array("status"=>402, "msg"=>utf8_encode($error))));
            }
        }
        sqlsrv_free_stmt($stmt);
        sqlsrv_close($con);
    }

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    $miembros = array();
    $nuevos = array();
    $clave = utf8_encode($_POST["clave"]);
    $foto = utf8_encode($_POST["foto"]);
    $nombre = utf8_encode($_POST["nombre"]);
    if (array_key_exists('miembros', json_decode(json_encode($_POST)))) {
        $miembros = $_POST['miembros'];
    }
    if (array_key_exists('nuevos', json_decode(json_encode($_POST)))) {
        $nuevos = $_POST['nuevos'];
    }

    try {
        $conectar = new Conectar();
        $con = $conectar->conn();
        actualizarFoto($clave, $con, $foto);

        $con = $conectar->conn();
        salvarNombre($nombre, $con, $clave);

        for ($i = 0; $i < count($nuevos); $i++) {
            $con = $conectar->conn();
            afiliacion($clave, $con, $nuevos[$i]["nomina"], $nuevos[$i]["jefe"]);
        }

        for ($i = 0; $i < count($miembros); $i++) {
            $nomina = $miembros[$i]["nomina"];
            if ($miembros[$i]["activo"] == 1) {
                if ($miembros[$i]["jefe"] == 1) {
                    $con = $conectar->conn();
                    nuevoJefe($clave, $con, $nomina);
                } else {
                    $con = $conectar->conn();
                    altaCarrera($clave, $con, $nomina);
                }
            } else {
                $con = $conectar->conn();
                bajaCarrera($clave, $con, $nomina);
            }
        }

        echo json_encode(array("msg"=>"Actualizacion exitosa"));
    }catch (Exception $e) {
        http_response_code(400);
        die(json_encode(array("status"=>400, "msg"=>$e)));
    }

?>