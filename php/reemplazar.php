<?php

    require('./validarSession.php');
    require('./activo.php');

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    if (!$session->activo()) {
        http_response_code(404);
        die("Solicitar Reinicio de sesion");
    }

    if (($_FILES["file"]["type"] == "application/pdf")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../Docs/".$_FILES["change"]["name"]."/".$_FILES["acade"]["name"]."/".$_FILES['name']['name'])) {
            http_response_code(200);
            echo json_encode(array("path" =>"../Docs/".$_FILES["change"]["name"]."/".$_FILES["acade"]["name"]."/".$_FILES['name']['name']));
        } else {
            http_response_code(401);
            die(json_encode(array("msg"=>"Error al guardar la imagen")));
        }
    } else {
        http_response_code(401);
        die(json_encode(array("msg"=>"Seleccione un archivo valido para la imagen")));
    }

?>