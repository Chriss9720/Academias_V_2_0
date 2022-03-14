$(document).ready(() => {

    const Plan = {
        "preview": true,
        "fecha": "",
        "fechaG": "",
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
            "Evidencia": ""
        },
        "2": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "3": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "4": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "5": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "6": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "7": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "8": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        },
        "9": {
            "Acciones": "",
            "Asignaturas": "",
            "Responsables": [],
            "fecha": "",
            "Evidencia": ""
        }
    };

    const miembrosTotal = []

    let responsableAux = [];

    let idText;

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

    var cerrarM = {
        load: false,
        login: false
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

            if (!validacionDeNoVacio(nomina)) return errorExacto({ campo: "nomina", desc: "Ingrese su nomina" });
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

            <li class="breadcrumb-item active">
                <label class="text-menu">
                    ${sessionStorage.getItem("Academia")}
                </label>
            </li>
        `);
    };

    const datosAcademias = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/datosAcademias.php",
                data: {
                    academia: sessionStorage.getItem('Academia')
                },
                type: "post",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const miembrosAcademia = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/miembrosAcademia.php",
                type: "POST",
                data: {
                    "Academia": sessionStorage.getItem('Academia')
                },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const cargarMiembros = data => {
        let final = "";
        data.forEach(d => {
            miembrosTotal.push(d);
            final += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        $("#busqueda_1_lista").html(final);
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                validarPagina()
                    .then(() => {
                        crearMigaja();
                        datosAcademias()
                            .then(t => {
                                miembrosAcademia()
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
                        cerrarM.load = true;
                        cerrarM.login = true;
                        cerrarModal();
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
                    <strong>Debe de ser en formato Nomina - Nombre</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        }

    });

    $("#nameSemestre")[0].value = calcularSemestre();

    $('div[name="evaluacion"]').click(evt => {
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
    });

    $("#cancelarEvaluacion").click(evt => {
        idText = undefined;
        CKEDITOR.instances.ev.setData("");
    });

    $("#aplicarEvaluacion").click(evt => {
        let value = CKEDITOR.instances.ev.getData();
        let act = idText.split("_");
        let campo = $(`#${idText}`)[0];
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "text-justify");
        Plan[act[1]][act[0]] = value;
        $("#editor").modal('hide');
    });

    $('div[name="ResponsablesA"]').click(evt => {
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
    });

    $("#aplicarResponsables").click(() => {
        let act = idText.split("_");
        let campo = $(`#${idText}`)[0];
        let value = `<ul>${$("#agregados").html()}</ul>`;
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
        Plan[act[1]][act[0]] = responsableAux;
        $("#responsablesModal").modal('hide');
    });

    CKEDITOR.replace('ev');

    $('input[name="fecha"]').change(evt => {
        let act = evt.target.attributes.id.value.split("_");
        Plan[act[1]][act[0]] = evt.target.value.replace("T", " ");
    });

    $('[name="fechas"]').change(evt => {
        let id = evt.target.attributes.id.value;
        let data = evt.target.value;
        Plan["fechas"][id] = data.replace("T", " ");
    });

    const crearPDF = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/CrearPlanTrabajoPDF.php",
                type: "post",
                data: { data: Plan },
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getFecha = date => `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${Plan["datos"]["academia"]} ${Plan["datos"]["semestre"]}`;

    $("input[name='Crear']").click(() => {
        cargando();
        let date = new Date();
        Plan["fechaG"] = getFecha(date);
        Plan["fecha"] = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        Plan["preview"] = 0;
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
    });

    $("input[name='preview']").click(() => {
        cargando();
        let date = new Date();
        Plan["fechaG"] = getFecha(date);
        Plan["fecha"] = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        Plan["preview"] = 1;
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
    });

    load();

});