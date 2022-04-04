$(document).ready(() => {

    $("#inicio").click(() => (window.location = "/academias/panel.html"));

    const miembrosTotal = []

    CKEDITOR.replace('orden');

    CKEDITOR.replace('obs');

    CKEDITOR.replace('ev');

    let acuerdos = [];

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

    const asistencia = () => {
        let f = "";
        for (let i = 0; i < miembrosTotal.length; i++) {
            f += `
                <div class="row mb-2">
                    <div class="col-4 border border-dark acuerdo">
                        <div class="w-100 h-100">${miembrosTotal[i].nombre}</div>
                    </div>
                    <div class="col-4 border border-dark acuerdo">
                        <ul>
                            <li>M1</li>
                            <li>M2</li>
                            <li>M3</li>
                        </ul>
                    </div>
                    <div class="col-4 border border-dark acuerdo">
                        <div class="d-flex flex-column mt-2 mb-2 justify-content-center align-items-center">
                            <input type="button" value="Asistio" class="bg-input bg-btn-aplicar hover">
                            <input type="button" value="No asistio" class="bg-input bg-btn-aplicar mt-2 mb-2 hover">
                            <input type="button" value="Justificado" class="bg-input bg-btn-aplicar hover">
                        </div>
                    </div>
                </div>
            `;
        }
        $("#asistencia").html(f);
    }

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
                                    $("#anteriores").html("");
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
            acuedo: "",
            responsables: [],
            fecha: ""
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
                    <input type="datetime-local" class="form-control bg-input mt-2">
                </div>
            </div>
        `;
        $("[name='basura']").click(evt => {
            let id = parseInt(evt.target.attributes.id.value.split("_")[1]);
            $(`#padre_${id}`).remove();
            acuerdos[(id - 1)].baja = true;
            console.log(acuerdos);
        });
        $(`[name="acuerdo"]`).click(evt => {
            CKEDITOR.instances.ev.setData($(`#A_${id}`).html());
            $("#tituloModal").html(evt.target.attributes.id.value);
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

    const cargarMiembros = data => {
        let final = "";
        data.forEach(d => {
            miembrosTotal.push(d);
            final += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        asistencia();
        $("#busqueda_1_lista").html(final);
    };

    const filtroM = id => {
        let aux = acuerdos[id].responsables || [];
        let final = "";
        miembrosTotal.forEach(mt => {
            let e = aux.find(a => parseInt(a.nomina) == parseInt(mt.nomina));
            if (!e) final += `<option value="${mt.nomina} - ${mt.nombre}">`;
        });
        console.log(miembrosTotal);
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

    $("#academiaSeleccionada2").keypress(k => {
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
                        miembrosAcademia(clave.clave_academia)
                            .then(s => {
                                cargarMiembros(s);
                                cerrarM.load = true;
                                cerrarModal();
                                seleccionada = true;
                            })
                            .catch(e => {
                                console.log(e);
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                }
                            })
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

    $("#aplicarEvaluacion").click(evt => {
        let id = $("#tituloModal").html();
        let value = CKEDITOR.instances.ev.getData();
        let campo = $(`#${id}`)[0];
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "text-justify");
        $("#editor").modal('hide');
    });

    $("#TodosLosDocentes").click(() => {
        let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
        miembrosTotal.forEach(mt => {
            acuerdos[id].responsables.push(mt);
        });
        filtroM(id);
        let campo = $(`#R_${(id+1)}`)[0];
        let value = `<ul>${$("#agregados").html()}</ul>`;
        campo.innerHTML = value;
        campo.className = campo.className.replace("d-flex justify-content-center align-items-center", "");
        $("#responsablesModal").modal('hide');
    });

    $("#aplicarResponsables").click(() => {
        let id = parseInt($("#tituloModalR").html().split("_")[1]) - 1;
        let campo = $(`#R_${(id+1)}`)[0];
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

    load();

});