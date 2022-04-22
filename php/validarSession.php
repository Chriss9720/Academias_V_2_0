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

            $call = "{call dbo.SP_InfoDocente(?)}";
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
            $res = [];
            while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
                $dato = array(
                    "nomina"=>utf8_encode($row["nomina"]),
                    "nivel"=>utf8_encode($row["nivel"]),
                    "foto"=>utf8_encode($row["foto"]),
                    "ND"=>utf8_encode($row["ND"]),
                    "correo"=>utf8_encode($row["correo"]),
                    "telefono"=>utf8_encode($row["telefono"]),
                    "baja"=>utf8_encode($row["baja"]),
                    "clave_carrera"=>utf8_encode($row["clave_carrera"]),
                    "NC"=>utf8_encode($row["NC"]),
                    "jefe"=>utf8_encode($row["jefe"]),
                    "clave_academia"=>utf8_encode($row["clave_academia"]),
                    "nombre"=>utf8_encode($row["nombre"]),
                    "puesto"=>utf8_encode($row["puesto"]),
                    "Clave"=>utf8_encode($row["clave"])
                );
                array_push($res, $dato);
            }

            sqlsrv_free_stmt($stmt);
            sqlsrv_close($con);

            if(count($res) > 0) {
                $_SESSION["foto"] = $res[0]["foto"];
                $_SESSION["nivel"] = $res[0]["nivel"];
                $_SESSION["ND"] = $res[0]["ND"];
                $_SESSION["correo"] = $res[0]["correo"];
                $_SESSION["telefono"] = $res[0]["telefono"];
                $_SESSION["Clave"] = $res[0]["Clave"];
            }
            $jefe = 0;
            $puestos = [];
            for ($i = 0; $i < count($res); $i++) {
                if ($res[$i]["jefe"] == 1) {
                    $jefe = 1;
                }
                array_push($puestos, $res[$i]["puesto"]);
            }
            $_SESSION["jefe"] = $jefe;
            $_SESSION["puesto"] = $puestos;

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
                return true;
            }
        }

        public function cerrar() {
            session_destroy();
        }

        public function misDatos() {
            return array(
                    "foto"=>utf8_encode($_SESSION['foto']),
                    "nombre"=>utf8_encode($_SESSION['ND']),
                    "correo"=>utf8_encode($_SESSION['correo']),
                    "nivel"=>utf8_encode($_SESSION['nivel']),
                    "telefono"=>utf8_encode($_SESSION['telefono']),
                    "jefe"=>utf8_encode($_SESSION['jefe']),
                    "puesto"=>$_SESSION['puesto'],
                    'nomina' =>$_SESSION['nomina'],
                    'clave'=>$_SESSION["Clave"]
                );
        }

        public function actualizarDatos($data) {
            $_SESSION['Clave'] = $data['claveR'];
            $_SESSION['foto'] = $data['foto'];
            $_SESSION['ND'] = $data['nombre'];
            $_SESSION['telefono'] = $data['telefono'];
            $_SESSION['correo'] = $data['correo'];
        }

    }

?>