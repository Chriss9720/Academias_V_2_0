<?php
    require('./validarSession.php');
    $session = new Session();
    http_response_code(200);
    $arr = $session->misDatos();
    echo json_encode($arr);
?>