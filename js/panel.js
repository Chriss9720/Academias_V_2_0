$(document).ready(() => {

    var misDatos;
    var docentesCoordinador;

    const crearAcciones = () => {

        $('[name="areaMenu"]').click(evt => sessionStorage.setItem('accion', evt.target.innerText.replace(" ", "")));

        $('[name="opcionMenu"]').click(evt => {
            sessionStorage.setItem('afectar', evt.target.value);
            cargando(true);
            $.ajax({
                url: "php/validarCambio.php",
                data: {
                    accion: sessionStorage.getItem('accion'),
                    afectar: sessionStorage.getItem('afectar')
                },
                type: "post",
                dataType: "json",
                success: (s) => window.location = s.cambio,
                error: (e) => {
                    console.log(e);
                    cerrarModal();
                    if (e.status == 404 && e.responseText == "Solicitar Reinicio de sesion") {
                        cerrarM.load = true;
                        login();
                    } else {
                        $("#errorG").html(`
                            <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                                <strong class="h1">${e.responseJSON.msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                }
            });
        });

        $("#Subir").click(() => {
            console.log("Subir");
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

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                cerrarM.load = true;
                cerrarM.login = true;
                misDatos = t;
                menu();
                cargarCoordinador({ u: false });
                cerrarModal();
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

    const menu = () => {
        puedeVer();
        puedeDescargar();
        let presidente = isPresidente();
        let secretario = isScretario();
        let jefe = misDatos.jefe;
        let nivel = misDatos.nivel;
        puedeEditar({ presidente, secretario, jefe, nivel });
        puedeCrear({ presidente, secretario, jefe, nivel });
        puedeLiberar({ nivel });
        puedeFinalizar({ presidente, nivel, secretario });
        subirEvidencia();
        crearAcciones();
    };

    const puedeVer = () => {
        $("#verMenu").html(`
            <div class="dropdown">
                <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ver
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <input name="opcionMenu" type="button" value="Carrera" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Docente" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Academia" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Plan de trabajo" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Acta" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Ev. docente" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Ev. presidente" class="dropdown-item">
                    <input name="opcionMenu" type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeEditar = ({ presidente, secretario, jefe, nivel }) => {
        if (jefe == 1 || nivel == 1 || nivel == 0 || presidente || secretario) {
            $("#editarMenu").html(`
                <div class="dropdown">
                    <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="editar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Editar
                    </button>
                    <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                        ${ jefe == 1 || nivel == 0 ? '<input name="opcionMenu" type="button"  value="Carrera" class="dropdown-item">' : ''}
                        ${presidente || secretario ||  jefe == 1 || nivel == 0 || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Docente" class="dropdown-item">' : ''}
                        ${presidente || secretario || nivel == 0 || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Academia" class="dropdown-item">' : ''}
                        ${presidente || secretario || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Plan de trabajo" class="dropdown-item">' : ''}
                        ${presidente || secretario || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Acta" class="dropdown-item">' : ''}
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Ev. docente" class="dropdown-item">' : ''}
                        ${nivel == 1 ? '<input name="opcionMenu" type="button"  value="Ev. presidente" class="dropdown-item">' : ''}
                        ${nivel == 1 ? '<input name="opcionMenu" type="button"  value="Ev. secreatario" class="dropdown-item">' : ''}
                    </div>
                </div>
            `);
        } else {
            $("#editarMenu").remove();
        }
    };

    const puedeCrear = ({ presidente, secretario, jefe, nivel }) => {
        if (jefe == 1 || nivel == 1 || nivel == 0 || presidente || secretario) {
            $("#CrearMenu").html(`
                <div class="dropdown">
                    <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="Crear" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Crear
                    </button>
                    <div class="dropdown-menu bg-menu-principal" aria-labelledby="Crear">
                        ${nivel == 0 || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Carrera" class="dropdown-item">' : ''}
                        ${presidente || secretario ||  jefe == 1 || nivel == 0 || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Docente" class="dropdown-item">' : ''}
                        ${nivel == 0 || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Academia" class="dropdown-item">' : ''}
                        ${presidente || secretario || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Plan de trabajo" class="dropdown-item">' : ''}
                        ${presidente || secretario || nivel == 1 ? '<input name="opcionMenu" type="button"  value="Acta" class="dropdown-item">' : ''}
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Ev. docente" class="dropdown-item">' : ''}
                        ${nivel == 1 ? '<input name="opcionMenu" type="button"  value="Ev. presidente" class="dropdown-item">' : ''}
                        ${nivel == 1 ? '<input name="opcionMenu" type="button"  value="Ev. secreatario" class="dropdown-item">' : ''}
                    </div>
                </div>
            `);
        } else {
            $("#CrearMenu").remove();
        }
    };

    const subirEvidencia = () => {
        $("#subirEvidencia").html(`
            <button name="areaMenu" class="btn text-menu" type="button" id="Subir">
                Subir Evidencia
            </button>
        `);
    };

    const puedeDescargar = () => {
        $("#desMenu").html(`
            <div class="dropdown">
                <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="Descargar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Descargar
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="Descargar">
                    <input name="opcionMenu" type="button"  value="Plan de trabajo" class="dropdown-item">
                    <input name="opcionMenu" type="button"  value="Acta" class="dropdown-item">
                    <input name="opcionMenu" type="button"  value="Ev. docente" class="dropdown-item">
                    <input name="opcionMenu" type="button"  value="Ev. presidente" class="dropdown-item">
                    <input name="opcionMenu" type="button"  value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeLiberar = ({ nivel }) => {
        if (nivel == 1 || nivel == 0) {
            $("#liberarMenu").html(`
                <div class="dropdown">
                    <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Liberar
                    </button>
                    <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                        <div class="d-flex d-inline align-items-center">
                            <input name="opcionMenu" type="button"  value="Plan de trabajo" class="dropdown-item">
                            <span class="badge badge-danger">4</span>
                        </div>
                        <input name="opcionMenu" type="button"  value="Acta" class="dropdown-item">
                        <input name="opcionMenu" type="button"  value="Ev. docente" class="dropdown-item">
                        <input name="opcionMenu" type="button"  value="Ev. presidente" class="dropdown-item">
                        <input name="opcionMenu" type="button"  value="Ev. secreatario" class="dropdown-item">
                    </div>
                </div>
            `);
        } else {
            $("#liberarMenu").remove();
        }
    };

    const puedeFinalizar = ({ presidente, nivel, secretario }) => {
        if (presidente || nivel == 1 || secretario) {
            $("#finalizarMenu").html(`
                <div class="dropdown">
                    <button name="areaMenu" class="btn text-menu dropdown-toggle" type="button" id="Finalizar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Finalizar
                    </button>
                    <div class="dropdown-menu bg-menu-principal" aria-labelledby="Finalizar">
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Plan de trabajo" class="dropdown-item">': ''}
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Acta" class="dropdown-item">': ''}
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Ev. docente" class="dropdown-item">': ''}
                        ${nivel == 1 ? '<input name="opcionMenu" type="button"  value="Ev. presidente" class="dropdown-item">': ''}
                        ${presidente ? '<input name="opcionMenu" type="button"  value="Ev. secreatario" class="dropdown-item">': ''}
                    </div>
                </div>
            `);
        } else {
            $("#finalizarMenu").remove();
        }
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

    const isPresidente = () => misDatos.puesto.find(p => p == "Presidente");

    const isScretario = () => misDatos.puesto.find(s => s == "Secretario");

    load();

});