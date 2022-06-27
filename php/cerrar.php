<?php

    require('./validarSession.php');
    $session = new Session();
    if ($session->sesion()) {
        http_response_code(200);
        $session->cerrar();
    } else {
        http_response_code(401);
    }

?>