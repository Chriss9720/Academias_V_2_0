<?php

    require_once 'vendor/autoload.php';

    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [215.9, 279.4],
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false'
    ]);

    $mpdf->SetHTMLFooter('Pag. {PAGENO} de {nb}');

    $miCss = file_get_contents('../css/generacionActa.css');
    $mpdf->WriteHTML($miCss, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->SetHTMLHeader("
        <div class='row bordes'>
            <div class='area_IMG centrar borde-derecho m-0 p-0'>
                <img src='../img/logo_ITESCA.png' alt='logo itesca' class='logo_ITESCA'>
            </div>
            <div class='area_titulo centrar'>
                <label class='nombre_documento'><b>ACTA DE JUNTA DE ACADEMIA</b></label>
                <label class='subtitulo'>F01PSA01.02</label>
            </div>
        </div>
    ");

    $mpdf->WriteHTML("
        <div class='row mt-1 align-right'>
            <label><b>Acta No. <u>4</u></b></label>
        </div>

        <div class='row justificar '>
            <p class='text-padding-1-5'>
                En Ciudad Obregón, Sonora, siendo las hora de inicio horas del día dia de mes del año año reunidos en lugar del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de academia, cuya lista se anexa a la presente acta; se inicia
                la reunión, bajo la presidencia de presidente, auxiliado en la secretaria por secretario de acuerdo con el siguiente:
            </p>
        </div>

        <div class='row centrar'>
            <b>ORDEN DEL DÍA:</b>
        </div>

        <div class='row bordes mt-1 justificar p-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, voluptatibus at repudiandae facilis excepturi quaerat cum corporis rem aliquid provident deleniti repellendus totam ducimus sunt quis a quas officiis nemo. Saepe nihil magnam voluptatum
            est odit, facilis reprehenderit, aperiam non dolore laborum sunt ex aliquam quidem nobis recusandae minus culpa amet quaerat nesciunt velit, fugiat iste. Fugit quo eveniet repellendus! Quam eos, quae rem, libero voluptas culpa mollitia beatae
            soluta omnis porro cum corrupti aspernatur consectetur! Harum ullam eos tempora, odio, quas tempore libero alias repudiandae facere nisi excepturi sapiente. Maxime deleniti labore amet esse sit? Adipisci nam, minima laudantium assumenda placeat
            possimus hic sint iure doloribus architecto dignissimos nostrum ipsam cumque aut dolorum culpa perspiciatis. Necessitatibus distinctio fugit perferendis! Nisi aperiam eveniet magnam iure ratione accusamus, fugiat impedit nostrum, labore aut dolorum
            tempore exercitationem illum deleniti ea mollitia dignissimos voluptate molestias natus nemo ut odit. Velit sit ducimus eum? A, expedita est architecto quo adipisci fugit earum nostrum quos. Vel officia perspiciatis, dolore, quas voluptatem deserunt
            sint pariatur aut eos esse quae? Exercitationem libero ea mollitia asperiores ipsam quae. Numquam dolor iusto debitis saepe ducimus, praesentium deserunt dolores tenetur rem deleniti nulla delectus ipsum dolorum perspiciatis sit reprehenderit
            ad. Ipsa repellendus voluptas et tenetur eum ad necessitatibus dolor excepturi? Ex adipisci voluptatem nisi consequuntur eaque, inventore assumenda ipsa perspiciatis illum esse ab hic quod reiciendis at dolore amet ut minima quas possimus, blanditiis
            quidem? Reiciendis ad nostrum tempora quibusdam? Nihil esse autem quia quibusdam sint quaerat! Reiciendis culpa fugiat aperiam quam odio doloremque minus dicta iure repellendus, expedita deleniti sapiente voluptas eius ex reprehenderit, enim nemo
            assumenda harum corporis. Voluptatum nesciunt neque nostrum quibusdam! Placeat id dolorem, est eum neque architecto, in at expedita fugiat debitis illum eos dolorum ullam adipisci eligendi et distinctio quibusdam blanditiis rem commodi possimus.
        </div>

        <div class='row justificar '>
            <p class='text-padding-1-5'>
                Aprobado el Orden del Día, se procede a la revisión de acuerdos de la minuta anterior bajo el siguiente:
            </p>
        </div>

        <div class='row centrar'>
            <b>SEGUIMIENTO DE ACUERDOS ANTERIORES:</b>
        </div>

        <div class='row mt-1'>
            <div class='acuerdo centrar bordes relleno'>
                ACUERDO
            </div>
            <div class='centrar bordes responsable relleno'>
                RESPONSABLE
            </div>
            <div class='centrar bordes fecha relleno'>
                FECHA DE CUMPLIMIENTO
            </div>
            <div class='centrar bordes avance relleno'>
                AVANCE
            </div>

            <div class='acuerdo justificar bordes'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vero!
            </div>
            <div class='justificar bordes responsable'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vero!
            </div>
            <div class='justificar bordes fecha'>
                25/10/22 10:15AA
            </div>
            <div class='justificar bordes avance'>
                10%
            </div>
        </div>

        <div class='row centrar mt-1'>
            <b>ACUERDOS DE REUNIÓN:</b>
        </div>

        <div class='row mt-1'>
            <div class='acuerdo_2 centrar bordes relleno'>
                ACUERDO
            </div>
            <div class='centrar bordes responsable relleno'>
                RESPONSABLE
            </div>
            <div class='centrar bordes fecha relleno'>
                FECHA DE CUMPLIMIENTO
            </div>

            <div class='acuerdo_2 justificar bordes'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vero!
            </div>
            <div class='justificar bordes responsable'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vero!
            </div>
            <div class='justificar bordes fecha'>
                25/10/22 10:15AA
            </div>
        </div>

        <div class='row justificar '>
            <p class='text-padding-1-5'>
                El presidente pone a la consideración de los presentes el acta, quienes la aprueban en todas sus partes firman de conformidad al final de la misma.
                <br><br> Sin otro asunto que tratar, el presidente da por terminada la reunión, siendo las hora final horas del mismo día.
            </p>
        </div>

        <div class='d-flex row around'>
            <div class='relleno bordes firmas text-center'>Presidente</div>
            <div class='relleno bordes firmas text-center'>Secretario</div>
            <div class='relleno bordes area_firma text-center'></div>
            <div class='relleno bordes area_firma text-center'></div>
            <div class='relleno bordes firmas text-center'>Firma</div>
            <div class='relleno bordes firmas text-center'>Firma</div>
        </div>

        <div class='row centrar mt-1'>
            <b>CONSTANCIA DE APROBACIÓN:</b>
        </div>

        <div class='row justificar '>
            <p class='text-padding-1-5'>
                Nombre y firma de los miembros de la academia que asistieron a la reunión y manifiestan su aprobación para la presente acta.
            </p>
        </div>

        <div class='row mt-1'>
            <div class='acuerdo_2 centrar bordes relleno'>
                PROFESOR
            </div>
            <div class='centrar bordes responsable relleno'>
                MATERIA QUE IMPARTE
            </div>
            <div class='centrar bordes fecha relleno'>
                FIRMA
            </div>

            <div class='acuerdo_2 centrar bordes'>
                Nombre
            </div>
            <div class='centrar bordes responsable'>
                Lista
            </div>
            <div class='centrar bordes fecha'>
                FIRMA
            </div>

        </div>

        <div class='row mt-1'>
            <div class='relleno bordes w-100 centrar'>
                Revisión y Aprobación del Jefe de División
            </div>
            <div class='borde justificar obs bordes p-1'>
                <b>Observaciones: </b> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum vitae, saepe libero cumque deserunt quidem obcaecati eius qui, harum sed similique consequatur minus? Iure et possimus ipsa quibusdam sed illum. Ratione
                eum consectetur consequuntur ducimus velit cupiditate nisi obcaecati, iure eaque temporibus! Blanditiis, commodi itaque eos eaque doloremque ex similique quibusdam veritatis explicabo sapiente dolores atque neque molestias sint accusamus!
                Explicabo perspiciatis blanditiis voluptatem quo ipsam repellendus? Id eos corrupti facere rerum quaerat, quos iure a odio ut adipisci, natus nemo dolorum nesciunt doloribus tempore reprehenderit et amet autem velit. Dolorum dicta laudantium
                ad, ipsa cupiditate nemo exercitationem repellendus dolore delectus, laboriosam unde aliquid et maiores harum pariatur non accusantium. Dignissimos, repellat eligendi earum id dolore nobis illo soluta molestiae. Excepturi error ab quae deleniti.
                Labore, nam placeat. Ipsam exercitationem molestias repudiandae expedita repellat quam, dolorem fuga reiciendis veniam, corporis odit tenetur quod, eum veritatis! Aspernatur possimus assumenda minus veritatis! Facilis nam eligendi dolorum
                at eum tenetur fugiat quis maxime enim officiis architecto voluptatem eos sed aut omnis vitae velit ut ex ipsa quasi, maiores molestiae? Excepturi assumenda sed eveniet. Nobis corrupti tempora repellat beatae obcaecati repellendus iusto? Ducimus
                necessitatibus, quidem, et harum eum natus nisi laudantium atque molestias voluptatem reiciendis fugiat nemo vitae, minus quam doloribus magni voluptatibus veritatis. Fugiat dicta vero vel numquam, alias repudiandae voluptate qui sapiente
                debitis ullam omnis optio, labore in minus soluta illo dolorum nam fugit laborum consequuntur? Est alias unde non quis ut! Officiis, cupiditate doloremque? Laboriosam perferendis doloribus ullam, consectetur vel esse, sed repellat, accusamus
                doloremque neque voluptas dolorum impedit. Sed pariatur eligendi iure tempore ipsam repellendus maxime qui consequuntur fugit molestiae. Harum velit quo neque accusantium suscipit! Eos sequi inventore voluptatum expedita nisi. Eum dolorem
                incidunt deserunt ducimus eveniet laboriosam hic, minima, expedita minus ratione qui dignissimos consequuntur, recusandae iste sint.
                <div class='mt-3 d-flex align-right'>
                    <div class='firma-jefe border-sup centrar'>
                        Jefe de División
                        <br>Nombre y Firma
                    </div>
                </div>
            </div>
        </div>
    ");

    $nombre = "acta";
    $carpeta = "../Docs/Actas";
    $ruta = "$carpeta/$nombre";
    $nombreArchivo = "$ruta.pdf";
    $nombreJson = "$ruta.json";

    $mpdf -> Output("$nombreArchivo", 'F');

    header("location: $ruta.pdf");

?>