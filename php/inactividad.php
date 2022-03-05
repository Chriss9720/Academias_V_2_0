<?php

    class Inactividad {

        public function cerrar() {
            $fechaGuardada = $_SESSION["ultimoAcceso"];
            $ahora = date("Y-n-j H:i:s");
            $tiempo_transcurrido = (strtotime($ahora)-strtotime($fechaGuardada));
            if($tiempo_transcurrido >= 600) {
                session_destroy();
                return true;
            }else {
                $_SESSION["ultimoAcceso"] = $ahora;
                return false;
            }
        }

    }

?>