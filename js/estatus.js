$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    var academias;

    const cerrarModal = () => {
        $("#modal").modal('hide');
        $(`[class="modal-backdrop show"]`).remove();
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

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                validarPagina()
                    .then(() => {
                        getMisAcademias()
                            .then(A => {
                                academias = A;
                                construirBusqueda();
                                cerrarM.load = true;
                                cerrarM.login = true;
                                cerrarModal();
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
                            console.log(e)
                            //window.location = "/Academias/Panel.html";
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

    const cerrar = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/cerrar.php",
                success: s => resolve(),
                error: e => reject()
            });
        })
    };

    load();

    const construirBusqueda = () => {
        let r = "";
        for (let i = 0; i < academias.length; i++) {
            r += `<option value="${academias[i].clave_academia} - ${academias[i].nombre}">`;
        }
        removerGuardados($("#listaAcaStastus")[0]);
        $("#listaAcaStastus").html(r);
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

    $("#AcaSelStatus").keypress(async (k) => {
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
                $("#alertBusqueda").html("");
                let clave = academias.find(f => f.clave_academia == dato[0] && f.nombre == dato[1]);
                if (clave) {
                    //$("#html").html("");
                    miembrosAcademia(clave.clave_academia)
                        .then(doc => {
                            console.log(doc);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    $("#alertBusqueda").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontro la academia</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }

            }
        }
    });

});