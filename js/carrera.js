$(document).ready(() => {

    let datos = [];

    let docentes = [];

    var cerrarM = {
        load: false,
        login: false
    };

    $("#inicio").click(() => (window.location = "/academias/panel.html"));

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

    const docentesSinCarrera = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/docentesSinCarrera.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                cerrarM.load = true;
                cerrarM.login = true;
                cerrarModal();
                docentesSinCarrera()
                    .then(t => {
                        docentes = t;
                        panelOpciones();
                    })
                    .catch(e => {
                        console.log(e);
                        ""
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        } else {
                            cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias");
                        }
                    })
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

    const evento = (evt, max) => {
        if (evt.target.nodeName == 'A' && !evt.target.children[0]) {
            return parseInt(evt.target.innerHTML);
        } else {
            let name = (evt.target.children[0]) ? evt.target.children[0].name : evt.target.name;
            return (name == 'Final') ? parseInt(max) : 1;
        }
    };

    $("#accion")[0].innerHTML = sessionStorage.getItem("accion");

    $("#foto").change(file => {
        file = file.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => $("#img-portada")[0].src = reader.result;
        }
    });

    const contenido = (pagina, i) => `
        <li class="page-item ${pagina == i ? 'active' :''}">
            <a name="pagina" class="page-link click bg-input text-input ml-2 form-control text-center">${i}</a>
        </li>`;

    const pie = (pagina, max) => {
        let cuerpo = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${pagina == 1 ? "disabled" : "click"} flechaCont">
                <a name="pagina" class="page-link h-100 w-100 form-control bg-input" aria-label="previous">
                    <img src='img/FlechaIzq.png' class="img-fluid flecha" name='Inicio'>
                </a>
            </li>`;
        let entro = max > 0;
        if (max <= 5) {
            for (let i = 1; i <= max; i++) cuerpo += contenido(pagina, i);
        } else {
            if (pagina == max) {
                for (let i = max - 4; i <= max; i++) cuerpo += contenido(pagina, i);
            } else if ((pagina + 4) <= max) {
                if ((pagina - 2) <= 1) {
                    for (let i = 1; i <= 5; i++) cuerpo += contenido(pagina, i);
                } else if ((pagina + 2) == max) {
                    for (let i = pagina; i <= (pagina + 4); i++) cuerpo += contenido(pagina, i);
                } else {
                    for (let i = pagina - 3; i < (pagina + 2); i++) cuerpo += contenido(pagina, i);
                }
            } else {
                for (let i = pagina - 3; i < (pagina + 2); i++) cuerpo += contenido(pagina, i);
            }
        }
        cuerpo += `
            <li class="page-item ${pagina == max ? "disabled" : "click"} flechaCont ml-3">
                <a name="pagina" class="page-link h-100 w-100 form-control bg-input" aria-label="next">
                    <img src='img/FlechaDer.png' class="img-fluid flecha" name='Final'>
                </a>
            </li>
        </ul>`;

        if (entro) $("#pie")[0].innerHTML = cuerpo;

        $(`a[name="pagina"]`).click(evt => cargar(evento(evt, max)));

    };

    const cargar = (pagina) => {
        datos = docentes.filter(doc => doc.seleccionado);
        let contenido = $("#contenido")[0];
        let max = Math.ceil(datos.length / 3);
        let total = 3 * pagina;
        let inicio = (pagina - 1) * 3;
        contenido.innerHTML = "";
        for (let i = inicio; i < total && i < datos.length; i++) {
            contenido.innerHTML += `
                <div class="col-4">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${datos[i].foto}" class="img-fluid foto-opcional">
                        <label class="text-input">${datos[i].nomina}</label>
                        <label>${datos[i].nombre}</label>
                        <label>${datos[i].jefe == 1 ? 'Jefe': 'Integrante'}</label>
                    </div>
                </div>
            `;
        }
        pie(pagina, max);
    };

    load();

    const listaDocentes = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            docentes[i]["pos"] = i;
            if (!docentes[i].seleccionado) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const listaSeleecionados = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            docentes[i]["pos"] = i;
            if (docentes[i].seleccionado) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const accionesJefe = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nombre/nomina</label>
                <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentes()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#SalvarJefe").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find;
                    let rem;
                    for (let i = 0; i < docentes.length; i++) {
                        if (docentes[i]["jefe"] == 1) rem = i;
                        if (docentes[i].nomina === jefe[0] && docentes[i].nombre === jefe[1]) {
                            docentes[i]["jefe"] = 1;
                            find = docentes[i];
                        }
                    }
                    if (find) {
                        if (rem && rem != find.pos) {
                            docentes[rem]["jefe"] = 0;
                            docentes[rem].seleccionado = false;
                        }
                        $("#erroresJefe").html(``);
                        docentes[find.pos].seleccionado = true;
                        cargar(1);
                        accionesJefe();
                    } else {
                        $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`);
                    }
                } else {
                    $("#erroresJefe").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Debe de ser en formato Nómina - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
                }
            }
        });
    };

    const accionesAdd = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nombre/nomina</label>
                <input id="salvarM" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentes()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#salvarM").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find = docentes.filter(f => f.nomina === jefe[0] && f.nombre === jefe[1]);
                    if (find) {
                        $("#erroresJefe").html(``);
                        find = find[0];
                        docentes[find.pos].seleccionado = true;
                        cargar(1);
                        accionesAdd();
                    } else {
                        $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`);
                    }
                } else {
                    $("#erroresJefe").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Debe de ser en formato Nómina - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
                }
            }
        });
    };

    const accionesDEL = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nombre/nomina</label>
                <input id="salvarM" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaSeleecionados()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#salvarM").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find = docentes.filter(f => f.nomina === jefe[0] && f.nombre === jefe[1]);
                    if (find) {
                        $("#erroresJefe").html(``);
                        find = find[0];
                        docentes[find.pos].jefe = 0;
                        docentes[find.pos].seleccionado = false;
                        cargar(1);
                        accionesAdd();
                    } else {
                        $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`);
                    }
                } else {
                    $("#erroresJefe").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Debe de ser en formato Nómina - Nombre</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
                }
            }
        });
    };

    const panelOpciones = () => {
        if (sessionStorage.getItem("accion").includes("Crear")) {
            $("#MenuOpciones").html(`
                <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                <label name="options" class="btn btn-secondary active opciones text-input">
                    <input type="radio" name="options" id="option1" autocomplete="off"> Jefe
                </label>
                <label name="options" class="btn btn-secondary opciones text-input">
                    <input type="radio" name="options" id="option3" autocomplete="off"> Agregar miembro
                </label>
                <label name="options" class="btn btn-secondary opciones text-input">
                    <input type="radio" name="options" id="option3" autocomplete="off"> Eliminar miembro
                </label>
                </div>
                <div id="Opciones" class="mt-3 d-flex flex-column justify-content-center align-items-center">
                </div>
            `);
        }
        $('[name="options"]').click(evt => {
            switch (evt.target.innerText) {
                case "Jefe":
                    accionesJefe();
                    break;
                case "Agregar miembro":
                    accionesAdd();
                    break;
                case "Eliminar miembro":
                    accionesDEL();
                    break;
            }
        });
    };

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

    const salvarCarrera = data => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/salvarCarrera.php",
                data: { data: data },
                dataType: "json",
                type: "POST",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    }

    $("#salvarCarrera").click(() => {
        if (sessionStorage.getItem("accion").includes("Crear")) {
            let data = {
                nombreC: $("#nombreC")[0],
                claveC: $("#claveC")[0],
                foto: "img/IconLog.png",
                jefe: docentes.filter(f => f.seleccionado && f.jefe == 1),
                miembros: docentes.filter(f => f.seleccionado && f.jefe == 0)
            };
            let valid = camposRequeridos(data, ["nombreC", "claveC"]);
            valid = validarClave(data, "claveC") && valid;
            valid = validarClave(data, "nombreC") && valid;

            let foto = $("#foto")[0].files[0];
            var formData = new FormData();
            if (foto) {
                let nombre = `${data["nombreC"]}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
                var file = new File([], nombre);
                formData.append("file", foto);
                formData.append("name", file);
                data["foto"] = formData;
            }

            if (valid) {
                salvarImg(formData, foto)
                    .then((t) => {
                        data["foto"] = t.path;
                        salvarCarrera(data)
                            .then(cs => {
                                console.log(cs);
                                reset();
                            })
                            .catch((e) => {
                                cerrarM.load = true;
                                cerrarModal();
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    login();
                                } else {
                                    console.log(e);
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
                        $("#alerta").html(`
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Registro exitoso</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
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
            }
        }
    });

    $("#cancelar").click(() => reset());

    const reset = () => {
        $("#nombreC")[0].value = "";
        $("#claveC")[0].value = "";
        $("#nombreC")[0].className = $("#nombreC")[0].className.replace(" is-valid", "");
        $("#claveC")[0].className = $("#claveC")[0].className.replace(" is-valid", "")
        docentes.forEach(d => {
            d.seleccionado = false;
            d.jefe = 0;
        });
        $("#img-portada")[0].src = "img/portada.png";
        panelOpciones();
        cargar(1);
    };

});

/**
 * $("#Opciones").html(`
                    <img src="img/IconLog.png" class="img-fluid foto-opcional">
                    <div class="form-inline mt-2 d-flex justify-content-around">
                        <label class="form-label text-input ancho">Actual</label>
                        <input type="text" class="form-control text-input bg-input rounded-pill" disabled>
                    </div>
                    <div class="form-inline mt-2">
                        <label class="form-label text-input ancho">Nuevo</label>
                        <input type="text" class="form-control text-input bg-input rounded-pill" disabled>
                    </div>
                    <div class="form-inline mt-2">
                        <label class="form-label text-input ancho">Nomina</label>
                        <input type="text" class="form-control text-input bg-input rounded-pill" disabled>
                    </div>
                    <div class="form-inline mt-2">
                        <label class="form-label text-input ancho">Busqueda por nombre/nomina</label>
                        <input type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                        <datalist id="listamodelos">
                            <option value="Cielo">
                            <option value="Yañez">
                            <option value="Cristy">
                        </datalist>
                    </div>`);
 */