$(document).ready(() => {

    let datos = [];
    var docentes = [];

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

    const getDocentes = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/docentesActivos.php",
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
                getDocentes()
                    .then(getDoc => {
                        for (let i = 0; i < getDoc.length; i++) {
                            docentes[i] = getDoc[i];
                            docentes[i]['pos'] = i;
                        }
                        panelOpciopnes();
                        cerrarM.load = true;
                        cerrarM.login = true;
                        cargar(1);
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

    $("#Cerrar").click(() => cerrar().then(() => window.location = "/Academias").catch(() => window.location = "/Academias"));

    $("#inicio").click(() => window.location = "/academias/panel.html");

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

    $("#accion")[0].innerHTML = sessionStorage.getItem("accion");

    $("#portada").change(file => {
        file = file.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => $("#img-portada")[0].src = reader.result;
        }
    });

    const puesto = data => {
        if (data.Pre) {
            return 'Presidente';
        } else if (data.Sec) {
            return 'Secretario';
        } else {
            return 'Integrante';
        }
    }

    const cargar = (pagina) => {
        datos = docentes.filter(d => d.seleccionado);
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
                        <label>${puesto(datos[i])}</label>
                    </div>
                </div>
            `;
        }
        pie(pagina, max);
    };

    const panelOpciopnes = () => {
        if (sessionStorage.getItem("accion").includes("Crear")) {
            $("#panelO")[0].innerHTML = `
                <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                    <label name="options" class="btn btn-secondary active opciones text-input">
                        <input type="radio" name="options" id="Pre" autocomplete="off"> Presidente
                    </label>
                    <label name="options" class="btn btn-secondary opciones text-input">
                        <input type="radio" name="options" id="Sec" autocomplete="off"> Secretario
                    </label>
                    <label name="options" class="btn btn-secondary opciones text-input">
                        <input type="radio" name="options" id="AddM" autocomplete="off"> Agregar miembro
                    </label>
                    <label name="options" class="btn btn-secondary opciones text-input">
                        <input type="radio" name="options" id="DelM" autocomplete="off"> Eliminar miembro
                    </label>
                </div>
                <div id="Opciones" class="mt-3 d-flex flex-column justify-content-center align-items-center">
                </div>
            `;
        }
        accionesMenu();
    };

    const listaDocentesPre = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            if (!docentes[i].Pre) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const accionesPre = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentesPre()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#SalvarJefe").keypress(k => {
            if (k.which == 13) {
                let nomina = k.target.value.split(" - ")[0];
                if (nomina.length > 0) {
                    $("#erroresJefe").html(``);
                    $("#SalvarJefe").val("");
                    let exPre = docentes.filter(d => d.Pre);
                    if (exPre.length > 0) {
                        docentes[exPre[0].pos].Sec = false;
                        docentes[exPre[0].pos].Pre = false;
                    }
                    let find = docentes.filter(d => d.nomina === nomina);
                    if (find.length > 0) {
                        docentes[find[0].pos].seleccionado = true;
                        docentes[find[0].pos].Pre = true;
                        docentes[find[0].pos].Sec = false;
                        cargar(1);
                        accionesPre();
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                } else {
                    $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    };

    const listaDocentesSec = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            if (!docentes[i].Sec) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const accionesSec = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentesSec()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#SalvarJefe").keypress(k => {
            if (k.which == 13) {
                let nomina = k.target.value.split(" - ")[0];
                if (nomina.length > 0) {
                    $("#erroresJefe").html(``);
                    $("#SalvarJefe").val("");
                    let exSec = docentes.filter(d => d.Sec);
                    if (exSec.length > 0) {
                        docentes[exSec[0].pos].Sec = false;
                        docentes[exSec[0].pos].Pre = false;
                    }
                    let find = docentes.filter(d => d.nomina === nomina);
                    if (find.length > 0) {
                        docentes[find[0].pos].seleccionado = true;
                        docentes[find[0].pos].Sec = true;
                        docentes[find[0].pos].Pre = false;
                        cargar(1);
                        accionesSec();
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                } else {
                    $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    };

    const listaDocentesAddM = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            if (!docentes[i].seleccionado) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const accionesAddM = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentesAddM()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#SalvarJefe").keypress(k => {
            if (k.which == 13) {
                let nomina = k.target.value.split(" - ")[0];
                if (nomina.length > 0) {
                    $("#erroresJefe").html(``);
                    $("#SalvarJefe").val("");
                    let find = docentes.filter(d => d.nomina === nomina);
                    if (find.length > 0) {
                        docentes[find[0].pos].seleccionado = true;
                        cargar(1);
                        accionesAddM();
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                } else {
                    $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    };

    const listaDocentesDelM = () => {
        let lista = '';
        for (let i = 0; i < docentes.length; i++) {
            if (docentes[i].seleccionado) {
                lista += `<option value="${docentes[i].nomina} - ${docentes[i].nombre}">`;
            }
        }
        return lista;
    };

    const accionesDelM = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentesDelM()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#SalvarJefe").keypress(k => {
            if (k.which == 13) {
                let nomina = k.target.value.split(" - ")[0];
                if (nomina.length > 0) {
                    $("#erroresJefe").html(``);
                    $("#SalvarJefe").val("");
                    let find = docentes.filter(d => d.nomina === nomina);
                    if (find.length > 0) {
                        docentes[find[0].pos].seleccionado = false;
                        docentes[find[0].pos].Pre = false;
                        docentes[find[0].pos].Sec = false;
                        accionesDelM();
                        accionesAddM();
                        cargar(1);
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                } else {
                    $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontro el docente, para mas informacion revise la ayuda</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    };

    const accionesMenu = () => {
        $("[name='options']").click(e => {
            switch (e.target.childNodes[1].attributes.id.value) {
                case "Pre":
                    accionesPre();
                    break;
                case "Sec":
                    accionesSec();
                    break;
                case "AddM":
                    accionesAddM();
                    break;
                case "DelM":
                    accionesDelM();
                    break;
            }
        })
    };

    $("#SalvarAcademia").click(() => {
        let academia = {
            claveA: $("#claveA")[0],
            nombre: $("#nombre")[0]
        };
        let valid = camposRequeridos(academia, ["claveA", "nombre"]);
        valid = validarClave(academia, "claveA") && valid;
        valid = validarClave(academia, "nombre") && valid;
        if (!valid) {
            return;
        }
        console.log(academia);
    });

    load();

});