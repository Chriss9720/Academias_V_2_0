$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    var docentes = [];

    let document = {};

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

    const getDocentesEv = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/getDocentesEv.php",
                data: {
                    sem: calcularSemestre()
                },
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const armarListaDoc = () => {
        let r = "";
        for (let i = 0; i < docentes.length; i++) {
            r += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
        }
        removerGuardados($("#listaDoc")[0]);
        $("#listaDoc").html(r);
    };

    $("#docenteSel").keypress(k => {
        if (k.which === 13) {
            let values = (k.target.value.split(" - "));
            let doc = docentes.find(f => f.nomina == values[0] && f.nombre === values[1]);
            if (doc) {
                $("#alerta").html(``);
                document.infoDoc = doc;
                let campos = $("[name='info']");
                let datos = [calcularSemestre(), doc.Academia, doc.Carrera];
                document.infoDoc.periodo = datos[0];
                for (let i = 0; i < campos.length; i++) {
                    campos[i].value = datos[i];
                }
            } else {
                $("#alerta").html(`
                    <div class="alert h2 text-center alert-danger alert-dismissible fade show" role="alert">
                        <strong>No se encontro al doente, recuerde que debe de ser en formato Nómina - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        }
    });

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                getDocentesEv()
                    .then(docs => {
                        docentes = docs;
                        armarListaDoc(docs);
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
                    })
            })
            .catch(e => {
                console.log(e);
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                } else {
                    //cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
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

    $("#accion")[0].innerHTML = sessionStorage.getItem("accion");

    CKEDITOR.replace('ev');
    CKEDITOR.replace('obs');

    $('div[name="evaluacion"]').click(evt => {
        if (evt.target.attributes.id || evt.delegateTarget.id) {
            let id = (evt.target.attributes.id && evt.target.attributes.id.value) || evt.delegateTarget.id;
            $("#tituloModal")[0].innerText = id;
            let text = $(`#${id}`)[0].innerHTML;
            CKEDITOR.instances["ev"].setData(text);
            $("#editor").modal('show');
        }
    });

    $("#aplicarEvaluacion").click(evt => {
        let text = CKEDITOR.instances["ev"].getData();
        let id = $("#tituloModal")[0].innerText;
        $(`#${id}`)[0].innerHTML = text;
        $("#editor").modal('hide');
    });

    const calcularSemestre = () => {
        let date = new Date();
        if (date.getMonth() >= 0 && date.getMonth() < 6)
            return `Ene - May ${date.getFullYear()}`;
        else
            return `Ago - Dic ${date.getFullYear()}`;
    };

    $("[name='Crear']").click(() => {
        if (document.infoDoc) {
            let radiosName = ["r-1", "r-2", "r-3", "r-4", "r-5", "r-f"];
            let valid = [false, false, false, false, false, false]
            for (let i = 0; i < radiosName.length; i++) {
                let radios = $(`[name="${radiosName[i]}"]`);
                for (let j = 0; j < radios.length && !valid[i]; j++) {
                    if (radios[j].checked) {
                        valid[i] = true;
                    }
                }
                for (let j = 0; j < radios.length; j++) {
                    if (!valid[i]) {
                        radios[j].className = `${radios[j].className} is-invalid`;
                    } else {
                        radios[j].className = radios[j].className.replace(' is-invalid', '');
                    }
                }
            }
            let nV = valid.filter(v => !v);
            if (nV.length > 0) {
                $("#alerta").html(`
                    <div class="alert h2 alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong>Rellene todos los campos</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            } else {
                let ev = $('[name="evaluacion"]');
                document.ev = [];
                for (let i = 0; i < ev.length; i++) {
                    document.ev.push(ev[i].innerHTML);
                }
                document.obs = CKEDITOR.instances["obs"].getData();
                let calif = $("#calif").val().trim();
                if (calif.length > 0) {
                    $("#calif")[0].className = $("#calif")[0].className.replace(' is-invalid', '');
                    $("#alerta").html(``);
                    document.calif = calif;
                } else {
                    $("#calif")[0].className = `${$("#calif")[0].className} is-invalid`;
                    $("#alerta").html(`
                        <div class="alert h2 alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong>Rellene todos los campos</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
                console.log(document);
            }
        } else {
            $("#alerta").html(`
                <div class="alert h2 alert-danger alert-dismissible fade show text-center" role="alert">
                    <strong>Seleccione un docente</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        }
    });

    load();

});