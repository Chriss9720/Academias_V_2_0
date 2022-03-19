$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false,
    };

    var docentesEdit = [];

    var misDatos;

    $("#inicio").click(() => (window.location = "/academias/panel.html"));

    const cerrar = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/cerrar.php",
                success: (s) => resolve(),
                error: (e) => reject(),
            });
        });
    };

    const getMisDatos = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/misDatos.php",
                dataType: "json",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    $("#Cerrar").click(() => {
        cerrar()
            .then(() => (window.location = "/Academias"))
            .catch(() => (window.location = "/Academias"));
    });

    const cerrarModal = () => {
        $("#modal").modal("hide");
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

            if (!validacionDeNoVacio(nomina))
                return errorExacto({ campo: "nomina", desc: "Ingrese su nomina" });
            else quitarError({ campo: "nomina" });

            if (!validacionDeNoVacio(clave))
                return errorExacto({ campo: "clave", desc: "Ingrese su clave" });
            else quitarError({ campo: "clave" });

            if (!validacionNumerica(nomina))
                return error("Datos ingresados erroneamente");

            login2({ nomina: nomina, clave: clave })
                .then((t) => load())
                .catch((c) => error(c.msg));
        });

        const login2 = ({ nomina, clave }) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "php/logeo.php",
                    type: "post",
                    data: {
                        nomina: nomina,
                        clave: clave,
                    },
                    dataType: "json",
                    success: (s) => resolve(s),
                    error: (e) => reject(e.responseJSON),
                });
            });
        };

        const getValue = (name) => $(`#${name}`)[0].value;

        const error = (desc) => {
            $("#Error").html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>${desc}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        };

        const errorExacto = ({ campo, desc }) => {
            let input = $(`#${campo}`)[0];
            if (!input.className.includes("invalid")) {
                input.className += " is-invalid";
                $(`#${campo}C`)[0].className += " error";
            }
            $(`div[name="${campo}"]`).text(desc);
        };

        const quitarError = ({ campo }) => {
            let input = $(`#${campo}`)[0];
            input.className = input.className.replace(" is-invalid", "");
            $(`#${campo}C`)[0].className = $(`#${campo}C`)[0].className.replace(
                " error",
                ""
            );
        };

        $("#Salir").click(() =>
            cerrar()
            .then(() => (window.location = "/Academias"))
            .catch(() => (window.location = "/Academias"))
        );

        $("#modal").modal();

        $("#modal").on("hidden.bs.modal", () => {
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

        $("#modal").on("hidden.bs.modal", () => {
            if (!cerrarM.load) $("#modal").modal();
        });
    };

    const validarPagina = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/validarCambio.php",
                data: {
                    accion: sessionStorage.getItem("accion"),
                    afectar: sessionStorage.getItem("afectar"),
                },
                type: "post",
                dataType: "json",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    const cargar = data => {
        $("#extension").html(`
            <option value="@itesca.edu.mx" ${data.correo.includes('@itesca.edu.mx') ? 'selected':''} >@itesca.edu.mx</option>
            <option value="@cajeme.tecnm.mx" ${data.correo.includes('@cajeme.tecnm.mx') ? 'selected':''} >@cajeme.tecnm.mx</option>
        `);
        $("#nombre")[0].value = data.nombre;
        $("#nominaR")[0].value = data.nomina;
        $("#telefono")[0].value = data.telefono;
        $("#claveR")[0].value = data.clave;
        $("#perfil")[0].src = data.foto;

        $("#correo")[0].value = data.correo.replace("@cajeme.tecnm.mx", "").replace("@itesca.edu.mx", "");
    };

    const editar = () => {
        $("#Edicion").html(`
            <input name="cancelar" value="Cancelar" type="button" class="btn bg-btn-aplicar btn-primary-r">
            ${(misDatos['nivel'] == 0 || misDatos['nivel'] == 1)?'<input id="aplicarBaja" value="Inhabilitar" type="button" class="btn btn-primary-r bg-danger">':''}
            <input id="editar" type="button" value="Editar" class="btn btn-primary-r">
        `);
        $("#nominaR").attr("disabled", "");
        $("#soloEdit").html(`
            <div class="form-inline mt-1 mx-auto">
                <label class="form-label text-input mr-3">Busqueda por nombre/nomina</label>
                <input id="editarS" type="search" class="form-control text-input bg-input rounded-pill mx-auto" list="listaEdit">
                <datalist id="listaEdit">
                    ${docentes()}
                </datalist>
            </div>
        `);
        $("#editarS").keypress(k => {
            if (k.which == 13) {
                let componente = $("#editarS")[0];
                let editar = componente.value.split(" - ");
                let find = docentesEdit.find(f => f.nomina == editar[0] && f.nombre == editar[1]);
                if (find) {
                    $("#alerta").html(``);
                    componente.value = "";
                    $("#aplicarBaja")[0].value = parseInt(find.baja) == 0 ? "Inhabilitar" : "Habilitar";
                    cargar(find);
                } else {
                    $("#alerta").html(`
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>${editar.length != 2 ? 'Busqueda del formato nomina - nombre' : 'No se encontro el docente'}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
        $("#editar").click(() => {
            cargando();
            let data = {
                nombre: $("#nombre")[0],
                nominaR: $("#nominaR")[0],
                telefono: $("#telefono")[0],
                correo: $("#correo")[0],
                claveR: $("#claveR")[0],
                foto: "img/IconLog.png",
            };

            let extension = $("#extension")[0].value;

            let valid = camposRequeridos(data, ["nombre", "nominaR", "claveR"]);
            valid = validarNombre(data, "nombre") && valid;
            valid = validarNomina(data, "nominaR") && valid;
            valid = validarClave(data, "claveR") && valid;
            valid = validarTelefono(data, "telefono") && valid;
            valid = validarCorreo(data, "correo", extension) && valid;

            let foto = $("#foto")[0].files[0];
            var formData = new FormData();
            if (foto) {
                let nombre = `${data["nominaR"]}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
                var file = new File([], nombre);
                formData.append("file", foto);
                formData.append("name", file);
                data["foto"] = formData;
            }

            if (!valid) {
                cerrarM.load = true;
                cerrarModal();
                return
            };
            salvarImg(formData, foto)
                .then((t) => {
                    data["foto"] = t.path;
                    actualizarDocente(data)
                        .then((r) => {
                            cargarDocentes();
                            $("#alerta").html(`
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>${r.msg}</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `);
                            editar();
                            reset();
                            cerrarM.load = true;
                            cerrarModal();
                        })
                        .catch((e) => {
                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                cerrarM.load = true;
                                cerrarModal();
                                login();
                            } else {
                                $("#alerta").html(`
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>${(e.responseJSON) ? e.responseJSON.msg : e.responseText}</strong>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                `);
                            }
                            cerrarM.load = true;
                            cerrarModal();
                        });
                })
                .catch((e) => {
                    if (e.responseText == "Solicitar Reinicio de sesion") {
                        cerrarM.load = true;
                        cerrarModal();
                        login();
                    } else {
                        $("#alerta").html(`
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>${e.responseJSON.msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                        cerrarM.load = true;
                        cerrarModal();
                    }
                });
        });
        $("#aplicarBaja").click(evt => {
            cargando();
            let data = { nominaR: $("#nominaR")[0] };
            let valid = camposRequeridos(data, ["nominaR"]);
            valid = validarNomina(data, "nominaR") && valid;
            if (!valid) {
                cerrarM.load = true;
                cerrarModal();
                return
            };
            darBaja(data, evt.target.value)
                .then(r => {
                    cargarDocentes();
                    $("#alerta").html(`
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>${r.msg}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                    editar();
                    reset();
                    cerrarM.load = true;
                    cerrarModal();
                })
                .catch(e => {
                    cerrarM.load = true;
                    cerrarModal();
                    if (e.responseText == "Solicitar Reinicio de sesion") {
                        login();
                    } else {
                        $("#alerta").html(`
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>${e.responseJSON.msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                });
        });
        $('input[name="cancelar"]').click(() => reset());
    };

    const docentes = () => {
        let r = "";
        docentesEdit.forEach(d => r += `<option value="${d.nomina} - ${d.nombre}">`)
        return r;
    };

    const getDocentesEdit = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/editarDocentes.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cargarDocentes = () => {
        getDocentesEdit().then(t => {
            docentesEdit = t;
            editar();
        }).catch((e) => {
            if (e.responseText == "Solicitar Reinicio de sesion") {
                cerrarM.load = true;
                cerrarModal();
                login();
            }
        });
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then((t) => {
                validarPagina()
                    .then((p) => {
                        misDatos = t;
                        if (sessionStorage.getItem("accion").includes("Editar")) {
                            $("#Creacion").remove();
                            cargarDocentes();
                        } else {
                            $("#soloEdit").remove();
                            $("#Edicion").remove();
                        }
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
            .catch((e) => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                } else {
                    cerrar()
                        .then(() => (window.location = "/Academias"))
                        .catch(() => (window.location = "/Academias"));
                }
            });
    };

    load();

    const salvarImg = (file, foto) => {
        return new Promise((resolve, reject) => {
            if (foto) {
                $.ajax({
                    url: "php/salvarImg.php",
                    type: "POST",
                    data: file,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: (s) => resolve(s),
                    error: (e) => reject(e),
                });
            } else {
                resolve({ path: "img/iconLog.png" });
            }
        });
    };

    const registrarDocente = (data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/registrarDocente.php",
                data: { data: data },
                dataType: "json",
                type: "POST",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    const actualizarDocente = data => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/actualizarDocente.php",
                data: { data: data },
                dataType: "json",
                type: "POST",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    $("#registrar").click(() => {
        cargando();
        let data = {
            nombre: $("#nombre")[0],
            nominaR: $("#nominaR")[0],
            telefono: $("#telefono")[0],
            correo: $("#correo")[0],
            claveR: $("#claveR")[0],
            foto: "img/IconLog.png",
        };

        let extension = $("#extension")[0].value;

        let valid = camposRequeridos(data, ["nombre", "nominaR", "claveR"]);
        valid = validarNombre(data, "nombre") && valid;
        valid = validarNomina(data, "nominaR") && valid;
        valid = validarClave(data, "claveR") && valid;
        valid = validarTelefono(data, "telefono") && valid;
        valid = validarCorreo(data, "correo", extension) && valid;

        let foto = $("#foto")[0].files[0];
        var formData = new FormData();
        if (foto) {
            let nombre = `${data["nominaR"]}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
            var file = new File([], nombre);
            formData.append("file", foto);
            formData.append("name", file);
            data["foto"] = formData;
        }

        if (!valid) {
            cerrarM.load = true;
            cerrarModal();
            return
        };
        salvarImg(formData, foto)
            .then((t) => {
                data["foto"] = t.path;
                registrarDocente(data)
                    .then((r) => {
                        $("#alerta").html(`
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${r.msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                        reset();
                        cerrarM.load = true;
                        cerrarModal();
                    })
                    .catch((e) => {
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        } else {
                            $("#alerta").html(`
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>${e.responseJSON.msg}</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `);
                        }
                        cerrarM.load = true;
                        cerrarModal();
                    });
            })
            .catch((e) => {
                cerrarM.load = true;
                cerrarModal();
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    login();
                } else {
                    $("#alerta").html(`
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>${e.responseJSON.msg}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            });
    });

    $("#accion")[0].innerHTML = sessionStorage.getItem("accion");

    $("#foto").change((file) => {
        file = file.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => ($("#perfil")[0].src = reader.result);
        }
    });

    const reset = () => {
        $("#nombre")[0].value = "";
        $("#nominaR")[0].value = "";
        $("#telefono")[0].value = "";
        $("#correo")[0].value = "";
        $("#claveR")[0].value = "";
        $("#perfil")[0].src = "img/IconLog.png";

        $("#nombre")[0].className = $("#nombre")[0].className.replace(" is-valid", "").replace(" is-invalid", "");
        $("#nominaR")[0].className = $("#nombre")[0].className.replace(" is-valid", "").replace(" is-invalid", "");
        $("#telefono")[0].className = $("#nombre")[0].className.replace(" is-valid", "").replace(" is-invalid", "");
        $("#correo")[0].className = $("#nombre")[0].className.replace(" is-valid", "").replace(" is-invalid", "");
        $("#claveR")[0].className = $("#nombre")[0].className.replace(" is-valid", "").replace(" is-invalid", "");
    };

    const darBaja = (data, evt) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: (evt.includes("Habilitar")) ? "php/aplicarAlta.php" : "php/aplicarBaja.php",
                data: { data: data },
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

});