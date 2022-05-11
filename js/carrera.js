$(document).ready(() => {

    $("#ayudaCarrera").click(() => {

        if (sessionStorage.getItem('accion') == "Crear") {

            $("#modales").html(`
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Información de ayuda para el registro de una carrera</label>
                            </div>
                            <div class="modal-body">
                                <ul class="text-justify p-3">
                                    <li>
                                        <b>Los datos que son requeridos obligatoriamente:</b>
                                        <ul>
                                            <li>Nombre:
                                                <ul>
                                                    <li>
                                                        Puede contener letras, números y espacios.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Clave:
                                                <ul>
                                                    <li>
                                                        Debe contener al menos 3 cifras.
                                                    </li>
                                                    <li>
                                                        Puede contener letras, números y caracteres especiales.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Los datos que no son obligatorios:</b>
                                        <ul>
                                            <li>Foto:
                                                <ul>
                                                    <li>
                                                        Dar click en el icono: <img src="img/IconAgregar.png" style="width: 30px;"> y subir la foto del docente.
                                                    </li>
                                                    <li>
                                                        Se aceptan todos los formatos de imagen.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Jefe:
                                                <ul>
                                                    <li>
                                                        Se realiza una búsqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el Jefe a la carrera se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Agregar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una búsqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el miembro a la carrera se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Eliminar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una búsqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para eliminar el miembro a la carrera se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se eliminó, ya no visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <input id="cerrarAyuda" type="button" value="Salir" class="btn btn-secondary">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        } else {
            $("#modales").html(`
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Información de ayuda para editar una carrera.</label>
                            </div>
                            <div class="modal-body">
                                <ul class="text-justify p-3">
                                    <li>
                                        <b>Selección de carrera:</b>
                                        <ul>
                                            <li>Después del panel podrá visualizar un buscador de carrera, mismo que funciona con una búsqueda por clave – nombre. Al momento de dar click en el recuadro usted visualizará las carreras disponibles hasta ese momento puede seleccionar la
                                                que desea modificar y dar <b>enter</b>. Una vez hecho lo anterior le aparecerán los datos de la carrera seleccionada.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Los datos no son modificables:</b>
                                        <ul>
                                            <li>Nombre de la carrera
                                            </li>
                                            <li>Clave de la carrera
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Los datos que son modificables:</b>
                                        <ul>
                                            <li>Foto:
                                                <ul>
                                                    <li>
                                                        Dar click en el icono: <img src="img/IconAgregar.png" style="width: 30px;"> y subir la foto del docente.
                                                    </li>
                                                    <li>
                                                        Se aceptan todos los formatos de imagen.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Jefe:
                                                <ul>
                                                    <li>
                                                        Si ya existe un jefe asignado para la carrera, usted verá su información en ese apartado. Abajo hay un buscador por nómina – nombre, ahí es donde se realizará la búsqueda del nuevo Jefe.
                                                    </li>
                                                    <li>
                                                        Para visualizar la información del docente a asignar como jefe se presiona la tecla <b>enter</b>. Una vez comprobado que es la persona que desea asignar como jefe, dar click en el botón “Aplicar.”
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Agregar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una búsqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el miembro a la carrera se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Eliminar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una búsqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para eliminar el miembro a la carrera se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se eliminó, ya no visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Finalizar cambios:
                                                <ul>
                                                    <li>
                                                        Para finalizar todo se da click en el botón “Guardar”, si desea no guardar nada, da click en “Cancelar”. Los botones mencionados se encuentran al final de la página.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <input id="cerrarAyuda" type="button" value="Salir" class="btn btn-secondary">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        $("#modal").modal();

        $("#cerrarAyuda").click(() => {
            $("#modal").modal("hide");
            $(`[class="modal-backdrop show"]`).remove();
        });

    });

    let datos = [];

    let docentes = [];

    let = [];

    var cerrarM = {
        load: false,
        login: false
    };

    let misDatos;

    let edit;

    let carreras;

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

        if (!cerrar) {
            $('#modal').on('hidden.bs.modal', () => {
                if (!cerrarM.load) $("#modal").modal();
            });
        }

        $("#modal").modal();

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

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                validarPagina()
                    .then(() => {
                        misDatos = t;
                        cerrarM.load = true;
                        cerrarM.login = true;
                        docentesSinCarrera()
                            .then(t => {
                                docentes = t;
                                docentes.forEach(d => d["miembro"] = false);
                                panelOpciones();
                            })
                            .catch(e => {
                                console.log(e);
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                } else {
                                    cerrarModal();
                                    $("#alerta").html(`
                                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                            <strong>${e.responseJSON.msg}</strong>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    `);
                                }
                            })
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
                console.log(e);
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
        <li class="page-item ${pagina == i ? 'active' : ''}">
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
        datos = [];
        docentes.forEach(doc => {
            if (doc.seleccionado && !doc.miembro) {
                datos.push(doc);
            } else if (doc.miembro && parseInt(doc.activo) === 1) {
                datos.push(doc);
            }
        });
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
                        <label>${datos[i].jefe == 1 ? 'Jefe' : 'Integrante'}</label>
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

    const listaParaJefe = () => {
        let lista = '';
        docentes.forEach(d => {
            if (d.jefe != 1) {
                lista += `<option value="${d.nomina} - ${d.nombre}">`;
            }
        })
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
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
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
                                <strong>No se encontró el docente, para más información revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
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
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
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
                        $("#erroresJefe").html(`
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Agregado</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`);
                        find = find[0];
                        docentes[find.pos].seleccionado = true;
                        cargar(1);
                        accionesAdd();
                    } else {
                        $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontró el docente, para más información revise la ayuda</strong>
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
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
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
                            <strong>No se encontró el docente, para más información revise la ayuda</strong>
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

    const leerCarreras = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/leerCarreras.php",
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        })
    };

    const listaCarreras = () => {
        let lista = '';
        carreras.forEach(e => {
            lista += `<option value='${e.clave_carrera} - ${e.nombre}'>`;
        });
        return lista;
    };

    const getDocentesCarrera = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/docentesDeCarrera.php",
                dataType: "json",
                data: { clave: clave },
                type: "post",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const listaDocentesNoM = () => {
        let lista = '';
        docentes.forEach(d => {
            if (d.jefe != 1 && !d.miembro && !d.seleccionado) {
                lista += `<option value="${d.nomina} - ${d.nombre}">`;
            } else if (d.miembro && parseInt(d.activo) != 1) {
                lista += `<option value="${d.nomina} - ${d.nombre}">`;
            }
        })
        return lista;
    };

    const listaTodosM = () => {
        let lista = '';
        docentes.forEach(d => {
            if ((d.miembro && parseInt(d.activo) == 1) || d.seleccionado) {
                lista += `<option value="${d.nomina} - ${d.nombre}">`;
            }
        })
        return lista;
    };

    const panelOpciones = () => {
        let armado;
        if (sessionStorage.getItem("accion").includes("Crear")) {
            $("#busquedaCarreras").remove();
            armado = `
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
            `;
            accionesMenu(armado);
        } else {
            leerCarreras()
                .then(data => {
                    carreras = data;
                    $("#claveC").attr("disabled", "");
                    $("#busquedaCarreras").html(`
                        <div class="form-inline mx-auto">
                            <label class="form-label text-input mr-2">Búsqueda por clave/nombre</label>
                            <input id="posiblesCarrerasEdit" type="search" class="form-control text-input bg-input rounded-pill w-auto" list="listaCarrerasEdit">
                            <datalist id="listaCarrerasEdit">
                                ${listaCarreras()}
                            </datalist>
                        </div>
                    `);
                    $("#posiblesCarrerasEdit").keypress(k => {
                        if (k.which == 13) {
                            cargando();
                            let dato = k.target.value.split(" - ");
                            if (dato.length < 2) {
                                cerrarM.load = true;
                                cerrarModal();
                                $("#alerta").html(`
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
                                let find = carreras.find(f => f.clave_carrera === dato[0] && f.nombre === dato[1]);
                                if (find) {
                                    $("#alerta").html(``);
                                    getDocentesCarrera(find.clave_carrera)
                                        .then(docGe => {
                                            docentesSinCarrera()
                                                .then(doc => {
                                                    docentes = doc;
                                                    docentes.forEach(d => d["miembro"] = false);
                                                    docGe.forEach(m => {
                                                        m["miembro"] = true;
                                                        docentes.push(m);
                                                    });
                                                    for (let i = 0; i < docentes.length; i++) {
                                                        docentes[i]["pos"] = i;
                                                    }
                                                    $("#nombreC")[0].value = find.nombre;
                                                    $("#claveC")[0].value = find.clave_carrera;
                                                    $("#img-portada")[0].src = find.foto_portada;
                                                    $("#posiblesCarrerasEdit")[0].value = "";
                                                    cargar(1);
                                                    cerrarM.load = true;
                                                    cerrarModal();
                                                    edit = true;
                                                }).catch(e => {
                                                    console.log(e);
                                                })
                                        })
                                        .catch(e => {
                                            console.log(e);
                                            cerrarM.load = true;
                                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                                cerrarModal();
                                                login();
                                            } else {
                                                cerrarModal();
                                                $("#alerta").html(`
                                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                        <strong>${e.responseJSON.msg}</strong>
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                `);
                                            }
                                        })
                                } else {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    $("#alerta").html(`
                                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                                            <strong class="h1">No se encontró la carrera</strong>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    `);
                                }
                            }
                        }
                    })
                    let jefe = `
                        <label name="options" class="btn btn-secondary active opciones text-input">
                            <input type="radio" name="options" id="option1" autocomplete="off"> Jefe
                        </label>`;
                    armado = `
                        <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                        ${misDatos["nivel"] == 0 || misDatos["nivel"] == 1 ? jefe : ''}
                        <label name="options" class="btn btn-secondary opciones text-input">
                            <input type="radio" name="options" id="option3" autocomplete="off"> Agregar miembro
                        </label>
                        <label name="options" class="btn btn-secondary opciones text-input">
                            <input type="radio" name="options" id="option3" autocomplete="off"> Eliminar miembro
                        </label>
                        </div>
                        <div id="Opciones" class="mt-3 d-flex flex-column justify-content-center align-items-center">
                        </div>
                    `;
                    accionesMenu(armado);
                }).catch(e => {
                    console.log(e);
                    if (e.responseText == "Solicitar Reinicio de sesion") {
                        cerrarM.load = true;
                        cerrarModal();
                        login();
                    } else {
                        console.log(e);
                        cerrarModal();
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
    };

    const getJefe = () => docentes.filter(m => m.jefe == 1);

    const jefeEdit = () => {
        let jefe = getJefe();
        if (jefe.length > 0) {
            jefe = jefe[0];
        } else {
            jefe = {
                "foto": "img/IconLog.png",
                "nombre": "",
                "nomina": ""
            }
        }
        $("#Opciones").html(`
            <img name="DatosJ" src="${jefe["foto"]}" class="img-fluid foto-opcional">
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Nomina</label>
                <input name="DatosJ" type="text" value="${jefe["nomina"]}" class="form-control text-input bg-input rounded-pill" disabled>
            </div>
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Nombre</label>
                <input name="DatosJ" type="text" value="${jefe["nombre"]}" class="form-control text-input bg-input rounded-pill" disabled>
            </div>
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
                <input id="salvarM" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaParaJefe()}
                </datalist>
            </div>
            <div class="d-flex justify-content-center mb-4 mt-3">
                <input id="cancelarJefe" type="button" value="Cancelar" class="btn bg-btn-aplicar mr-3">
                <input id="cambiarJefe" type="button" value="Aplicar" class="btn btn-primary-c">
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#salvarM").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find = docentes.filter(f => parseInt(f.nomina) == parseInt(jefe[0]) && (f.nombre) == (jefe[1]));
                    if (find && find.length > 0) {
                        find = find[0];
                        $("[name='DatosJ']")[0].src = find.foto;
                        $("[name='DatosJ']")[1].value = find.nomina;
                        $("[name='DatosJ']")[2].value = find.nombre;
                        $("#salvarM")[0].value = "";
                        $("#erroresJefe").html(``);
                    } else {
                        $("#erroresJefe").html(`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>No se encontró el docente, para más información revise la ayuda</strong>
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
        $("#cambiarJefe").click(evt => {
            let nomina = $("[name='DatosJ']")[1].value;
            docentes.forEach(d => {
                if (parseInt(d.nomina) == parseInt(nomina)) {
                    d.jefe = 1;
                    d.seleccionado = true;
                    $("#erroresJefe").html(`
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Cambio exitoso</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
                if (d.jefe == 1 && parseInt(d.nomina) != parseInt(nomina)) {
                    d.jefe = 0;
                }
            });
            cargar(1);
            $("#listamodelos").html(listaParaJefe());
        });
        $("#cancelarJefe").click(() => jefeEdit());
    };

    const miembrosEdit = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
                <input id="salvarM" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaDocentesNoM()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#salvarM").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find = docentes.filter(f => parseInt(f.nomina) == parseInt(jefe[0]) && f.nombre === jefe[1]);
                    if (find) {
                        let msg;
                        find = find[0];
                        docentes[find.pos].seleccionado = true;
                        if (docentes[find.pos].miembro) {
                            msg = "El docente se reactivo";
                            docentes[find.pos].activo = 1;
                        } else {
                            msg = "Agregado";
                        }
                        $("#erroresJefe").html(`
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                        cargar(1);
                        $("#salvarM")[0].value = "";
                        $("#listamodelos").html(listaDocentesNoM());
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontró el docente, para más información revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
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

    const delEdit = () => {
        $("#Opciones").html(`
            <div class="form-inline mt-2">
                <label class="form-label text-input ancho">Búsqueda por nómina/nombre</label>
                <input id="salvarM" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                <datalist id="listamodelos">
                    ${listaTodosM()}
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        $("#salvarM").keypress(k => {
            if (k.which == 13) {
                let jefe = k.target.value.split(" - ");
                if (jefe.length > 1) {
                    let find = docentes.filter(f => parseInt(f.nomina) == parseInt(jefe[0]) && f.nombre === jefe[1]);
                    if (find) {
                        let msg;
                        find = find[0];
                        docentes[find.pos].jefe = 0;
                        if (docentes[find.pos].miembro) {
                            docentes[find.pos].activo = 0;
                            msg = "Al ser miembro, se desactivara";
                        } else {
                            msg = "Al no ser miembro, no se almacenara";
                        }
                        docentes[find.pos].seleccionado = false;
                        $("#salvarM")[0].value = "";
                        $("#listamodelos").html(listaTodosM());
                        cargar(1);
                        $("#erroresJefe").html(`
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${msg}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    } else {
                        $("#erroresJefe").html(`
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No se encontró el docente, para más información revise la ayuda</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
                    }
                } else {
                    $("#erroresJefe").html(`
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
    };

    const accionesMenu = menu => {
        cerrarModal();
        $("#MenuOpciones").html(menu);
        $('[name="options"]').click(evt => {
            if (sessionStorage.getItem("accion").includes("Crear")) {
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
            } else if (edit) {
                $("#alerta").html(``);
                switch (evt.target.innerText) {
                    case "Jefe":
                        jefeEdit();
                        break;
                    case "Agregar miembro":
                        miembrosEdit();
                        break;
                    case "Eliminar miembro":
                        delEdit();
                        break;
                }
            } else {
                $("#alerta").html(`
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Seleccione una carrera a editar</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        });
    }

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
                resolve({ path: "img/portada.png" });
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
    };

    const actualizarCarrera = (miembros, nuevos, foto) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/actualizarCarrera.php",
                dataType: "json",
                type: "POST",
                data: { miembros: miembros, nuevos: nuevos, clave: $("#claveC")[0].value, foto: foto, nombre: $("#nombreC").val() },
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    $("#salvarCarrera").click(() => {
        if (sessionStorage.getItem("accion").includes("Crear")) {
            cargando();
            let data = {
                nombreC: $("#nombreC")[0],
                claveC: $("#claveC")[0],
                foto: "img/portada.png",
                jefe: docentes.filter(f => f.seleccionado && f.jefe == 1),
                miembros: docentes.filter(f => f.seleccionado && f.jefe == 0)
            };
            let valid = camposRequeridos(data, ["nombreC", "claveC"]);
            valid = validarClave(data, "claveC") && valid;
            valid = validarClave(data, "nombreC") && valid;

            let foto = $("#foto")[0].files[0];
            var formData = new FormData();
            if (foto) {
                let nombre = `${data["claveC"]}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
                var file = new File([], nombre);
                formData.append("file", foto);
                formData.append("name", file);
                data["foto"] = formData;
            }

            if (valid) {
                console.log("SI");
                salvarImg(formData, foto)
                    .then((t) => {
                        console.log("SI2");
                        data["foto"] = t.path;
                        salvarCarrera(data)
                            .then(cs => {
                                console.log(cs);
                                cerrarM.load = true;
                                cerrarModal();
                                reset();
                            })
                            .catch((e) => {
                                console.log(e);
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
        } else if (edit) {
            cargando();
            $("#alerta").html(``);
            let miembros = docentes.filter(d => d.miembro);
            let nuevos = docentes.filter(d => d.seleccionado);
            let foto = $("#foto")[0].files[0];
            var formData = new FormData();
            if (foto) {
                let nombre = `${$("#claveC")[0].value}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
                var file = new File([], nombre);
                formData.append("file", foto);
                formData.append("name", file);
            }

            salvarImg(formData, foto)
                .then((t) => {
                    actualizarCarrera(miembros, nuevos, t.path)
                        .then(update => {
                            cerrarM.load = true;
                            cerrarModal();
                            edit = false;
                            $("#alerta").html(`
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Actualización exitosa</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `);
                            reset();
                        })
                        .catch(e => {
                            console.log(e);
                            cerrarM.load = true;
                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                cerrarModal();
                                login();
                            } else {
                                cerrarModal();
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
                })
                .catch((e) => {
                    console.log(e);
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
        } else {
            $("#alerta").html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Seleccione una carrera a editar</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        }
    });

    $("#cancelar").click(() => reset());

    const reset = () => {
        docentesSinCarrera()
            .then(doc => {
                docentes = doc;
                docentes.forEach(d => d["miembro"] = false);
                cargar(1);
            });
        $("#nombreC")[0].value = "";
        $("#claveC")[0].value = "";
        $("#nombreC")[0].className = $("#nombreC")[0].className.replace(" is-valid", "");
        $("#claveC")[0].className = $("#claveC")[0].className.replace(" is-valid", "")
        $("#img-portada")[0].src = "img/portada.png";
        panelOpciones();
    };

});