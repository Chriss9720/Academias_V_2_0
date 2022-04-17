$(document).ready(() => {

    $("#ayudaPlan").click(() => {
        if (sessionStorage.getItem("accion").includes("Editar")) {
            $("#modales").html(`
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Ayuda para editar plan de trabajo</label>
                            </div>
                            <div class="modal-body">
                                <ul class="text-justify p-3">
                                    <li>
                                        Para la búsqueda de academias:
                                        <ul>
                                            <li>
                                                Academia debe de ser en formato <b>Clave - Nombre</b>.
                                            </li>
                                            <li>
                                                Si se ingresa la información de forma distinta al formato, aparecerá el mensaje de error <b> "Debe
                                                    de ser en formato Clave - Nombre"</b>.
                                            </li>
                                            <li>
                                                Si no se ingresa ninguna academia, aparecerá el mensaje de error <b>"Seleccione una academia"</b> al
                                                seleccionar otros botones.
                                            </li>
                                            <li>
                                                Ingresada la información presione el botón <b>enter</b>, se cargarán los planes de trabajos posibles a una modificación.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Para la búsqueda de plan:
                                        <ul>
                                            <li>
                                                Plan debe de ser en formato <b>Clave - Fecha</b>.
                                            </li>
                                            <li>
                                                Si se ingresa la información de forma distinta al formato, aparecerá el mensaje de error <b> "Debe
                                                de ser en formato Clave - Fecha"</b>.
                                            </li>
                                            <li>
                                                Si se ingresan los datos de un plan que no esté registrado aparecerá el mensaje de error <b>"No se encontró plan"</b>
                                            </li>
                                            <li>
                                                Si no se ingresan datos en la sección "búsqueda de plan" aparecerá el mensaje de error  <b>"Seleccione plan a modicar"</b>.
                                            </li>
                                            <li>
                                                Ingresada la información, presione el botón <b>enter</b>, se cargará la información guardada del plan seleccionado.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Para seleccionar fechas:
                                        <ul>
                                            <li>
                                                En caso de no aparecer no se recomienda el uso del navegador actual.
                                            </li>
                                            <li>
                                                Al seleccionar el icono <img src="img/iconocalen.JPG"> en el apartado de reunión aparecerá el
                                                siguiente recuadro: <img src="img/calendario.png">
                                            </li>
                                            <li>
                                                Escoja el día y hora deseada seleccionando los números correspondientes.
                                            </li>
                                            <li>
                                                Si desea borrar la fecha seleccionada presione el botón <b>"borrar"</b>.
                                            </li>
                                            <li>
                                                Si desea obtener la fecha actual exacta seleccione el botón <b>"hoy"</b>.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Para ingresar datos en actividades:
                                        <ul>
                                            <li>
                                                En las secciones
                                                <b>"Acciones específicas para cada actividad",
                                                    "Asignaturas en las que impacta" y
                                                    "Evidencia a entregar", </b> seleccione el texto <b>"click para editar"</b> y aparecerá el
                                                siguiente formato:
                                            </li>
                                            <img src="img/formatollenable.png" style="width: 300px;">
                                            <li>
                                                Escriba los datos correspondientes en el recuadro donde aparece el mensaje <b>"click para
                                                    editar"</b>.
                                            </li>
                                            <li>
                                                Para más personalización puede seleccionar los iconos de la parte superior del recuadro.
                                            </li>
                                            <li>
                                                Si desea cancelar el tecleado de información seleccione el botón <b>"cancelar"</b>.
                                            </li>
                                            <li>
                                                Si desea guardar la información tecleada seleccione el botón <b>"aplicar"</b>.
                                            </li>
                                            <li>
                                                En la sección <b>"responsable"</b> seleccione el texto <b>"click para editar"</b> y aparecerá el
                                                siguiente recuadro:
                                            </li>
                                            <img src="img/cuadroresp.JPG" style="width: 300px;">
                                            <li>
                                                Para agregar a un responsable, dé click en la sección "Nómina/Nombre" y elija una de las opciones o
                                                ingrese los datos con el formato solicidado, después presione el botón
                                                <i class="fas fa-plus-circle click" aria-hidden="true"></i> o pulse <b>enter</b>.
                                            </li>
                                            <li>
                                                Si se ingresa la información de forma distinta al formato o no se selecciona a ningún responsable y
                                                se presiona el botón
                                                <i class="fas fa-plus-circle click" aria-hidden="true"></i> a
                                                parecerá el mensaje de error
                                                <b> "Debe de ser en formato Nómina - Nombre" </b>.
                                            </li>
                                            <li>
                                                Si se quiere eliminar a uno de los responsables seleccionados, dé click al icono <i
                                                    class="click fas fa-user-minus" aria-hidden="true"></i>.
                                            </li>
                                            <li>
                                                Si se quiere agregar a todos los miembros que están registrados seleccione el botón <b>"todos"</b>.
                                            </li>
                                            <li>
                                                Para guardar a todos los responsables agregados seleccione el botón <b>"aplicar"</b>.
                                            </li>
                                            <li>
                                                Si se desea cancelar toda la elección de responsables, seleccione el botón <b>"cancelar"</b>.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                    Para validar los datos de una evidencia a entregar:
                                    <ul>
                                        <li>
                                            En el aparatado <b>"evidencia a entregar"</b> , presione el texto <b>"click para editar"</b> , aparecerá el siguiente apartado:
                                        </li>
                                        <img src="img/formatollenable.png" style="width: 300px;">
                                        <li>
                                            Para hacer válidas las evidencias que se quieran ingresar, asegure de <b> ANOTAR CADA UNA DE ELLAS CON
                                                PUNTUACIÓN O ENUMERACIÓN </b>, seleccionando los íconos <img src="img/puntos.JPG"> antes de escribirlas. Por ejemplo:
                                        </li>
                                        <img src="img/evidencia1.JPG" style="width: 300px;">
                                        <li>
                                            En este caso serán reconocidas <b>"Evidencia1punto"</b> y <b>"Evidencia1numero"</b>.
                                        </li>
                                        <li>
                                            Para añadir otra tarea presione una vez el botón <b>enter</b> , se agregará un nuevo punto o número.
                                        </li>
                                        <img src="img/evidencia2.JPG" style="width: 300px;">
                                        <li>
                                            En este caso serán reconocidas <b>"Evidencia1punto", "Evidencia2punto" y "Evidencia1numero",
                                                "Evidencia2numero"</b>.
                                        </li>
                                        <li>
                                            En caso de agregarse una evidencia sin puntuación o enumeración como el siguiente ejemplo:
                                        </li>
                                        <img src="img/evidencia3.JPG" style="width: 300px;">
                                        <li>
                                            No serán reconocidas <b>"Evidencia2punto"</b> ni <b>"Evidencia2numero"</b>.
                                        </li>
                                        <li>
                                            En caso de no agregar ninguna evidencia con puntuación o numeración como el siguiente ejemplo:
                                        </li>
                                        <img src="img/evidencia4.JPG" style="width: 300px;">
                                        <li>
                                            No serán reconocidas ninguna de las evidencias.
                                        </li>
                                        En caso de agregar 2 evidencias en el mismo punto o número como el siguiente ejemplo:
                                </li>
                                <img src="img/evidencia5.JPG" style="width: 300px;">
                                <li>
                                    Se tomarán las 2 evidencias que están en el mismo punto o número como una sola con los 2 nombres.
                                </li>
                                </ul>
                                </li>
                                    <li>
                                        Para la opción vista previa:
                                        <ul>
                                            <li>
                                                Debe de estar seleccionada una academia para que se pueda mostrar la vista previa o generar el PDF ,
                                                en caso de no ser así , se mostrará el mensaje de error <b>"Seleccione una academia"</b>.
                                            </li>
                                            <li>
                                                Al seleccionar la opción <b>"Vista previa"</b> no se guardará el documento , solo se mostrará el
                                                plan de trabajo en formato PDF con la información que se haya ingresado.
                                            </li>
                                            <li>
                                                Al seleccionar la opción <b>"Generar PDF"</b> se guardará el documento en la base de datos y se
                                                mostrará el plan de trabajo en formato PDF con la información que se haya ingresado.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <input id="cerrarAyuda" type="button" value="Salir" class="btn btn-secondary">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        } else {
            $("#modales").html(`
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Ayuda para la creación del plan de trabajo</label>
                            </div>
                            <div class="modal-body">
                                <ul class="text-justify p-3">
                                    <li>
                                        Para la búsqueda de academias:
                                        <ul>
                                            <li>
                                                Debe de ser en formato <b>Clave - Nombre</b>.
                                            </li>
                                            <li>
                                                Si se ingresa la información de forma distinta al formato, aparecerá el mensaje de error <b> "Debe
                                                    de ser en formato Clave - Nombre"</b>.
                                            </li>
                                            <li>
                                                Si no se ingresa ninguna academia, aparecerá el mensaje de error <b>"Seleccione una academia"</b> al
                                                seleccionar otros botones.
                                            </li>
                                            <li>
                                                Al ingresarse correctamente el formato de academias se debe presionar el botón <b>enter</b> para cargar los
                                                datos.
                                            </li>
                                            <li>
                                                Automáticamente se cargarán los datos de los campos "Nombre de accademia", "Presidente" y
                                                "Semestre".
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Para seleccionar fechas:
                                        <ul>
                                            <li>
                                                En caso de no aparecer no se recomienda el uso del navegador actual.
                                            </li>
                                            <li>
                                                Al seleccionar el icono <img src="img/iconocalen.JPG"> en el apartado de reunión aparecerá el
                                                siguiente recuadro: <img src="img/calendario.png">
                                            </li>
                                            <li>
                                                Escoja el día y hora deseada seleccionando los números correspondientes.
                                            </li>
                                            <li>
                                                Si desea borrar la fecha seleccionada presione el botón <b>"borrar"</b>.
                                            </li>
                                            <li>
                                                Si desea obtener la fecha actual exacta seleccione el botón <b>"hoy"</b>.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Para ingresar datos en actividades:
                                        <ul>
                                            <li>
                                                En las secciones
                                                <b>"Acciones específicas para cada actividad",
                                                    "Asignaturas en las que imparte" y
                                                    "Evidencia a entregar", </b> seleccione el texto <b>"click para editar"</b> y aparecerá el
                                                siguiente formato:
                                            </li>
                                            <img src="img/formatollenable.png" style="width: 300px;">
                                            <li>
                                                Escriba los datos correspondientes en el recuadro donde aparece el mensaje <b>"click para
                                                    editar"</b>.
                                            </li>
                                            <li>
                                                Para más personalización puede seleccionar los iconos de la parte superior del recuadro.
                                            </li>
                                            <li>
                                                Si desea cancelar el tecleado de información seleccione el botón <b>"cancelar"</b>.
                                            </li>
                                            <li>
                                                Si desea guardar la información tecleada seleccione el botón <b>"aplicar"</b>.
                                            </li>
                                            <li>
                                                En la sección <b>"responsable"</b> seleccione el texto <b>"click para editar"</b> y aparecerá el
                                                siguiente recuadro:
                                            </li>
                                            <img src="img/cuadroresp.JPG" style="width: 300px;">
                                            <li>
                                                Para agregar a un responsable, dé click en la sección "Nómina/Nombre" y elija una de las opciones o
                                                ingrese los datos con el formato solicidado, después presione el botón
                                                <i class="fas fa-plus-circle click" aria-hidden="true"></i> o pulse <b>enter</b>.
                                            </li>
                                            <li>
                                                Si se ingresa la información de forma distinta al formato o no se selecciona a ningún responsable y
                                                se presiona el botón
                                                <i class="fas fa-plus-circle click" aria-hidden="true"></i> a
                                                parecerá el mensaje de error
                                                <b> "Debe de ser en formato Nómina - Nombre" </b>.
                                            </li>
                                            <li>
                                                Si se quiere eliminar a uno de los responsables seleccionados, dé click al icono <i
                                                    class="click fas fa-user-minus" aria-hidden="true"></i>.
                                            </li>
                                            <li>
                                                Si se quiere agregar a todos los miembros que están registrados seleccione el botón <b>"todos"</b>.
                                            </li>
                                            <li>
                                                Para guardar a todos los responsables agregados seleccione el botón <b>"aplicar"</b>.
                                            </li>
                                            <li>
                                                Si se desea cancelar toda la elección de responsables, seleccione el botón <b>"cancelar"</b>.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                    Para validar los datos de una evidencia a entregar:
                                    <ul>
                                        <li>
                                            En el aparatado <b>"evidencia a entregar"</b> , presione el texto <b>"click para editar"</b> , aparecerá el siguiente apartado:
                                        </li>
                                        <img src="img/formatollenable.png" style="width: 300px;">
                                        <li>
                                            Para hacer válidas las evidencias que se quieran ingresar, asegure de <b> ANOTAR CADA UNA DE ELLAS CON
                                                PUNTUACIÓN O ENUMERACIÓN </b>, seleccionando los íconos <img src="img/puntos.JPG"> antes de escribirlas. Por ejemplo:
                                        </li>
                                        <img src="img/evidencia1.JPG" style="width: 300px;">
                                        <li>
                                            En este caso serán reconocidas <b>"Evidencia1punto"</b> y <b>"Evidencia1numero"</b>.
                                        </li>
                                        <li>
                                            Para añadir otra tarea presione una vez el botón <b>enter</b> , se agregará un nuevo punto o número.
                                        </li>
                                        <img src="img/evidencia2.JPG" style="width: 300px;">
                                        <li>
                                            En este caso serán reconocidas <b>"Evidencia1punto", "Evidencia2punto" y "Evidencia1numero",
                                                "Evidencia2numero"</b>.
                                        </li>
                                        <li>
                                            En caso de agregarse una evidencia sin puntuación o enumeración como el siguiente ejemplo:
                                        </li>
                                        <img src="img/evidencia3.JPG" style="width: 300px;">
                                        <li>
                                            No serán reconocidas <b>"Evidencia2punto"</b> ni <b>"Evidencia2numero"</b>.
                                        </li>
                                        <li>
                                            En caso de no agregar ninguna evidencia con puntuación o numeración como el siguiente ejemplo:
                                        </li>
                                        <img src="img/evidencia4.JPG" style="width: 300px;">
                                        <li>
                                            No serán reconocidas ninguna de las evidencias.
                                        </li>
                                        En caso de agregar 2 evidencias en el mismo punto o número como el siguiente ejemplo:
                                </li>
                                <img src="img/evidencia5.JPG" style="width: 300px;">
                                <li>
                                    Se tomarán las 2 evidencias que están en el mismo punto o número como una sola con los 2 nombres.
                                </li>
                                </ul>
                                </li>
                                    <li>
                                        Para la opción vista previa:
                                        <ul>
                                            <li>
                                                Dede de estar seleccionada una academia para que se pueda mostrar la vista previa o generar el PDF ,
                                                en caso de no ser así , se mostrará el mensaje de error <b>"Seleccione una academia"</b>.
                                            </li>
                                            <li>
                                                Al seleccionar la opción <b>"Vista previa"</b> no se guardará el documento , solo se mostrará el
                                                plan de trabajo en formato PDF con la información que se haya ingresado.
                                            </li>
                                            <li>
                                                Al seleccionar la opción <b>"Generar PDF"</b> se guardará el documento en la base de datos y se
                                                mostrará el plan de trabajo en formato PDF con la información que se haya ingresado.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <input id="cerrarAyuda" type="button" value="Salir" class="btn btn-secondary">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        $("#modal").modal();

        $("#cerrarAyuda").click(() => {
            $("#modal").modal("hide");
            $(`[class="modal-backdrop show"]`).remove();
        });

    });

    const Plan = {
        "preview": true,
        "fecha": "",
        "fechaG": "",
        "editar": 0,
        "datos": {
            "claveAcademia": "",
            "academia": "",
            "presidente": "",
            "semestre": "",
            "jefe": "",
            "coordinador": ""
        },
        "fechas": {
            "fecha_1": "",
            "fecha_2": "",
            "fecha_3": "",
            "fecha_4": ""
        },
        "1": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "2": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "3": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "4": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "5": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "6": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "7": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "8": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        },
        "9": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": "",
            "tareas": []
        }
    };

    var planEdit;

    var listaPlanes;

    const preview = [];

    var miembrosTotal = []

    var responsableAux = [];

    var idText;

    var academias = [];

    var seleccionada = false;

    var cerrarM = {
        load: false,
        login: false
    };

    const cerrar = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/cerrar.php",
                success: s => resolve(),
                error: e => reject()
            });
        })
    };

    const getMisDatos = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/misDatos.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cerrarModal = () => {
        $("#modal").modal('hide');
        $(`[class="modal-backdrop show"]`).remove();
    };

    const login = () => {
        cerrarM.login = false;
        $("#modales").html(`
            <div class="modal" id="modal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header d-flex justify-content-center h4">
                            <label>Se ha cerrado la session por inactividad, por favor ingrese sus credenciales</label>
                        </div>
                        <div class="modal-body">
                            <div id="nominaC" class="input-group mb-3 border rounded-pill bg-white">
                                <div class="input-group-prepend">
                                    <span class="input-group-text sin">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                                <input id="nomina" type="text" class="form-control" placeholder="Nómina">
                                <div name="nomina" class="invalid-tooltip"></div>
                            </div>
                            <div id="claveC" class="input-group mt-1 mb-3 border rounded-pill bg-white">
                                <div class="input-group-prepend">
                                    <span name="visible" class="input-group-text sin click">
                                        <i id="icono" class="fas fa-lock"></i>
                                    </span>
                                </div>
                                <input id="clave" type="password" class="form-control" placeholder="Contraseña">
                                <div name="clave" class="invalid-tooltip"></div>
                            </div>
                            <div id="Error"></div>
                        </div>
                        <div class="modal-footer">
                            <input id="logearme" type="button" value="Entrar" class="btn btn-success">
                            <input id="Salir" type="button" value="Salir" class="btn btn-secondary">
                        </div>
                    </div>
                </div>
            </div>
        `);

        $("[name='visible']").click(() => {
            let elemt = $("#clave")[0];
            if (elemt.type == "password") {
                elemt.type = "text";
                $("#icono")[0].className = "fas fa-lock-open";
            } else {
                elemt.type = "password";
                $("#icono")[0].className = "fas fa-lock";
            }
        });

        $("#logearme").click(async() => {
            let nomina = getValue("nomina");
            let clave = getValue("clave");

            if (!validacionDeNoVacio(nomina)) return errorExacto({ campo: "nomina", desc: "Ingrese su nómina" });
            else quitarError({ campo: "nomina" })

            if (!validacionDeNoVacio(clave)) return errorExacto({ campo: "clave", desc: "Ingrese su clave" });
            else quitarError({ campo: "clave" })

            if (!validacionNumerica(nomina)) return error("Datos ingresados erroneamente")

            login2({ nomina: nomina, clave: clave })
                .then(t => load())
                .catch(c => error(c.msg))
        });

        const login2 = ({ nomina, clave }) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "php/logeo.php",
                    type: "post",
                    data: {
                        nomina: nomina,
                        clave: clave
                    },
                    dataType: "json",
                    success: s => resolve(s),
                    error: e => reject(e.responseJSON)
                });
            });
        }

        const getValue = name => $(`#${name}`)[0].value;

        const error = desc => {
            $("#Error").html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>${desc}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        };

        const errorExacto = ({ campo, desc }) => {
            let input = $(`#${campo}`)[0];
            if (!input.className.includes('invalid')) {
                input.className += ' is-invalid';
                $(`#${campo}C`)[0].className += " error";
            }
            $(`div[name="${campo}"]`).text(desc);
        }

        const quitarError = ({ campo }) => {
            let input = $(`#${campo}`)[0];
            input.className = input.className.replace(' is-invalid', "");
            $(`#${campo}C`)[0].className = $(`#${campo}C`)[0].className.replace(" error", "");
        };

        $("#Salir").click(() => cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias"));

        $("#modal").modal();

        $('#modal').on('hidden.bs.modal', () => {
            if (!cerrarM.login) $("#modal").modal();
        });

    };

    const cargando = () => {
        cerrarM.load = false;
        $("#modales").html(`
            <div class="modal" id="modal">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $("#modal").modal();

        $('#modal').on('hidden.bs.modal', () => {
            if (!cerrarM.load) $("#modal").modal();
        });

    };

    const validarPagina = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/validarCambio.php",
                data: {
                    accion: sessionStorage.getItem('accion'),
                    afectar: sessionStorage.getItem('afectar')
                },
                type: "post",
                dataType: "json",
                success: (s) => resolve(s),
                error: (e) => reject(e)
            });
        });
    };

    $("#Cerrar").click(() => {
        cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
    });

    const crearMigaja = () => {
        $("#pan").html(`
            <li class="breadcrumb-item">
                <a href="/Academias/panel.html">Inicio</a>
            </li>
            <li class="breadcrumb-item">
                ${sessionStorage.getItem("accion")}
            </li>
            <li class="breadcrumb-item">
                ${sessionStorage.getItem("afectar")}
            </li>
        `);
    };

    const datosAcademias = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/datosAcademias.php",
                data: {
                    academia: clave
                },
                type: "post",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const miembrosAcademia = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/miembrosAcademia.php",
                type: "POST",
                data: {
                    "Academia": clave
                },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const cargarMiembros = data => {
        miembrosTotal = [];
        let final = "";
        data.forEach(d => {
            miembrosTotal.push(d);
            final += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        $("#busqueda_1_lista").html(final);
    };

    const getMisAcademias = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/DondeCrearPlanAcademia.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const construirBusqueda = () => {
        let r = "";
        for (let i = 0; i < academias.length; i++) {
            r += `<option value="${academias[i].clave_academia} - ${academias[i].nombre}">`;
        }
        $("#listaAcademias").html(r);
    };

    const construirPlanes = () => {
        let r = "";
        for (let i = 0; i < listaPlanes.length; i++) {
            r += `<option value="${listaPlanes[i].id_planTrabajo} - ${listaPlanes[i].fecha.date}">`;
        }
        $("#listaDePlanes").html(r);
    };

    const getPlanesEdit = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/editarPlan.php",
                data: {
                    academia: clave
                },
                type: "post",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const leerPlan = ruta => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/leerPlan.php",
                data: { ruta: ruta },
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cargarInfo = () => {

        $("#nameAcademia")[0].value = planEdit.datos.academia;
        $("#namePresidente")[0].value = planEdit.datos.presidente;
        $("#nameSemestre")[0].value = planEdit.datos.semestre;

        Plan["datos"]["academia"] = planEdit.datos.academia;
        Plan["datos"]["presidente"] = planEdit.datos.presidente;
        Plan["datos"]["semestre"] = planEdit.datos.semestre;

        let fechas = planEdit.fechas;
        let camposFechas = ["fecha_1", "fecha_2", "fecha_3", "fecha_4"];
        for (let i = 0; i < camposFechas.length; i++) {
            $(`#${camposFechas[i]}`)[0].value = fechas[camposFechas[i]].replace(" ", "T");
            planEdit[camposFechas[i]] = fechas[camposFechas[i]];
        }

        let campos = ["Acciones", "Asignaturas", "Evidencia"];
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < campos.length; j++) {
                let campo = $(`#${campos[j]}_${i}`);
                campo[0].className = campo[0].className.replace("d-flex justify-content-center align-items-center", "text-justify");
                campo.html(planEdit[i][campos[j]]);
                Plan[i][campos[j]] = planEdit[i][campos[j]];
            }
        }

        for (let i = 1; i < 10; i++) {
            let text = "";
            let responsables = planEdit[i]["Responsables"];
            for (let j = 0; j < responsables.length; j++) {
                text += `<li>
                    <div class="row">
                        <div class="col-8">
                            ${responsables[i].nomina} - ${responsables[i].nombre}
                        </div>
                        <div class="col-4 align-self-center">
                            <span class="ml-auto">
                                <i name="remover" id="remover-${responsables[i].nomina}" class="click fas fa-user-minus"></i>
                            </span>
                        </div>
                    </div>
                </li>`;
            }
            let campo = $(`#Responsables_${i}`)[0];
            let value = `<ul>${text}</ul>`;
            campo.innerHTML = value;
            campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
            Plan[i][`Responsables`] = planEdit[i]["Responsables"];
        }
    };

    $("#planSeleccionado").keypress(k => {
        if (k.which == 13) {
            let dato = k.target.value.split(" - ");
            if (dato.length < 2) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Debe de ser en formato Clave - Fecha</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                let datos = listaPlanes.find(f => f.id_planTrabajo == dato[0] && f.fecha.date == dato[1]);
                if (datos) {
                    cargando();
                    $("#alertBusqueda").html(``);
                    leerPlan(datos.localizacionJson)
                        .then(plan => {
                            seleccionada = true;
                            Plan["datos"]["claveAcademia"] = plan.datos.claveAcademia;
                            Plan["datos"]["jefe"] = plan.datos.jefe;
                            Plan["datos"]["coordinador"] = plan.datos.coordinador;
                            planEdit = plan;
                            cargarInfo();
                            cerrarM.load = true;
                            cerrarModal();
                        }).catch(e => {
                            cerrarM.load = true;
                            cerrarModal();
                            $("#alertBusqueda").html(`
                            <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                                <strong class="h1">No se encontro el plan, puede que se alla borrado del servidor</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                        })
                } else {
                    $("#alertBusqueda").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontro el plan</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        }
    });

    $("#academiaSeleccionada").keypress(k => {
        if (k.which == 13) {
            let dato = k.target.value.split(" - ");
            if (dato.length < 2) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Debe de ser en formato Clave - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                if (dato.length > 2) {
                    for (let i = 2; i < dato.length; i++) {
                        dato[1] += ` - ${dato[i]}`;
                    }
                }
                let clave = academias.find(f => f.clave_academia == dato[0] && f.nombre == dato[1]);
                if (clave) {
                    $("#alertBusqueda").html(``);
                    cargando();
                    if (sessionStorage.getItem("accion").includes("Editar")) {
                        miembrosAcademia(clave.clave_academia)
                            .then(m => {
                                cargarMiembros(m);
                                getPlanesEdit(clave.clave_academia)
                                    .then(t => {
                                        reset();
                                        listaPlanes = t;
                                        construirPlanes();
                                        cerrarM.load = true;
                                        cerrarModal();
                                    })
                                    .catch(e => {
                                        if (e.responseText == "Solicitar Reinicio de sesion") {
                                            cerrarM.load = true;
                                            cerrarModal();
                                            login();
                                        }
                                        console.log(e);
                                    })
                            })
                            .catch(e => {
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                }
                            })
                    } else {
                        datosAcademias(clave.clave_academia)
                            .then(t => {
                                miembrosAcademia(clave.clave_academia)
                                    .then(s => {
                                        cargarMiembros(s);
                                        $("#nameAcademia")[0].value = t.Academia;
                                        $("#namePresidente")[0].value = t.nombre;
                                        Plan["datos"]["claveAcademia"] = t.clave_academia;
                                        Plan["datos"]["academia"] = t.Academia;
                                        Plan["datos"]["presidente"] = t.nombre;
                                        Plan["datos"]["coordinador"] = t.Coordinador;
                                        Plan["datos"]["jefe"] = t.Coordinador;
                                        Plan["datos"]["semestre"] = calcularSemestre();
                                        cerrarM.load = true;
                                        cerrarModal();
                                        seleccionada = true;
                                    })
                                    .catch(e => {
                                        if (e.responseText == "Solicitar Reinicio de sesion") {
                                            cerrarM.load = true;
                                            cerrarModal();
                                            login();
                                        }
                                    })
                            })
                            .catch(e => {
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                } else {
                                    window.location = "/Academias/Panel.html";
                                }
                            });
                    }
                } else {
                    $("#alertBusqueda").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontro la academia seleccioanda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        }
    });

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                validarPagina()
                    .then(() => {
                        crearMigaja();
                        getMisAcademias()
                            .then(A => {
                                academias = A;
                                construirBusqueda();
                                if (sessionStorage.getItem("accion").includes("Editar")) {
                                    cerrarM.load = true;
                                    cerrarM.login = true;
                                    cerrarModal();
                                } else {
                                    $("#buscarPlan").remove();
                                    cerrarM.load = true;
                                    cerrarM.login = true;
                                    cerrarModal();
                                }
                            }).catch(e => {
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                } else {
                                    cerrarM.load = true;
                                    cerrarM.login = true;
                                    cerrarModal();
                                }
                            })
                    })
                    .catch((e) => {
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        } else {
                            window.location = "/Academias/Panel.html";
                        }
                    });
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                } else {
                    cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
                }
            });
    };

    const calcularSemestre = () => {
        let date = new Date();
        if (date.getMonth() >= 0 && date.getMonth() < 6)
            return `Ene - May ${date.getFullYear()}`;
        else
            return `Ago - Dic ${date.getFullYear()}`;
    };

    const aplicarFiltro = () => {
        let final = "";
        miembrosTotal.forEach(m => {
            let e = responsableAux.find(a => parseInt(a.nomina) == parseInt(m.nomina));
            if (!e) final += `<option value="${m.nomina} - ${m.nombre}">`;
        });
        $("#busqueda_1_lista").html(final);
        actualizarLista();
    };

    const actualizarLista = () => {
        let final = $("#agregados")[0];
        final.innerHTML = "";
        responsableAux.forEach(m => {
            final.innerHTML += `<li>
                <div class="row">
                    <div class="col-8">
                        ${m.nomina} - ${m.nombre}
                    </div>
                    <div class="col-4 align-self-center">
                        <span class="ml-auto">
                            <i name="remover" id="remover-${m.nomina}" class="click fas fa-user-minus"></i>
                        </span>
                    </div>
                </div>
            </li>`
        });
        $(`i[name="remover"]`).click(evt => {
            let id = parseInt(evt.target.attributes.id.value.split('-')[1]);
            let f = false;
            for (let i = 0; i < responsableAux.length && !f; i++) {
                if (id == parseInt(responsableAux[i].nomina)) {
                    f = true;
                    let j = responsableAux.indexOf(responsableAux[i]);
                    if (j !== -1) responsableAux.splice(j, 1);
                }
            }
            aplicarFiltro();
        });
    };

    $("i[name='pasarALista']").click(evt => {
        if (seleccionada) {
            let busqueda = $("#busqueda_1")[0];
            let nuevo = busqueda.value.split(" - ");
            if (nuevo.length > 1) {
                responsableAux.push({
                    "nomina": nuevo[0],
                    "nombre": nuevo[1]
                });
                busqueda.value = "";
                aplicarFiltro();
            } else {
                $("#alerResponsable").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Debe de ser en formato Nómina - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    $("#busqueda_1").keypress(key => {
        if (key.which == 13) {
            if (seleccionada) {
                let busqueda = $("#busqueda_1")[0];
                let nuevo = busqueda.value.split(" - ");
                if (nuevo.length > 1) {
                    responsableAux.push({
                        "nomina": nuevo[0],
                        "nombre": nuevo[1]
                    });
                    busqueda.value = "";
                    aplicarFiltro();
                } else {
                    $("#alerResponsable").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Debe de ser en formato Nómina - Nombre</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        }
    });

    $("#nameSemestre")[0].value = calcularSemestre();

    $('div[name="evaluacion"]').click(evt => {
        if (seleccionada) {
            let text = "";
            if (evt.target.nodeName != "DIV" || !evt.target.attributes.id) {
                idText = evt.delegateTarget.attributes.id.value;
                text = evt.delegateTarget.innerHTML;
            }
            if (evt.target.nodeName == "DIV" && evt.target.attributes.id) {
                text = evt.target.innerHTML;
                idText = evt.target.attributes.id.value;
            }
            CKEDITOR.instances.ev.setData(text);
            $("#tituloModal")[0].innerText = `${idText}`;
            $("#editor").modal('show');
        } else {
            if (sessionStorage.getItem("accion").includes("Editar")) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione un plan a modificar</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione una academia</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    $("#cancelarEvaluacion").click(evt => {
        if (seleccionada) {
            idText = undefined;
            CKEDITOR.instances.ev.setData("");
        }
    });

    $("#aplicarEvaluacion").click(evt => {
        if (seleccionada) {
            let value = CKEDITOR.instances.ev.getData();
            let act = idText.split("_");
            let campo = $(`#${idText}`)[0];
            campo.innerHTML = value;
            campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "text-justify");
            Plan[act[1]][act[0]] = value;
        }
        $("#editor").modal('hide');
    });

    $('div[name="ResponsablesA"]').click(evt => {
        if (seleccionada) {
            if (evt.target.nodeName != "DIV" || !evt.target.attributes.id) {
                idText = evt.delegateTarget.attributes.id.value;
            }
            if (evt.target.nodeName == "DIV" && evt.target.attributes.id) {
                idText = evt.target.attributes.id.value;
            }
            $("#tituloModalR")[0].innerText = `${idText}`;
            $("#agregados").html("");
            let act = idText.split("_");
            responsableAux = [];
            Plan[act[1]][act[0]].forEach(p => responsableAux.push(p));
            aplicarFiltro();
            $("#responsablesModal").modal('show');
        } else {
            if (sessionStorage.getItem("accion").includes("Editar")) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione un plan a modificar</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione una academia</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    $("#aplicarResponsables").click(() => {
        if (seleccionada) {
            let act = idText.split("_");
            let campo = $(`#${idText}`)[0];
            let value = `<ul>${$("#agregados").html()}</ul>`;
            campo.innerHTML = value;
            campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
            Plan[act[1]][act[0]] = responsableAux;
        }
        $("#responsablesModal").modal('hide');
    });

    CKEDITOR.replace('ev');

    $('input[name="fecha"]').change(evt => {
        if (seleccionada) {
            let act = evt.target.attributes.id.value.split("_");
            Plan[act[1]][act[0]] = evt.target.value.replace("T", " ");
        }
    });

    $('[name="fechas"]').change(evt => {
        if (seleccionada) {
            let id = evt.target.attributes.id.value;
            let data = evt.target.value;
            Plan["fechas"][id] = data.replace("T", " ");
        }
    });

    $("#TodosLosDocentes").click(() => {
        if (seleccionada) {
            miembrosTotal.forEach(mt => {
                responsableAux.push(mt);
            });
            aplicarFiltro();
            let act = idText.split("_");
            let campo = $(`#${idText}`)[0];
            let value = `<ul>${$("#agregados").html()}</ul>`;
            campo.innerHTML = value;
            campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
            Plan[act[1]][act[0]] = responsableAux;
        }
        $("#responsablesModal").modal('hide');
    });

    const crearPDF = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/CrearPlanTrabajoPDF.php",
                type: "post",
                data: { data: Plan, temp: preview },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getFecha = date => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${Plan["datos"]["academia"]} ${Plan["datos"]["semestre"]}`;

    const getPuntos = () => {
        for (let i = 1; i < 10; i++) {
            let text = Plan[i].Evidencia;
            Plan[i].tareas = [];
            text = text.replace("<ul>", "").replace("</ul>\n", "");
            let re = new RegExp('<li>');
            let lista = text.split(re);
            for (let j = 0; j < lista.length; j++) {
                let dato = lista[j];
                if (dato.includes('</li>')) {
                    dato = dato.replace('</li>\n', '').replace('</li>', '');
                    dato = dato.replace("</ol>\n", "").replace("\t", "");
                    Plan[i].tareas.push(dato);
                }
            }
        }
    };

    $("input[name='Crear']").click(() => {
        if (seleccionada) {
            cargando();
            if (sessionStorage.getItem("accion").includes("Editar")) {
                Plan["fechaG"] = planEdit["fechaG"];
                Plan["fecha"] = planEdit["fecha"];
                Plan["editar"] = 1;
                Plan["id"] = $("#planSeleccionado").val().split(" - ")[0];
            } else {
                let date = new Date();
                Plan["fechaG"] = getFecha(date);
                Plan["fecha"] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                Plan["editar"] = 0;
            }
            Plan["preview"] = 0;
            console.log(Plan);
            getPuntos();
            crearPDF()
                .then(t => {
                    cerrarM.load = true;
                    cerrarModal();
                    window.open(t.ruta);
                })
                .catch(e => {
                    console.log(e);
                    cerrarM.load = true;
                    cerrarModal();
                    if (e.responseText == "Solicitar Reinicio de sesion") {
                        cerrarM.load = true;
                        cerrarModal();
                        login();
                    }
                });
        } else {
            if (sessionStorage.getItem("accion").includes("Editar")) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione el plan a modificar</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione una academia</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    $("input[name='preview']").click(() => {
        if (seleccionada) {
            cargando();
            if (sessionStorage.getItem("accion").includes("Editar")) {
                Plan["fechaG"] = planEdit["fechaG"];
                Plan["fecha"] = planEdit["fecha"];
            } else {
                let date = new Date();
                Plan["fechaG"] = getFecha(date);
                Plan["fecha"] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            }
            Plan["preview"] = 1;
            preview.push(Plan["fechaG"]);
            crearPDF()
                .then(t => {
                    cerrarM.load = true;
                    cerrarModal();
                    window.open(t.ruta);
                })
                .catch(e => {
                    cerrarM.load = true;
                    cerrarModal();
                    if (e.responseText == "Solicitar Reinicio de sesion") {
                        cerrarM.load = true;
                        cerrarModal();
                        login();
                    }
                });
        } else {
            if (sessionStorage.getItem("accion").includes("Editar")) {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione el plan a modificar</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">Seleccione una academia</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    $("#inicio").click(() => window.location = "/academias/panel.html");

    load();

    const reset = () => {
        seleccionada = false;
        $("#planSeleccionado")[0].value = "";
        $("#nameAcademia")[0].value = "";
        $("#namePresidente")[0].value = "";
        $("#nameSemestre")[0].value = "";

        let camposFechas = ["fecha_1", "fecha_2", "fecha_3", "fecha_4"];
        for (let i = 0; i < camposFechas.length; i++) {
            $(`#${camposFechas[i]}`)[0].value = "";
        }

        let campos = ["Acciones", "Asignaturas", "Evidencia"];
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < campos.length; j++) {
                $(`#${campos[j]}_${i}`).html("");
            }
        }

        for (let i = 1; i < 10; i++) {
            $(`#Responsables_${i}`).html("");
        }
    };

});