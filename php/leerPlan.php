<?php

    $ruta = $_POST['ruta'];

    $data = file_get_contents($ruta);

    $json = json_decode($data, true);

    echo json_encode($json);

?>