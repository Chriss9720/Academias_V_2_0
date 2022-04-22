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

    function crearCapera($ruta)
    {
        if (!file_exists($ruta)) {
            mkdir($ruta, 0777, true);
        }
    }

    if (($_FILES["file"]["type"] == "application/pdf")) {
        $name = "../Docs/".$_FILES['tipo']['name']."/".$_FILES['acade']['name']."/".$_FILES['sub']['name'];
        crearCapera($name);
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $name."/".$_FILES['name']['name'].".pdf")) {
            http_response_code(200);
            echo json_encode(array("path" =>$name."/".$_FILES['name']['name'].".pdf"));
        } else {
            http_response_code(401);
            die(json_encode(array("msg"=>"Error al guardar la imagen")));
        }
    } else {
        http_response_code(401);
        die(json_encode(array("msg"=>"Seleccione un archivo valido para la imagen")));
    }

?>