<?php

    class Session {

        function __construct() {
            session_start();
        }

        public function entrar($nomina) {
            $_SESSION["autentificado"] = true;
            $_SESSION["nomina"] = $nomina;
            $_SESSION["ultimoAcceso"] = date("Y-n-j H:i:s");

            $conectar = new Conectar();
            $con = $conectar->conn();

            $call = "{call dbo.SP_MisDatos(?)}";
            $params = array(
                array(&$nomina, SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($con, $call, $params);
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

            $_SESSION['foto'] = $res['foto'];
            $_SESSION['nombre'] = $res['nombre'];
            $_SESSION['correo'] = $res['correo'];
            $_SESSION['telefono'] = $res['telefono'];
            $_SESSION['nivel'] = $res['nivel'];

            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);

        }

        public function sesion() {
            if (count($_SESSION) > 0)
                return $_SESSION["autentificado"];
            else
                return false;
        }

        public function activo() {
            $fechaGuardada = $_SESSION["ultimoAcceso"];
            $ahora = date("Y-n-j H:i:s");
            $tiempo_transcurrido = (strtotime($ahora)-strtotime($fechaGuardada));
            if ($tiempo_transcurrido >= 600) {
                return false;
            } else {
                $_SESSION["ultimoAcceso"] = $ahora;
                return false;
            }
        }

        public function cerrar() {
            session_destroy();
        }

        public function misDatos() {
            return array(
                    "foto"=>utf8_encode($_SESSION['foto']),
                    "nombre"=>utf8_encode($_SESSION['nombre']),
                    "correo"=>utf8_encode($_SESSION['correo']),
                    "nivel"=>utf8_encode($_SESSION['nivel']),
                    "telefono"=>utf8_encode($_SESSION['telefono'])
                );
        }

    }

?>