<?php

    $ruta = $_POST['ruta'];

    if (file_exists($ruta)) {

        $data = file_get_contents($ruta);

        $json = json_decode($data, true);

        echo json_encode($json);
    } else {
        echo json_encode(array('error' => 'No existe', "ruta"=>$_POST['ruta']));
    }

?>