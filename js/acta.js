$(document).ready(() => {

    $("#inicio").click(() => (window.location = "/academias/panel.html"));

    $("#ayudaActa").click(() => {
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
                                    Para la búsqueda de actas:
                                    <ul>
                                        <li>
                                            Se debe seleccionar su academia correspondiente en formato <b>Clave - Nombre</b>.
                                        </li>
                                        <li>
                                            Si se ingresa la información de forma distinta al formato, aparecerá el mensaje de
                                            error <b> "Debe
                                                de ser en formato Clave - Nombre"</b>.
                                        </li>
                                        <li>
                                            Si no se ingresa ninguna academia, aparecerá el mensaje de error <b>"Seleccione una
                                                academia"</b> al seleccionar otros botones.
                                        </li>
                                        <li>
                                            Ingresada la información presione el botón <b>"enter"</b>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Para ingresar datos iniciales de acta:
                                    <ul>
                                        <li>
                                            En los espacios en los que aparezca en ícono <img src="img/Reloj.JPG"> presione para
                                            seleccionar hora y minutos.
                                        </li>
                                        <li>
                                            En los espacios en los que se tenga que ingresar números aparecerá el icono <img
                                                src="img/numero.png">, presione las flechas, ya sea para aumentar o disminuir el
                                            número, o puede ingresarlo desde su teclado.
                                        </li>
                                        <li>
                                            Ingrese desde su teclado en los espacios en los que se le solicite llenar
                                            información.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Para ingresar información en orden del día:
                                    <ul>
                                        <li>
                                            aparecerá el siguiente formato:
                                        </li>
                                        <img src="img/formatollenable.png" style="width: 300px;">
                                        <li>
                                            Escriba los datos correspondientes en el recuadro
                                        </li>
                                        <li>
                                            Para más personalización puede seleccionar los iconos de la parte superior del
                                            recuadro.
                                        </li>
                                        <li>
                                            Si desea cancelar el tecleado de información seleccione el botón <b>"cancelar"</b>.
                                        </li>
                                        <li>
                                            Si desea guardar la información tecleada seleccione el botón <b>"aplicar"</b>.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Para acuerdos de reunión:
                                    <ul>
                                        <li>
                                            Para agregar un nuevo espacio de registro de acuerdo de reunión presione el botón
                                            <b>"Agregar"</b>
                                        </li>
                                        <li>
                                            Para borrar el espacio de registro de acuerdo de reunión presione el ícono <img
                                                src="img/iconoborrar.JPG">
                                        </li>
                                        <li>
                                            Para ingresar información en la sección <b>"Acuerdo"</b> ,al seleccionar el apartado
                                            aparecerá un formato de rellenado, escriba los datos correspondientes en el recuadro
                                            donde aparece el mensaje <b>"click para editar"</b>.
                                        </li>
                                        <li>
                                            Para más personalización puede seleccionar los iconos de la parte superior del
                                            recuadro.
                                        </li>
                                        <li>
                                            Si desea cancelar el tecleado de información seleccione el botón <b>"cancelar"</b>.
                                        </li>
                                        <li>
                                            Si desea guardar la información tecleada seleccione el botón <b>"aplicar"</b>.
                                        </li>
                                        <li>
                                            En la sección <b>"responsable"</b> seleccione el texto <b>"click para editar"</b> y
                                            aparecerá el siguiente recuadro:
                                        </li>
                                        <img src="img/cuadroresp.JPG" style="width: 300px;">
                                        <li>
                                            Para agregar a un responsable, dé click en la sección "Nómina/Nombre" y elija una de
                                            las opciones o ingrese los datos con el formato solicidado, después presione el
                                            botón
                                            <i class="fas fa-plus-circle click" aria-hidden="true"></i> o pulse <b>enter</b>.
                                        </li>
                                        <li>
                                            Si se ingresa la información de forma distinta al formato o no se selecciona a
                                            ningún responsable y se presiona el botón
                                            <i class="fas fa-plus-circle click" aria-hidden="true"></i> a parecerá el mensaje de
                                            error
                                            <b> "Debe de ser en formato Nómina - Nombre" </b>.
                                        </li>
                                        <li>
                                            Si se quiere eliminar a uno de los responsables seleccionados, dé click al icono <i
                                                class="click fas fa-user-minus" aria-hidden="true"></i>.
                                        </li>
                                        <li>
                                            Si se quiere agregar a todos los miembros que están registrados seleccione el botón
                                            <b>"todos"</b>.
                                        </li>
                                        <li>
                                            Para guardar a todos los responsables agregados seleccione el botón
                                            <b>"aplicar"</b>.
                                        </li>
                                        <li>
                                            Si se desea cancelar toda la elección de responsables, seleccione el botón
                                            <b>"cancelar"</b>.
                                        </li>
                                        <li> En la sección <b>"Fecha de cumplimiento"</b> seleccione el ícono <img
                                                src="img/iconocalen.JPG"> y aparecerá el siguiente recuadro: <img
                                                src="img/calendario.png">
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
                                        <li>
                                            Para ingresar la fecha de término de reunión precione el ícono <img
                                                src="img/Reloj.JPG"> y seleccione hora y minutos correspodientes.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Para la sección Constancia de aprobación:
                                    <ul>
                                        <li>
                                            Para agregar información en el apartado "Observaciones"
                                        </li>
                                        <li>
                                            aparecerá el siguiente formato:
                                        </li>
                                        <img src="img/formatollenable.png" style="width: 300px;">
                                        <li>
                                            Escriba los datos correspondientes en el recuadro
                                        </li>
                                        <li>
                                            Para más personalización puede seleccionar los iconos de la parte superior del
                                            recuadro.
                                        </li>
                                        <li>
                                            Si desea cancelar el tecleado de información seleccione el botón <b>"cancelar"</b>.
                                        </li>
                                        <li>
                                            Si desea guardar la información tecleada seleccione el botón <b>"aplicar"</b>.
                                        </li>
                                        <li>
                                            Al seleccionar la opción <b>"Vista previa"</b> no se guardará el documento , solo se
                                            mostrará el plan de trabajo en formato PDF con la información que se haya ingresado.
                                        </li>
                                        <li>
                                            Al seleccionar la opción <b>"Generar PDF"</b> se guardará el documento en la base de
                                            datos y se mostrará el acta en formato PDF con la información que se haya ingresado.
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
        $("#modal").modal();

        $("#cerrarAyuda").click(() => {
            $("#modal").modal("hide");
            $(`[class="modal-backdrop show"]`).remove();
        });
    });

    const Acta = {
        "No:": 1, //Ok
        "DatosA": { //Ok
            "Academia": "",
            "Presidente": "",
            "Sec": ""
        },
        "datosG": {
            "horaI": "",
            "horaF": "",
            "Dia": "",
            "Mes": "",
            "Año": "",
            "Lugar": "",
            "Orden": "",
            "Obs": ""
        },
        "Acuerdos": [],
        "Docentes": [] //Oc
    };

    var miembrosTotal = []

    CKEDITOR.replace('orden');

    CKEDITOR.replace('obs');

    CKEDITOR.replace('ev');

    let acuerdos = [];

    let listaActas = [];

    var cerrarM = {
        load: false,
        login: false
    };

    const cerrarModal = () => {
        $("#modal").modal('hide');
        $(`[class="modal-backdrop show"]`).remove();
    };

    const cargando = (cerrar) => {
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

        if (!cerrar) {
            $('#modal').on('hidden.bs.modal', () => {
                if (!cerrarM.load) $("#modal").modal();
            });
        }

    };

    const login = () => {
        cerrarM.login = false;
        $("#modales").html(`
            <div class="modal" id="modal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header d-flex justify-content-center h4">
                            <label>Se ha cerrado la sesión por inactividad, por favor ingrese sus credenciales</label>
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

        $("#logearme").click(async () => {
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
        removerGuardados($("#listaAcademias")[0]);
        $("#listaAcademias").html(r);
    };

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

    const getMateriasDocente = nomina => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/getMateriasDocente.php",
                type: "post",
                data: {
                    nomina: nomina
                },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const filtroMaterias = nomina => {
        let mat = Acta["Docentes"].find(d => d.nomina === nomina);
        if (mat) {
            let r = "";
            for (let i = 0; i < mat['materias'].length; i++) {
                r += `<li>${mat["materias"][i]["materia"]}</li>`;
            }
            return r;
        }
        return "";
    };

    const asist = (nomina, c1, c2, c3) => {
        $(`#${c1}_${nomina}`).attr('style', 'color:green;');
        $(`#${c2}_${nomina}`).attr('style', 'color:black;');
        $(`#${c3}_${nomina}`).attr('style', 'color:black;');
    };

    const asistencia = () => {
        let f = "";
        $("#asistencia").html("");
        for (let i = 0; i < miembrosTotal.length; i++) {

            f += `
                <div class="row mb-2">
                    <div class="col-4 border border-dark acuerdo">
                        <div class="w-100 h-100">${miembrosTotal[i].nombre}</div>
                    </div>
                    <div class="col-4 border border-dark acuerdo">
                        <ul>
                            ${filtroMaterias(miembrosTotal[i].nomina)}
                        </ul>
                    </div>
                    <div class="col-4 border border-dark acuerdo">
                        <div class="d-flex flex-column mt-2 mb-2 justify-content-center align-items-center">
                            <input name="asiste" id="AS_${miembrosTotal[i].nomina}" type="button" value="Asistio" class="bg-input bg-btn-aplicar hover">
                            <input name="falta" type="button" id="NS_${miembrosTotal[i].nomina}" value="No asistio" class="bg-input bg-btn-aplicar mt-2 mb-2 hover">
                            <input name="justificado" type="button" id="JS_${miembrosTotal[i].nomina}" value="Justificado" class="bg-input bg-btn-aplicar hover">
                        </div>
                    </div>
                </div>
            `;
        }
        $("#asistencia").html(f);
        $("[name='asiste']").click(evt => {
            let nomina = evt.target.attributes.id.value.split("_")[1];
            asist(nomina, 'AS', 'NS', 'JS');
            let f = Acta.Docentes.find(f => f.nomina == nomina);
            if (f) {
                f.estado = 1;
            }
        });
        $("[name='falta']").click(evt => {
            let nomina = evt.target.attributes.id.value.split("_")[1];
            asist(nomina, 'NS', 'AS', 'JS');
            let f = Acta.Docentes.find(f => f.nomina == nomina);
            if (f) {
                f.estado = -1;
            }
        });
        $("[name='justificado']").click(evt => {
            let nomina = evt.target.attributes.id.value.split("_")[1];
            asist(nomina, 'JS', 'AS', 'NS');
            let f = Acta.Docentes.find(f => f.nomina == nomina);
            if (f) {
                f.estado = 0;
            }
        });
    }

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
                                    removerGuardados($("#listaDeActas")[0]);
                                } else {
                                    $("#anteriores").html("");
                                    $("#buscarActa").remove();
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
                        console.log(e);
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

    $("#nuevoAcuerdo").click(evt => {
        acuerdos.push({
            baja: false,
            responsables: [],
            fecha: "",
            limite: 0
        });
        let id = acuerdos.length;
        $("#acuerdos")[0].innerHTML += `
            <div class="row mb-2" id="padre_${id}">
                <div class="col-6 acuerdo border border-dark">
                    <div class="row h-100">
                        <div class="col-1 d-flex align-items-center border border-dark">
                            <span>
                                <i name="basura" id="T_${id}" class="fas fa-trash click"></i>
                            </span>
                        </div>
                        <div name="acuerdo" id="A_${id}" class="col-11 d-flex justify-content-center align-items-center click">
                            click para editar
                        </div>
                    </div>
                </div>
                <div name="responsables" id="R_${id}" class="col-4 acuerdo border border-dark d-flex justify-content-center align-items-center click">
                    click para editar
                </div>
                <div class="col-2 acuerdo border border-dark">
                    <input name="fecha_C" id="F_${id}" type="datetime-local" class="form-control bg-input mt-2">
                </div>
            </div>
        `;
        $("[name='fecha_C']").change(evt => {
            let id = parseInt(evt.target.attributes.id.value.split("_")[1]) - 1;
            let value = (evt.target.value);
            acuerdos[id].fecha = value;
        });
        $("[name='basura']").click(evt => {
            let id = parseInt(evt.target.attributes.id.value.split("_")[1]);
            $(`#padre_${id}`).remove();
            acuerdos[(id - 1)].baja = true;
        });
        $(`[name="acuerdo"]`).click(evt => {
            let value;
            if (evt.target.nodeName != 'DIV') {
                value = evt.delegateTarget.attributes.id.value;
            } else {
                value = evt.target.attributes.id.value;
            }
            let id = parseInt(value.split("_")[1]);
            CKEDITOR.instances.ev.setData($(`#A_${id}`).html());
            $("#tituloModal").html(value);
            $("#editor").modal();
        });
        $(`[name="responsables"]`).click(evt => {
            let id;
            if (evt.target.nodeName != "DIV" || !evt.target.attributes.id) {
                id = evt.delegateTarget.attributes.id.value;
            }
            if (evt.target.nodeName == "DIV" && evt.target.attributes.id) {
                id = evt.target.attributes.id.value;
            }
            filtroM((parseInt(id.split("_")[1]) - 1));
            CKEDITOR.instances.ev.setData($(`#R_${id}`).html());
            $("#tituloModalR").html(id);
            $("#responsablesModal").modal();
        });
    });

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

    const cargarMiembros = (data) => {
        let final = "";
        miembrosTotal = [];
        data.forEach((d) => {
            miembrosTotal.push(d);
            final += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        asistencia();
        removerGuardados($("#busqueda_1_lista")[0]);
        $("#busqueda_1_lista").html(final);
    };

    const filtroM = id => {
        let aux = acuerdos[id].responsables || [];
        let final = "";
        miembrosTotal.forEach(mt => {
            let e = aux.find(a => parseInt(a.nomina) == parseInt(mt.nomina));
            if (!e) final += `<option value="${mt.nomina} - ${mt.nombre}">`;
        });
        $("#busqueda_1_lista").html(final);
        actualizarLista(id);
    };

    const actualizarLista = id => {
        let final = $("#agregados")[0];
        final.innerHTML = "";
        acuerdos[id].responsables.forEach(m => {
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
            let idActa = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
            let id = parseInt(evt.target.attributes.id.value.split('-')[1]);
            let f = false;
            for (let i = 0; i < acuerdos[idActa].responsables.length && !f; i++) {
                if (id == parseInt(acuerdos[idActa].responsables[i].nomina)) {
                    f = true;
                    let j = acuerdos[idActa].responsables.indexOf(acuerdos[idActa].responsables[i]);
                    if (j !== -1) acuerdos[idActa].responsables.splice(j, 1);
                }
            }
            filtroM(idActa);
        });
    };

    $("i[name='pasarALista']").click(evt => {
        let busqueda = $("#busqueda_1")[0];
        let nuevo = busqueda.value.split(" - ");
        let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
        if (nuevo.length > 1) {
            acuerdos[id].responsables.push({
                "nomina": nuevo[0],
                "nombre": nuevo[1]
            });
            busqueda.value = "";
            filtroM(id);
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
    });

    $("#busqueda_1").keypress(key => {
        if (key.which == 13) {
            let busqueda = $("#busqueda_1")[0];
            let nuevo = busqueda.value.split(" - ");
            let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
            if (nuevo.length > 1) {
                acuerdos[id].responsables.push({
                    "nomina": nuevo[0],
                    "nombre": nuevo[1]
                });
                busqueda.value = "";
                filtroM(id);
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

    const cargarMaterias = m => {
        return new Promise(async (resolve, reject) => {
            Acta["Docentes"] = [];
            for (let i = 0; i < m.length; i++) {
                await getMateriasDocente(m[i].nomina)
                    .then(mat => {
                        Acta["Docentes"].push({
                            "nombre": m[i].nombre,
                            "nomina": m[i].nomina,
                            "materias": mat,
                            "estado": 0
                        });
                    })
            }
            resolve();
        });
    };

    const getActasEdit = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/editarActa.php",
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

    const construirActas = () => {
        let r = "";
        for (let i = 0; i < listaActas.length; i++) {
            r += `<option value="${listaActas[i].id_acta} - ${listaActas[i].fecha.date}">`;
        }
        $("#listaDeActas").html(r);
    };

    const leer = ruta => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/leerActa.php",
                type: "POST",
                dataType: "json",
                data: {
                    ruta: ruta
                },
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const armarAnt = () => {
        let html = `
        <div class="mt-2 font-weight-bold text-center h2">SEGUIMIENTO DE ACUERDOS ANTERIORES</div>
            <div class="ml-3 mr-3 mt-3 mb-3">
                <div class="row">
                    <div class="col-3 bg-input text-center h4 font-weight-bold border border-dark">
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">ACUERDO</div>
                    </div>
                    <div class="col-3 bg-input text-center h4 font-weight-bold border border-dark">
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">RESPONSABLE</div>
                    </div>
                    <div class="col-3 bg-input text-center h4 font-weight-bold border border-dark">
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">FECHA DE CUMPLIMIENTO
                        </div>
                    </div>
                    <div class="col-3 bg-input text-center h4 font-weight-bold border border-dark">
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">AVANCE</div>
                    </div>
        `;
        let ant;
        if (Acta['Acuerdos']){
            ant = Acta['Acuerdos'].filter(act => act.ant == 1);
        }
        if (ant) {
            for (let i = 0; i < ant.length; i++) {
                let acu = ant[i].acuerdo;
                let resp = "";
                if (ant[i].responsables) {
                    for (let j = 0; j < ant[i].responsables.length; j++) {
                        let na = ant[i].responsables[j].nombre;
                        resp = `${resp}<li>${na}</li>`;
                    }
                }
                html = `${html}
                    <div class="col-3 bg-input border border-dark acuerdo">
                        <div class="text-justify">
                            ${acu}
                        </div>
                    </div>
                    <div class="col-3 bg-input border border-dark acuerdo">
                        <div class="text-justify">
                            <ul>
                                ${resp}
                            </ul>
                        </div>
                    </div>
                    <div class="col-3 bg-input border border-dark acuerdo">
                        <div class="text-justify">
                            ${ant[i].fecha.replace("T", " ")}
                        </div>
                    </div>
                    <div class="col-3 bg-input border border-dark acuerdo">
                        <div class="text-justify">
                            ${ant[i].Av || 0}%
                        </div>
                    </div>
                `;
            }
        }
        html = `${html}</div></div>`;
        $("#anteriores").html(html);
    }

    $("#actaSeleccionada").keypress(k => {
        if (k.which == 13) {
            cargando();
            let acta = listaActas.find(f => f.id_acta == parseInt(k.target.value.split(" - ")[0]));
            if (acta) {
                leer(acta.localizacionJson)
                    .then(t => {
                        let no = parseInt(t.No) + 1;
                        Acta['No'] = no;
                        Acta['id'] = acta.id_acta;
                        Acta['ant'] = t.ant;
                        Acta['fechaG'] = t.fechaG;
                        $("#NoActa")[0].value = no;
                        armarAnt();
                        cerrarM.load = true;
                        cerrarModal();
                        $("#alertBusqueda").html(``);
                    })
                    .catch(e => {
                        cerrarM.load = true;
                        cerrarModal();
                        console.log(e);
                        $("#alertBusqueda").html(`
                            <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                                <strong class="h1">No se encontró el acta, puede que se haya borrado del servidor</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    })
            } else {
                cerrarM.load = true;
                cerrarModal();
                $("#alertBusqueda").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">No se encontró el acta, puede que se haya borrado del servidor</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    const getActasAcemia = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/hay_actas.php',
                data: { clave: clave },
                type: 'POSt',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    $("#academiaSeleccionada2").keypress(async (k) => {
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
                        datosAcademias(clave.clave_academia)
                            .then(dt => {
                                let datos = [dt['Academia'], dt['nombre'], dt['Sec']];
                                Acta["DatosA"]["Clave"] = clave.clave_academia;
                                Acta["DatosA"]["Academia"] = datos[0];
                                Acta["DatosA"]["Presidente"] = datos[1];
                                Acta["DatosA"]["Sec"] = datos[2];
                                let campos = $('[name="attr"]');
                                for (let i = 0; i < datos.length; i++) {
                                    campos[i].value = datos[i];
                                }
                                miembrosAcademia(clave.clave_academia)
                                    .then(m => {
                                        cargarMaterias(m)
                                            .then(() => {
                                                cargarMiembros(m);
                                                getActasEdit(clave.clave_academia)
                                                    .then(t => {
                                                        listaActas = t;
                                                        construirActas();
                                                        cerrarM.load = true;
                                                        cerrarModal();
                                                    })
                                                    .catch(e => {
                                                        console.log(e);
                                                        if (e.responseText == "Solicitar Reinicio de sesion") {
                                                            cerrarM.load = true;
                                                            cerrarModal();
                                                            login();
                                                        }
                                                    })
                                                cerrarM.load = true;
                                                cerrarModal();
                                                seleccionada = true;
                                            })
                                    })
                                    .catch(e => {
                                        console.log(e);
                                        if (e.responseText == "Solicitar Reinicio de sesion") {
                                            cerrarM.load = true;
                                            cerrarModal();
                                            login();
                                        }
                                    })
                            })
                            .catch(e => {
                                console.log(e);
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                }
                            });
                    } else {
                        let acta;
                        await getActasAcemia(clave.clave_academia)
                            .then(data => acta = data)
                            .catch(e => console.log(e));
                        limit = acta.length;
                        if (limit > 0) {
                            datosAcademias(clave.clave_academia)
                                .then(dt => {
                                    Acta['nueva'] = 0;
                                    let datos = [dt['Academia'], dt['nombre'], dt['Sec']];
                                    Acta["DatosA"]["Clave"] = clave.clave_academia;
                                    Acta["DatosA"]["Academia"] = datos[0];
                                    Acta["DatosA"]["Presidente"] = datos[1];
                                    Acta["DatosA"]["Sec"] = datos[2];
                                    let campos = $('[name="attr"]');
                                    for (let i = 0; i < datos.length; i++) {
                                        campos[i].value = datos[i];
                                    }
                                    miembrosAcademia(clave.clave_academia)
                                        .then(m => {
                                            cargarMaterias(m)
                                                .then(() => {
                                                    cargarMiembros(m);
                                                    leer(acta[limit-1].localizacionJson)
                                                        .then(t => {
                                                            let no = parseInt(t.No) + 1;
                                                            Acta['No'] = no;
                                                            Acta['id'] = acta[limit-1].id_acta;
                                                            Acta['ant'] = t.ant;
                                                            Acta['fechaG'] = t.fechaG;
                                                            Acta['fecha'] = t.fecha;
                                                            Acta["Sem"] = calcularSemestre();
                                                            Acta['Acuerdos'] = t.Acuerdos;
                                                            $("#NoActa")[0].value = no;
                                                            armarAnt();
                                                            cerrarM.load = true;
                                                            cerrarModal();
                                                            $("#alertBusqueda").html(``);
                                                        })
                                                        .catch(e => {
                                                            cerrarM.load = true;
                                                            cerrarModal();
                                                            console.log(e);
                                                            $("#alertBusqueda").html(`
                                                                <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                                                                    <strong class="h1">No se encontró el acta, puede que se haya borrado del servidor</strong>
                                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                            `);
                                                        });
                                                    cerrarM.load = true;
                                                    cerrarModal();
                                                    seleccionada = true;
                                                })
                                        })
                                        .catch(e => {
                                            console.log(e);
                                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                                cerrarM.load = true;
                                                cerrarModal();
                                                login();
                                            }
                                        })
                                })
                                .catch(e => {
                                    console.log(e);
                                    if (e.responseText == "Solicitar Reinicio de sesion") {
                                        cerrarM.load = true;
                                        cerrarModal();
                                        login();
                                    }
                                });
                        }
                        else {
                            Acta['nueva'] = 1;
                            datosAcademias(clave.clave_academia)
                                .then(dt => {
                                    $("#NoActa")[0].value = 1;
                                    let datos = [dt['Academia'], dt['nombre'], dt['Sec']];
                                    Acta["DatosA"]["Clave"] = clave.clave_academia;
                                    Acta["DatosA"]["Academia"] = datos[0];
                                    Acta["DatosA"]["Presidente"] = datos[1];
                                    Acta["DatosA"]["Sec"] = datos[2];
                                    Acta["No"] = 1;
                                    let date = new Date();
                                    Acta["Sem"] = calcularSemestre();
                                    Acta["fecha"] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                                    Acta["fechaG"] = getFecha(date);
                                    let campos = $('[name="attr"]');
                                    for (let i = 0; i < datos.length; i++) {
                                        campos[i].value = datos[i];
                                    }
                                    miembrosAcademia(clave.clave_academia)
                                        .then(m => {
                                            cargarMaterias(m)
                                                .then(() => {
                                                    cargarMiembros(m);
                                                    cerrarM.load = true;
                                                    cerrarModal();
                                                    seleccionada = true;
                                                })
                                        })
                                        .catch(e => {
                                            console.log(e);
                                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                                cerrarM.load = true;
                                                cerrarModal();
                                                login();
                                            }
                                        })
                                })
                                .catch(e => {
                                    console.log(e);
                                    if (e.responseText == "Solicitar Reinicio de sesion") {
                                        cerrarM.load = true;
                                        cerrarModal();
                                        login();
                                    }
                                });
                        }
                    }
                } else {
                    $("#alertBusqueda").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontró la academia seleccioanda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        }
    });

    $("#aplicarEvaluacion").click(evt => {
        let id = $("#tituloModal").html();
        let pos = parseInt(id.split("_")[1]) - 1;
        let value = CKEDITOR.instances.ev.getData();
        let campo = $(`#${id}`)[0];
        campo.innerHTML = value;
        acuerdos[pos].acuerdo = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "text-justify");
        $("#editor").modal('hide');
    });

    $("#TodosLosDocentes").click(() => {
        let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
        miembrosTotal.forEach(mt => {
            let f = acuerdos[id].responsables.find(f => f.nomina == mt.nomina);
            if (!f)
                acuerdos[id].responsables.push(mt);
        });
        filtroM(id);
        let campo = $(`#R_${(id + 1)}`)[0];
        let value = `<ul>${$("#agregados").html()}</ul>`;
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
        $("#responsablesModal").modal('hide');
    });

    $("#aplicarResponsables").click(() => {
        let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
        let campo = $(`#R_${(id + 1)}`)[0];
        let value = `<ul>${$("#agregados").html()}</ul>`;
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
        $("#responsablesModal").modal('hide');
    });

    $("#Cerrar").click(() => {
        cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
    });

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

    const getPuntos = (text, tareas) => {
        if (text) {
            text = text.replace("<ul>", "").replace("</ul>\n", "");
            let re = new RegExp('<li>');
            let lista = text.split(re);
            for (let j = 0; j < lista.length; j++) {
                let dato = lista[j];
                if (dato.includes('</li>')) {
                    dato = dato.replace('</li>\n', '').replace('</li>', '');
                    dato = dato.replace("</ol>\n", "").replace("\t", "");
                    tareas.push(dato);
                }
            }
        }
    };

    const crearActa = acta => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/CrearActa.php",
                type: "POST",
                data: { acta: acta },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getFecha = date => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${Acta["DatosA"]["Academia"]} ${Acta["Sem"]}`;

    const calcularSemestre = () => {
        let date = new Date();
        if (date.getMonth() >= 0 && date.getMonth() < 6)
            return `Ene - May ${date.getFullYear()}`;
        else
            return `Ago - Dic ${date.getFullYear()}`;
    };

    $('[name="Crear"]').click(evt => {
        cargando();
        let datos = $('input[name="datosG"]');
        let keys = ["horaI", "Dia", "Mes", "Año", "Lugar", "horaF"];
        for (let i = 0; i < keys.length; i++) {
            Acta["datosG"][keys[i]] = datos[i].value;
        }
        Acta["datosG"]["Orden"] = CKEDITOR.instances.orden.getData();
        Acta["datosG"]["Obs"] = CKEDITOR.instances.obs.getData();
        Acta['vP'] = 0;
        let acuerdosTemp = acuerdos.filter(f => !f.baja);
        acuerdosTemp.forEach(a => {
            a.tareas = [];
            getPuntos(a.acuerdo, a.tareas);
            if (a.fecha.length > 0) {
                a.limite = 1;
            }
            a.ant = 0;
            if (!Acta.Acuerdos) Acta.Acuerdos = []
            Acta.Acuerdos.push(a);
        });
        crearActa(Acta)
            .then(t => {
                window.open(t.ruta);
                location.reload();
            })
            .catch(e => {
                console.log(e);
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
    });

    $("input[name='preview']").click(() => {
        Acta["Sem"] = calcularSemestre();
        let date = new Date();
        let datos = $('input[name="datosG"]');
        let keys = ["horaI", "Dia", "Mes", "Año", "Lugar", "horaF"];
        for (let i = 0; i < keys.length; i++) {
            Acta["datosG"][keys[i]] = datos[i].value;
        }
        Acta["datosG"]["Orden"] = CKEDITOR.instances.orden.getData();
        Acta["datosG"]["Obs"] = CKEDITOR.instances.obs.getData();
        Acta['vP'] = 1;
        Acta.Acuerdos = acuerdos.filter(f => !f.baja);
        Acta.Acuerdos.forEach(a => {
            a.tareas = [];
            getPuntos(a.acuerdo, a.tareas);
            if (a.fecha.length > 0) {
                a.limite = 1;
            }
        });
        crearActa(Acta)
            .then(t => {
                window.open(t.ruta);
            })
            .catch(e => {
                console.log(e);
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            })
    });

    load();

});