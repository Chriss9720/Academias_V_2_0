<?php

    require_once 'vendor/autoload.php';

    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [215.9, 279.4],
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false'
    ]);

    $mpdf->SetHTMLFooter('Pag. {PAGENO} de {nb}');

    $miCss = file_get_contents('../css/pdfPlan.css');
    $mpdf->WriteHTML($miCss, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->SetHTMLHeader('
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="area_IMG borde_derecho">
                    <img src="../img/logo_ITESCA.png" alt="logo itesca" class="logo_ITESCA">
                </td>
                <td class="area_titulo centrar">
                    <label class="nombre_documento"><b>PLAN DE TRABAJO DE ACADEMIAS</b></label>
                    <br>
                    <label class="subtitulo">F03PSA01.03</label>
                </td>
            </tr>
        </tbody>
    </table>
    ');


    $mpdf->WriteHTML('
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="borde_derecho fuente academia negrita fondo_contenido texto_derecha">
                    Nombre de la Academia:
                </td>
                <td class="borde_derecho academia_d centrar">
                    Aqui va la academia
                </td>
                <td class="borde_derecho semestre fuente negrita fondo_contenido texto_derecha">
                    Semestre:
                </td>
                <td class="semestre_d">
                    Semestre
                </td>
            </tr>
        </tbody>
    </table>
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="presiente negrita fuente borde_derecho texto_derecha fondo_contenido">
                    Presidente:
                </td>
                <td class="presiente_d centrar">
                    presidente
                </td>
            </tr>
        </tbody>
    </table>
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="fecha negrita fuente centrar fondo_contenido">
                    Fechas de reuniones
                </td>
            </tr>
        </tbody>
    </table>
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="reunion borde_derecho negrita fuente centrar fondo_contenido">
                    1ra reunión:
                </td>
                <td class="reunion_d centrar borde_derecho">
                    01/01/21
                </td>
                <td class="reunion borde_derecho negrita fuente centrar fondo_contenido">
                    2da reunión:
                </td>
                <td class="reunion_d centrar">
                    01/01/21
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho reunion negrita fuente centrar fondo_contenido">
                    3ra reunión:
                </td>
                <td class="borde_superior reunion_d centrar borde_derecho">
                    01/01/21
                </td>
                <td class="borde_superior reunion borde_derecho negrita fuente centrar fondo_contenido">
                    4ta reunión:
                </td>
                <td class="borde_superior reunion_d centrar">
                    01/01/21
                </td>
            </tr>
        </tbody>
    </table>
    <table class="borde_tabla">
        <tbody>
            <tr>
                <td class="fuente columna_1 centrar borde_derecho negrita fondo_contenido">
                    No.
                </td>
                <td class="centrar fuente columna_2 borde_derecho negrita fondo_contenido">
                    Actividades
                </td>
                <td class="fuente columna_3 borde_derecho negrita fondo_contenido">
                    Acciones específicas para cada actividad
                </td>
                <td class="centrar fuente columna_4 borde_derecho negrita fondo_contenido">
                    Asignaturas en las que impacta:
                </td>
                <td class="centrar fuente columna_5 borde_derecho negrita fondo_contenido">
                    Responsable
                </td>
                <td class="centrar fuente columna_6 borde_derecho negrita fondo_contenido">
                    Fecha de cumplimiento
                </td>
                <td class="centrar fuente columna_7 negrita fondo_contenido">
                    Evidencia a entregar
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    1
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Mejoras e innovación de procesos de enseñanza y aprendizaje, incluye implementación de casos, semanas académicas, visitas industriales, proyectos de desarrollo comunitario, etc.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    2
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Uniformizar actividades de formación práctica en asignaturas, talleres y laboratorios.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    3
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Programación de viajes académicos y/o actividades de vinculación.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    4
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Programa de seguimiento y solución estratégica de las materias (PSSEM).
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    5
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Integrar banco de proyectos integradores y de residencias profesionales.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    6
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Revisión y actualización de requerimientos de bibliografía básica y de consulta de los programas de curso.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    7
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Desarrollar proyectos de investigación. Publicación de artículos académicos.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    8
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Diseño, rediseño o actualización y validación de instrumentaciones didácticas.
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
            <tr>
                <td class="borde_superior borde_derecho fuente columna_1 centrar negrita fondo_contenido">
                    9
                </td>
                <td class="justificar columna_2 borde_superior borde_derecho fuente">
                    Generar y validar instrumentos de evaluación (rubricas, listas de cotejo) y pruebas departamentales
                </td>
                <td class="justificar columna_3 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_4 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_5 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_6 borde_superior borde_derecho fuente">
                </td>
                <td class="justificar columna_7 borde_superior fuente">
                </td>
            </tr>
        </tbody>
    </table>

    <br/><br/>

    <table>
        <tbody>
            <tr>
                <td class="centrar fuente borde_izquierdo borde_superior borde_derecho firmas">
                    Elaboró
                </td>
                <td class="centrar fuente borde_superior borde_izquierdo borde_derecho firmas">
                    Validó
                </td>
                <td class="centrar borde_superior borde_derecho borde_izquierdo fuente firmas">
                    Supervisó
                </td>
            </tr>
            <tr>
                <td class="firma centrar borde_superior borde_izquierdo borde_derecho borde_inferior borde_derecho fuente firmas">
                </td>
                <td class="firma centrar borde_superior borde_derecho borde_inferior borde_izquierdo borde_derecho fuente  firmas">
                </td>
                <td class="firma centrar borde_superior borde_izquierdo borde_derecho borde_inferior firmas">
                </td>
            </tr>
            <tr>
                <td class="centrar fuente borde_izquierdo borde_derecho borde_inferior firmas">
                    Presidente de Academia
                </td>
                <td class="centrar fuente borde_izquierdo borde_derecho borde_inferior firmas">
                    Jefe de División de Carrera y/o Coordinador de Extensión
                </td>
                <td class="centrar borde_derecho borde_izquierdo fuente borde_inferior firmas">
                    Coordinador de Presidentes de Academias
                </td>
            </tr>
        </tbody>
    </table>
    ');

    $carpeta = "pruebasPDF/";
    $nombreArchivo = "../".$carpeta.$_POST["nombreArchivo"].".pdf";

    $mpdf -> Output($nombreArchivo, 'F');

?>