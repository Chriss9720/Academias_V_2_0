<?php

    class Conectar {

        public function conn() {
            $serverName = "LAITHG";
            $userName = "Laithg";
            $password = "root";
            $dataBase = "ADMIN_ACADEMIAS";
            try {
                $connectionInfo = array( "Database"=>$dataBase, "UID"=>$userName, "PWD"=>$password);
                $conn = sqlsrv_connect($serverName, $connectionInfo);
                return $conn;
            } catch (Exception $e) {
                return null;
            }
        }

    }

?>