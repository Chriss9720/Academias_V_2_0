$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    var evidencia = [];

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

    const leerEv = ruta => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/leerPlan.php',
                data: {
                    ruta: ruta
                },
                type: "post",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const armar = async() => {
        let r = "";
        for (let i = 0; i < evidencia.length; i++) {
            await leerEv(evidencia[i].localizacionJson)
                .then(json => evidencia[i].data = json)
                .catch(e => console.log(e));
            let desc;
            let tarea;
            let fecha;
            if (evidencia[i].PADRE === 'Actas') {
                desc = evidencia[i].data.Acuerdos[(evidencia[i].punto) - 1].acuerdo;
                fecha = evidencia[i].data.Acuerdos[(evidencia[i].punto) - 1].fecha;
                tarea = evidencia[i].data.Acuerdos[(evidencia[i].punto) - 1].tareas[(evidencia[i].no_tarea - 1)];
            } else {
                desc = evidencia[i].data[evidencia[i].no_tarea].Acciones;
                tarea = evidencia[i].data[evidencia[i].no_tarea].tareas[(evidencia[i].punto - 1)];
                fecha = evidencia[i].data[evidencia[i].no_tarea].fecha;
            }
            r += `
                <div id="${i}" class="border border-dark p-3 bg-menu-principal row rounded rounded-pill mb-3">
                    <div class="col-3"></div>
                    <div class="col-6" id="error_${i}"></div>
                    <div class="col-3"></div>
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <img class='img-pdf' src="img/pdf.ico">
                    </div>
                    <div class="col-6">
                        <div class="d-flex flex-column">
                            <label><span class="h4">Descripción:</span> ${desc}</label>
                            <label><span class="h4">Fecha:</span> ${fecha.replace("T", ' ')}</label>
                            <label><span class="h4">Tarea:</span> ${tarea}</label>
                            <label><span class="h4">Punto:</span> ${evidencia[i].punto} - ${evidencia[i].no_tarea}</label>
                        </div>
                    </div>
                    <div class="col-4 d-flex flex-column justify-content-center align-items-center">

                        <input name="finalizar" id='finalizar_${i}' type="button" value="Entregar" class="btn btn-primary mt-2">

                        <div class="custom-file mt-2">
                            <input name='Reemplazar' type="file" class="custom-file-input" accept="application/pdf" id="Reemplazar_${i}" aria-describedby="inputGroupFileAddon01">
                            <label id="Reemplazar_${i}_name" class="custom-file-label" for="Reemplazar">Entregar</label>
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
        $('input[name="Reemplazar"]').change(evt => {
            let value = evt.target.attributes.id.value;
            let file = $(`#${value}`)[0].files[0];
            $(`#${value}_name`).html(file.name);
        })
        $('i[name="descargar"]').click(evt => {
            let id = parseInt(evt.target.offsetParent.parentNode.id);
            console.log(evidencia[id]);
            window.open(`Academias/${evidencia[id].L2}`);
        });
        $('input[name="finalizar"]').click(evt => {
            let value = evt.target.attributes.id.value;
            let id = value.split('_')[1];
            let file = $(`#Reemplazar_${id}`)[0].files[0];
            let idFile = evidencia[id].id_evidencia;
            let claveAcademia;
            if (evidencia[id].data.datos) {
                claveAcademia = evidencia[id].data.datos.claveAcademia;
            } else {
                claveAcademia = evidencia[id].data.DatosA.Clave;
            }

            let name = `${evidencia[id].punto} - ${evidencia[id].no_tarea} - ${evidencia[id].nomina}`;

            if (file) {
                let formData = new FormData();
                let nombre = new File([], name);
                let acade = new File([], claveAcademia);
                let tipo = new File([], evidencia[id].PADRE);
                let sub = new File([], evidencia[id].ID);
                formData.append("file", file);
                formData.append("name", nombre);
                formData.append("acade", acade);
                formData.append("tipo", tipo);
                formData.append("sub", sub);
                subir(formData)
                    .then(s => {
                        entregar(s.path, idFile, evidencia[id].PADRE)
                            .then(() => {
                                location.reload();
                            })
                            .catch(e => {
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
                        }
                    });
            } else {
                $(`#error_${id}`).html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong>Debe de seleccionar un archivo PDF</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        });
    };

    const entregar = (ruta, id, tipo) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/entregar.php',
                data: {
                    ruta: ruta,
                    id: id,
                    tipo: tipo
                },
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const subir = data => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/subirEv.php',
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                dataType: "json",
                success: (s) => resolve(s),
                error: (e) => reject(e),
            });
        });
    };

    const getEvidenciaPendiente = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/faltantesEvidencia.php',
                type: 'POST',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    }

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                getEvidenciaPendiente()
                    .then(planes => {
                        evidencia = planes;
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