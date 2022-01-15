<?php
    function conectar() {
        try {
            $serverName = "LAITHG";
            $connectionInfo = array( "Database"=>"test", "UID"=>"Laithg", "PWD"=>"root");
            $conn = sqlsrv_connect( $serverName, $connectionInfo);
            if( $conn ) {
                return $conn;
            }else{
                return $conn;
            }
        } catch (Exception $e) {
            echo $e;
            return null;
        }
    }
?>