$(document).ready(() => {

    var misDatos;
    var docentesCoordinador;
    var cerrarM = {
        load: false,
        login: false
    };

    const cerrarModal = () => {
        $("#modal").modal('hide');
    };

    const cargando = () => {
        cerrarM.load = false;
        $("#modales").html(
            `
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
            `
        );

        $("#modal").modal();

        $('#modal').on('hidden.bs.modal', () => {
            if (!cerrarM.load) $("#modal").modal();
        });
    };

    const login = () => {
        cerrarM.login = false;
        $("#modales").html(
            `
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Introduzca sus credenciales</label>
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
            `
        );

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

            login({ nomina: nomina, clave: clave })
                .then(t => load())
                .catch(c => error(c.msg))
        });

        const login = ({ nomina, clave }) => {
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


        $("#Salir").click(() => {
            cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
        });

        $("#modal").modal();

        $('#modal').on('hidden.bs.modal', () => {
            if (!cerrarM.login) $("#modal").modal();
        });
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                cerrarM.load = true;
                cerrarM.login = true;
                misDatos = t;
                menu(t.nivel);
                cargarCoordinador({ u: false });
                cerrarModal();
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                } else
                    window.location = "/Academias";
            });
    };

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

    const menu = nivel => {
        puedeVer();
        puedeDescargar();
        switch (parseInt(nivel)) {
            case 0:
                puedeEditar(nivel);
                puedeCrear(nivel);
                puedeLiberar();
                break;
        }
    };

    const puedeVer = () => {
        $("#verMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ver
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <input type="button" value="Carrera" class="dropdown-item">
                    <input type="button" value="Docente" class="dropdown-item">
                    <input type="button" value="Academia" class="dropdown-item">
                    <input type="button" value="Plan de trabajo" class="dropdown-item">
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeEditar = nivel => {
        $("#editarMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="editar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Editar
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    ${nivel == 0 ? '<input type="button" value="Carrera" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Academia" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Plan de trabajo" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Acta" class="dropdown-item">' : ''}
                    ${nivel == 1 ? '<input type="button" value="Ev. docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. presidente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. secreatario" class="dropdown-item">' : ''}
                </div>
            </div>
        `);
    };

    const puedeCrear = nivel => {
        $("#CrearMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="editar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Crear
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    ${nivel == 0 ? '<input type="button" value="Carrera" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Academia" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Plan de trabajo" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Acta" class="dropdown-item">' : ''}
                    ${nivel == 1 ? '<input type="button" value="Ev. docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. presidente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. secreatario" class="dropdown-item">' : ''}
                </div>
            </div>
        `);
    };

    const puedeDescargar = () => {
        $("#desMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Descargar
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <input type="button" value="Plan de trabajo" class="dropdown-item">
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeLiberar = () => {
        $("#liberarMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="button" value="Pendientes" class="sin text-menu">
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <div class="d-flex d-inline align-items-center">
                        <input type="button" value="Plan de trabajo" class="dropdown-item">
                        <span class="badge badge-danger">4</span>
                    </div>
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeFinalizar = nivel => {
        $("#finalizarMenu").html(`
        <div class="dropdown">
            <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <input type="button" value="Pendientes" class="sin text-menu">
            </button>
            <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                <input type="button" value="Plan de trabajo" class="dropdown-item">
                <input type="button" value="Acta" class="dropdown-item">
                <input type="button" value="Ev. docente" class="dropdown-item">
                <input type="button" value="Ev. presidente" class="dropdown-item">
                <input type="button" value="Ev. secreatario" class="dropdown-item">
            </div>
        </div>
    `);
    };

    const getCoordinador = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                "url": 'php/coordinador.php',
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cargarCoordinador = ({ u = false }) => {
        getCoordinador()
            .then(async(t) => {
                await datosCoordinador({ t: t, u: u });
                if (misDatos['nivel'] == 0) {
                    aplicarCoordinador();
                }
            })
            .catch(async(c) => {
                $("#datosCoordinador").html(`
                    <h3>Ocurrio un error, puede que no se tenga establecido a un coordinador</h3>
                    ${misDatos['nivel'] == 0 ? await cambiarCoordinador(): ""}
                `);
                if (misDatos['nivel'] == 0) {
                    aplicarCoordinador();
                }
            });

    };

    const cambiarCoordinador = async() => {
        let x = await getbuscarCoordinadorNuevo()
            .then(t => {
                return `
                    <div class="form-inline mt-1">
                        <label class="form-label text-input">Busqueda por nombre/nomina</label>
                        <input id="buscarCoordinador" type="search" class="form-control text-input bg-input rounded-pill mx-auto" list="listaDocentes">
                        <datalist id="listaDocentes">
                            ${getOpcionesCoordinador(t)}
                        </datalist>
                    </div>
                    <input id="nuevoCoordinador" type="button" value="Cambiar" class="btn btn-primary mt-2 rounded">
                `;
            }).catch(c => {
                $("#datosCoordinador").html(`
                    <h3>Ocurrio un error, puede que no se tenga establecido a un coordinador</h3>
                `);
            });
        return x;
    };

    const getbuscarCoordinadorNuevo = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/buscarCoordinadorNuevo.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        })
    };

    const getOpcionesCoordinador = lista => {
        docentesCoordinador = lista;
        let r = "";
        docentesCoordinador.forEach(l => r += `<option>${l.nomina} - ${l.nombre}</option>`);
        return r;
    };

    const datosCoordinador = async({ t, u }) => {
        $("#datosCoordinador").html(`
            <img src="${t.foto || "img/IconLog.png"}" class="img-fluid foto-opcional">
            <label class="text-input">${t.nomina || "nomina"}</label>
            <label>${t.nombre || "nombre"}</label>
            <label>${t.correo || "correo"}</label>
            <div class="d-flex d-inline justify-content-center mb-3">
                <img src="img/ver-detalles.png" class="opciones img-fluid click ml-2" title="ver">
            </div>
            ${(misDatos['nivel'] == 0) ? await cambiarCoordinador() : ""}
            ${alertaCoordinador({u:u})}
        `);
    };

    const actualizarCoordinador = ({ n }) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/actualizarCoordinador.php",
                data: n,
                type: "POST",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    }

    const alertaCoordinador = ({ u }) => {
        if (u) {
            return `
                <div id="alertaCoor" class="mt-2">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Cambio exitoso</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>`;
        } else {
            return `<div id="alertaCoor" class="mt-2">`;
        }
    };

    load();

    const aplicarCoordinador = () => {
        $("#nuevoCoordinador").click(() => {
            let datos = $("#buscarCoordinador")[0].value.split(" - ");
            if (datos.length > 1) {
                let nuevo = docentesCoordinador.find(f => f.nomina == datos[0]);
                actualizarCoordinador({ n: nuevo })
                    .then(t => {
                        cargarCoordinador({ u: true });
                    })
                    .catch(c => {
                        $("#alertaCoor").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${c}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        `);
                    });
            } else {
                $("#alertaCoor").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Debe de ser en formato Nomina - Nombre</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                `);
            }
        });
    };

});