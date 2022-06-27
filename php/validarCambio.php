<?php

    require('./contectar.php');
    require('./validarSession.php');
    require('./activo.php');

    function validarPuesto($arrelo)
    {
        $a = [];
        for ($i = 0; $i < count($_SESSION["puesto"]); $i++) {
            array_push($a, $_SESSION["puesto"][$i]);
            for ($j = 0; $j < count($arrelo); $j++) {
                if ($_SESSION["puesto"][$i]['puesto'] == $arrelo[$j]) {
                    return true;
                }
            }
        }
        return false;
    }

    $session = new Session();
    $Activo = new Activo();
    $Activo->validar($session);

    if (!$session->activo()) {
        http_response_code(404);
        die("Solicitar Reinicio de sesion");
    }

    try {
        $accion = $_POST["accion"];
        $afectar = $_POST["afectar"];
        switch ($accion) {
            case "Crear":
                switch ($afectar) {
                    case "Plan de trabajo":
                            if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                                echo json_encode(array("cambio" => "/Academias/planTrabajo.html"));
                            } else {
                                http_response_code(401);
                                echo json_encode(array("msg" => "Acceso invalido"));
                            }
                        break;
                    case "Acta":
                        if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["nivel"] == 1) {
                            echo json_encode(array("cambio" => "/Academias/acta.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Docente":
                        if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["jefe"] == 1 || $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/Docente.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Carrera":
                        if ($_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/Carrera.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Academia":
                        if ($_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/Academia.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Ev. docente":
                        if (validarPuesto(array("Presidente")) ) {
                            echo json_encode(array("cambio" => "/Academias/evDocenteXPre.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Ev. presidente":
                        if ($_SESSION["nivel"] == 1 ) {
                            echo json_encode(array("cambio" => "/Academias/evPresidenteXCo.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Ev. secretario":
                        if ($_SESSION["nivel"] == 1 ) {
                            echo json_encode(array("cambio" => "/Academias/evSecretarioXCo.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    default:
                        http_response_code(400);
                        echo json_encode(array("msg"=>"Caso desconocido (Crear) '$afectar'"));
                }
                break;
            case "Editar":
                switch ($afectar) {
                    case "Docente":
                        if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["jefe"] == 1 || $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/docente.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Plan de trabajo":
                        if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/planTrabajo.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Acta":
                        if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["nivel"] == 1) {
                            echo json_encode(array("cambio" => "/Academias/acta.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    case "Carrera":
                        if ($_SESSION["jefe"] == 1|| $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                            echo json_encode(array("cambio" => "/Academias/Carrera.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                        case "Academia":
                            if (validarPuesto(array("Presidente", "Secretario")) || $_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 0) {
                                echo json_encode(array("cambio" => "/Academias/Academia.html"));
                            } else {
                                http_response_code(401);
                                echo json_encode(array("msg" => "Acceso invalido"));
                            }
                            break;
                        case "Ev. docente":
                            if (validarPuesto(array("Presidente")) ) {
                                echo json_encode(array("cambio" => "/Academias/evDocenteXPre.html"));
                            } else {
                                http_response_code(401);
                                echo json_encode(array("msg" => "Acceso invalido"));
                            }
                            break;
                        case "Ev. presidente":
                            if ($_SESSION["nivel"] == 1 ) {
                                echo json_encode(array("cambio" => "/Academias/evPresidenteXCo.html"));
                            } else {
                                http_response_code(401);
                                echo json_encode(array("msg" => "Acceso invalido"));
                            }
                            break;
                        case "Ev. secretario":
                            if ($_SESSION["nivel"] == 1 ) {
                                echo json_encode(array("cambio" => "/Academias/evSecretarioXCo.html"));
                            } else {
                                http_response_code(401);
                                echo json_encode(array("msg" => "Acceso invalido"));
                            }
                            break;
                        default:
                            http_response_code(400);
                            echo json_encode(array("msg"=>"Caso desconocido (Editar) '$afectar'"));
                }
                break;
            case "Finalizar":
                switch ($afectar) {
                    case "Plan de Trabajo":
                    case "Acta":
                    case 'Ev. Docente':
                    case "Ev. Presidente":
                    case "Ev. Secretario":
                        echo json_encode(array("cambio" => "/Academias/finalizar.html"));
                        break;
                    default:
                        http_response_code(400);
                        echo json_encode(array("msg"=>"Caso desconocido (Finalizar) '$afectar'"));
                }
                break;
            case "Liberar":
                switch ($afectar) {
                    case "Plan de Trabajo":
                    case "Acta":
                    case 'Ev. Docente':
                    case "Ev. Presidente":
                    case "Ev. Secretario":
                        echo json_encode(array("cambio" => "/Academias/finalizar.html"));
                        break;
                    default:
                        http_response_code(400);
                        echo json_encode(array("msg"=>"Caso desconocido (Finalizar) '$afectar'"));
                }
                break;
            case "editarme":
                echo json_encode(array("cambio" => "/Academias/Docente.html"));
                break;
            case "Ver":
                switch ($afectar) {
                    case "Docente":
                        echo json_encode(array("cambio" => "/Academias/verDocente.html"));
                        break;
                    case "Carrera":
                        echo json_encode(array("cambio" => "/Academias/verCarrera.html"));
                        break;
                    case "Academia":
                        echo json_encode(array("cambio" => "/Academias/verAcademia.html"));
                        break;
                    case "Estatus de evidencias":
                        if (validarPuesto(array("Presidente", "Secretario"))) {
                            echo json_encode(array("cambio" => "/Academias/verEntregados.html"));
                        } else {
                            http_response_code(401);
                            echo json_encode(array("msg" => "Acceso invalido"));
                        }
                        break;
                    default:
                        http_response_code(400);
                        echo json_encode(array("msg"=>"Caso desconocido (Ver) '$afectar'"));
                        break;
                }
                break;
            default:
                http_response_code(400);
                echo json_encode(array("msg"=>"Caso desconocido 1 '$accion'"));
        }
    } catch (Exception $e) {
        http_response_code(405);
        die(json_encode(array("status"=>400, "msg"=>"Ocurrio un error al cargar la informacion")));
    }

?>