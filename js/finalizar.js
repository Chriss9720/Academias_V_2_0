$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    var planesLista = [];

    $("#accion")[0].innerHTML = sessionStorage.getItem("accion");
    $("#elemento")[0].innerHTML = sessionStorage.getItem("afectar");

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

    const faltantesPlan = () => {
        let php = "";
        switch (sessionStorage.getItem("afectar")) {
            case "Plan de Trabajo":
                php = "faltantesPlanes.php";
                break;
            case "Acta":
                php = "faltantesActas.php";
                break;
            case "Ev. Docente":
                php = "evFaltantesDoc.php";
                break;
            case "Ev. Presidente":
                php = "evFaltantesPre.php";
                break;
            case "Ev. Secretario":
                php = "evFaltantesSec.php";
                break;
            default:
                console.log(sessionStorage.getItem("afectar"));
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `php/${php}`,
                type: 'POST',
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const fechaCorta = (date) => {
        return date.substring(0, 19);
    };

    const getFe = (fecha, text) => {
        return `<label><span class="h4">${text}:</span>${fechaCorta(fecha.date)}</label>`;
    };

    const getDato = (dato, text) => {
        return `<label><span class="h4">${text}:</span>${dato}</label>`;
    };

    const armar = () => {
        let r = "";
        for (let i = 0; i < planesLista.length; i++) {
            let { clave_academia, Semestre, nombre, LAST, fecha, periodo, Academia, Carrera } = planesLista[i];
            r += `
                <div id="${i}" class="border border-dark p-3 bg-menu-principal row rounded rounded-pill mb-3">
                    <div class="col-2 d-flex justify-content-center">
                        <img src="img/pdf.ico">
                    </div>
                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <label><span class="h4">Academia:</span> ${clave_academia} - ${Academia || nombre}</label>
                            <label><span class="h4">Semestre:</span> ${Semestre || periodo}</label>
                            ${(fecha) ? getFe(fecha, "Creado"): getDato(nombre, 'Nombre')}
                            ${(LAST) ? getFe(LAST, "Ultima modificacion"): getDato(Carrera, 'Carrera')}
                        </div>
                    </div>
                    <div class="col-4 d-flex flex-column justify-content-center align-items-center">
                        <input name="finalizar" id='finalizar_${i}' type="button" value="Finalizar" class="btn btn-primary mt-2">

                        <div class="input-group mt-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text click" name="cancelr" id="cancelar_${i}" >Cancelar</span>
                            </div>
                            <div class="custom-file">
                                <input name='Reemplazar' type="file" class="custom-file-input" accept="application/pdf" id="Reemplazar_${i}" aria-describedby="inputGroupFileAddon01">
                                <label id="Reemplazar_${i}_name" class="custom-file-label" for="Reemplazar">Reemplazar</label>
                            </div>
                        </div>

                        <div class="mt-2">
                            <span>
                                <i name="descargar" class="fas fa-download click"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
        $("#area").html(r);
        $('i[name="descargar"]').click(evt => {
            let id = parseInt(evt.target.offsetParent.parentNode.id);
            window.open(`Academias/${planesLista[id].localizacion}`);
        });
        $('input[name="Reemplazar"]').change(evt => {
            let value = evt.target.attributes.id.value;
            let file = $(`#${value}`)[0].files[0];
            $(`#${value}_name`).html(file.name);
        })
        $('span[name="cancelr"]').click(evt => {
            let value = evt.target.attributes.id.value;
            let id = value.split('_')[1];
            $(`#Reemplazar_${id}_name`).html('Reemplazar');
            if ($(`#Reemplazar_${id}`)[0].files[0])
                $(`#Reemplazar_${id}`)[0].files[0] = undefined;
        });
        $('input[name="finalizar"]').click(evt => {
            let value = evt.target.attributes.id.value;
            let id = value.split('_')[1];
            let file = $(`#Reemplazar_${id}`)[0].files[0];
            let idFile = -1;
            let c = "";

            switch (sessionStorage.getItem("afectar")) {
                case "Plan de Trabajo":
                    c = "Planes";
                    idFile = planesLista[id].id_planTrabajo;
                    break;
                case "Acta":
                    c = "Actas";
                    idFile = planesLista[id].id_acta;
                    break;
                case "Ev. Docente":
                    c = "EVDocente";
                    idFile = planesLista[id].id_evaluacion;
                    break;
                case "Ev. Presidente":
                    c = "EVPresidente";
                    idFile = planesLista[id].id_evaluacion;
                    break;
                case "Ev. Secretario":
                    c = "EVSecretario";
                    idFile = planesLista[id].id_evaluacion;
                    break;
            }
            if (file) {
                let formData = new FormData();
                let nombre = new File([], planesLista[id].localizacion);
                let acade = new File([], planesLista[id].clave_academia);
                let change = new File([], c);
                formData.append("file", file);
                formData.append("name", nombre);
                formData.append("acade", acade);
                formData.append("change", change);
                reemplazar(formData)
                    .then(r => {
                        finalizarPlan(idFile, c);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                finalizarPlan(idFile, c);
            }
        });
    };

    const finalizarPlan = (id, c) => {
        finalizar(id, c)
            .then(t => {
                location.reload()
            })
            .catch(e => {
                console.log(e);
            });
    };

    const finalizar = (id, c) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/finalizar.php',
                data: {
                    id: id,
                    case: c
                },
                type: 'POST',
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const reemplazar = file => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/reemplazar.php',
                type: "POST",
                data: file,
                contentType: false,
                processData: false,
                dataType: "json",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                faltantesPlan()
                    .then(planes => {
                        planesLista = planes;
                        armar();
                        cerrarM.load = true;
                        cerrarM.login = true;
                        cerrarModal();
                    })
                    .catch(e => {
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
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

    $("#Cerrar").click(() => {
        cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
    });

    $("#inicio").click(() => (window.location = "/academias/panel.html"));

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