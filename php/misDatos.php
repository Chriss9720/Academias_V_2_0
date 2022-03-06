<?php
    require('./validarSession.php');

    $session = new Session();
    if (!$session->sesion()) {
        http_response_code(401);
        header("Location: /Academias");
    }

    http_response_code(200);
    $arr = $session->misDatos();
    echo json_encode($arr);
?>