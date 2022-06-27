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

    if (($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/gif")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../img/".$_FILES['name']['name'])) {
            http_response_code(200);
            echo json_encode(array("path" => "img/".$_FILES['name']['name']));
        } else {
            http_response_code(401);
            die(json_encode(array("msg"=>"Error al guardar la imagen")));
        }
    } else {
        http_response_code(401);
        die(json_encode(array("msg"=>"Seleccione un archivo valido para la imagen")));
    }
?>