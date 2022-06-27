<?php

    class Activo
    {
        public function validar($session)
        {
            if (!$session->sesion()) {
                header("Location: /Academias/");
                exit();
            }
        }
    }

?>