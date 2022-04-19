$(document).ready(() => {

    $("#ayudaAcademia").click(() => {

        if (sessionStorage.getItem('accion') == "Crear") {

            $("#modales").html(`
                <div class="modal" id="modal">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center h4">
                                <label>Información de ayuda para el registro de una Academia</label>
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
                                                        Dar click en el icono: <img src="img/IconAgregar.png" style="width: 30px;"> y subir la foto de la academia.
                                                    </li>
                                                    <li>
                                                        Se aceptan todos los formatos de imagen.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Presidente:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el Presidente a la Academia se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Secretario:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el Secretario a la Academia se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Agregar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el miembro a la Academia se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Eliminar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para eliminar el miembro de la Academia se presiona la tecla <b>enter</b>.
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
                                <label>Información de ayuda para editar una Academia.</label>
                            </div>
                            <div class="modal-body">
                                <ul class="text-justify p-3">
                                    <li>
                                        <b>Selección de Academia:</b>
                                        <ul>
                                            <li>Después del panel podrá visualizar un buscador de Academia, mismo que funciona con una búsqueda por clave – nombre. Al momento de dar click en el recuadro usted visualizará las Academias disponibles hasta ese momento, puede seleccionar la
                                                que desea modificar y dar <b>enter</b>. Una vez hecho lo anterior le aparecerán los datos de la Academia seleccionada.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Los datos no son modificables:</b>
                                        <ul>
                                            <li>Nombre de la Academia
                                            </li>
                                            <li>Clave de la Academia
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Los datos que son modificables:</b>
                                        <ul>
                                            <li>Foto:
                                                <ul>
                                                    <li>
                                                        Dar click en el icono: <img src="img/IconAgregar.png" style="width: 30px;"> y subir la foto de la Academia.
                                                    </li>
                                                    <li>
                                                        Se aceptan todos los formatos de imagen.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Presidente:
                                                <ul>
                                                    <li>
                                                        Si ya existe un presidente asignado para la Academia, usted verá su información en ese apartado. Abajo hay un buscador por nómina – nombre, ahí es donde se realizará la búsqueda del nuevo presidente.
                                                    </li>
                                                    <li>
                                                        Para visualizar la información del docente a asignar como presidente se presiona la tecla <b>enter</b>. Una vez comprobado que es la persona que desea asignar como presidente, dar click en el botón “Aplicar.”
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Secretario:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el Secretario a la Academia se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Agregar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para agregar el miembro a la Academia se presiona la tecla <b>enter</b>.
                                                    </li>
                                                    <li>
                                                        Si se agregó, visualizará su información en el apartado de "Miembros" que se encuentra abajo.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>Eliminar Miembro:
                                                <ul>
                                                    <li>
                                                        Se realiza una busqueda por Nómina - Nombre
                                                    </li>
                                                    <li>
                                                        Para eliminar el miembro a la Academia se presiona la tecla <b>enter</b>.
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

    var misDatos;
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

    const getAcademiasEdit = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/getAllAcademias.php",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const listaAcademias = acas => {
        let lista = '';
        acas.forEach(e => {
            lista += `<option value='${e.clave_academia} - ${e.nombre}'>`;
        });
        return lista;
    };

    const getDocentesAcademia = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/getDocentesAcademias.php",
                data: {
                    clave: clave
                },
                type: "Post",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const cargarAcademisaEdit = acas => {
        $("#BusquedasAcademias").html(`
            <div class="form-inline mx-auto">
                <label class="form-label text-input mr-2">Busqueda por clave/nombre</label>
                <input id="posiblesAcademiasEdit" type="search" class="form-control text-input bg-input rounded-pill w-auto" list="listaAcademias">
                <datalist id="listaAcademias">
                </datalist>
            </div>
        `);
        removerGuardados($("#listaAcademias")[0]);
        $("#listaAcademias").html(listaAcademias(acas));
        $("#posiblesAcademiasEdit").keypress(k => {
            if (k.which == 13) {
                cargando();
                let valor = k.target.value.split(" - ");
                let clave;
                let nombre = '';
                for (let i = 0; i < valor.length; i++) {
                    if (i > 1) {
                        nombre += ' - ';
                    }
                    if (i == 0) {
                        clave = valor[i];
                    } else {
                        nombre += valor[i];
                    }
                }
                let f = acas.filter(f => f.clave_academia == clave && f.nombre == nombre);
                if (f.length > 0) {
                    $("#alerta").html(``);
                    f = f[0];
                    $("#img-portada")[0].src = f.foto;
                    $("#claveA").val(f.clave_academia);
                    $("#nombre").val(f.nombre);
                    getDocentesAcademia(f.clave_academia)
                        .then(t => {
                            for (let i = 0; i < t.length; i++) {
                                docentes[i] = {};
                                docentes[i]['pos'] = i;
                                docentes[i]['nomina'] = t[i].nomina;
                                docentes[i]['nombre'] = t[i].nombre;
                                docentes[i]['foto'] = t[i].foto;
                                if (t[i].puesto.length > 0) {
                                    docentes[i]['seleccionado'] = true;
                                    docentes[i].ori = true;
                                } else {
                                    docentes[i]['seleccionado'] = false;
                                    docentes[i]['Pre'] = false;
                                    docentes[i]['Sec'] = false;
                                    docentes[i]['ori'] = false;
                                }
                                if (t[i].puesto == 'Presidente') {
                                    docentes[i]['Pre'] = true;
                                    docentes[i]['Sec'] = false;
                                }
                                if (t[i].puesto == 'Secretario') {
                                    docentes[i]['Sec'] = true;
                                    docentes[i]['Pre'] = false;
                                }
                            }
                            panelOpciopnes();
                            cargar(1);
                        })
                        .catch(e => {
                            if (e.responseText == "Solicitar Reinicio de sesion") {
                                cerrarM.load = true;
                                cerrarModal();
                                login();
                            }
                        });
                } else {
                    cerrarM.load = true;
                    cerrarModal();
                    $("#alerta").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontro la academia</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    };

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                misDatos = t;
                validarPagina()
                    .then(() => {
                        if (sessionStorage.getItem("accion").includes("Crear")) {
                            $("#BusquedasAcademias").remove();
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
                                    if (e.responseText == "Solicitar Reinicio de sesion") {
                                        cerrarM.load = true;
                                        cerrarModal();
                                        login();
                                    }
                                });
                        } else {
                            $("#nombre").attr("disabled", true);
                            $("#claveA").attr("disabled", true);
                            getAcademiasEdit()
                                .then(acas => {
                                    cargarAcademisaEdit(acas);
                                    cerrarM.load = true;
                                    cerrarModal();
                                })
                                .catch(e => {
                                    console.log(e);
                                    if (e.responseText == "Solicitar Reinicio de sesion") {
                                        cerrarM.load = true;
                                        cerrarModal();
                                        login();
                                    } else {
                                        window.location = "/Academias/Panel.html";
                                    }
                                })
                        }
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

    $("#foto").change(file => {
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
        accionesMenu();
        if (sessionStorage.getItem("accion").includes("Editar")) {
            cerrarM.load = true;
            cerrarModal();
        }
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

    const infoPres = () => {
        if (sessionStorage.getItem("accion").includes("Editar")) {
            let jefe = docentes.find(d => d.Pre);
            if (!jefe) {
                jefe = {
                    foto: 'img/IconLog.png',
                    nomina: '',
                    nombre: ''
                }
            }
            return `
                <img name="DatosJ" src="${jefe["foto"]}" class="img-fluid foto-opcional">
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Nomina</label>
                    <input name="DatosJ" type="text" value="${jefe["nomina"]}" class="form-control text-input bg-input rounded-pill" disabled>
                </div>
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Nombre</label>
                    <input name="DatosJ" type="text" value="${jefe["nombre"]}" class="form-control text-input bg-input rounded-pill" disabled>
                </div>
            `;
        }
        return '';
    };

    const cambiarPre = () => {
        if (sessionStorage.getItem("accion").includes("Crear") || misDatos['nivel'] == 0 || misDatos['nivel'] == 1) {
            return `
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                    <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                    <datalist id="listamodelos">
                    </datalist>
                </div>
            `;
        }
        return '';
    };

    const accionesPre = () => {
        let result = cambiarPre();
        $("#Opciones").html(`
            ${infoPres()}
            ${result}
            <div id="erroresJefe">
            </div>
        `);
        if (result.length > 0) {
            removerGuardados($("#listamodelos")[0]);
            $("#listamodelos").html(listaDocentesPre());
        }
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
                        $("#erroresJefe").html(`
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Cambio exitoso</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `);
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

    const infoSec = () => {
        if (sessionStorage.getItem("accion").includes("Editar")) {
            let jefe = docentes.find(d => d.Sec);
            if (!jefe) {
                jefe = {
                    foto: 'img/IconLog.png',
                    nomina: '',
                    nombre: ''
                }
            }
            return `
                <img name="DatosJ" src="${jefe["foto"]}" class="img-fluid foto-opcional">
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Nomina</label>
                    <input name="DatosJ" type="text" value="${jefe["nomina"]}" class="form-control text-input bg-input rounded-pill" disabled>
                </div>
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Nombre</label>
                    <input name="DatosJ" type="text" value="${jefe["nombre"]}" class="form-control text-input bg-input rounded-pill" disabled>
                </div>
            `;
        }
        return '';
    };

    const cambiarSec = () => {
        if (sessionStorage.getItem("accion").includes("Crear") || misDatos['nivel'] == 0 || misDatos['nivel'] == 1) {
            return `
                <div class="form-inline mt-2">
                    <label class="form-label text-input ancho">Busqueda por nomina/nombre</label>
                    <input id="SalvarJefe" type="search" class="form-control text-input bg-input rounded-pill" list="listamodelos">
                    <datalist id="listamodelos">
                    </datalist>
                </div>
            `;
        }
        return '';
    };

    const accionesSec = () => {
        let result = cambiarSec();
        $("#Opciones").html(`
            ${infoSec()}
            ${result}
            <div id="erroresJefe">
            </div>
        `);
        if (result.length > 0) {
            removerGuardados($("#listamodelos")[0]);
            $("#listamodelos").html(listaDocentesSec());
        }
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
                        $("#erroresJefe").html(`
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Cambio exitoso</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
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
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        removerGuardados($("#listamodelos")[0]);
        $("#listamodelos").html(listaDocentesAddM());
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
                </datalist>
            </div>
            <div id="erroresJefe">
            </div>
        `);
        removerGuardados($("#listamodelos")[0]);
        $("#listamodelos").html(listaDocentesDelM());
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

    const guardarAcademia = academia => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/salvarAcademia.php",
                data: {
                    academia: academia
                },
                type: "POST",
                success: s => resolve(s),
                error: e => reject(e)
            })
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
                resolve({ path: "img/portada.png" });
            }
        });
    };

    const reset = () => {
        if (sessionStorage.getItem("accion").includes("Editar")) {
            $("#posiblesAcademiasEdit").val("");
        }
        docentes.forEach(d => {
            d.Pre = false;
            d.Sec = false;
            d.seleccionado = false;
        })
        $("#nombre")[0].value = "";
        $("#claveA")[0].value = "";
        $("#nombre")[0].className = $("#nombre")[0].className.replace(" is-valid", "");
        $("#claveA")[0].className = $("#claveA")[0].className.replace(" is-valid", "")
        $("#img-portada")[0].src = "img/portada.png";
        cargar(1);
        panelOpciopnes();
    };

    const actualizarAcademia = (aca) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/actualizarAcademia.php",
                data: {
                    academia: aca
                },
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    $("#SalvarAcademia").click(() => {
        let academia = {
            claveA: $("#claveA")[0],
            nombre: $("#nombre")[0],
            foto: "img/portada.png",
        };
        let valid = camposRequeridos(academia, ["claveA", "nombre"]);
        valid = validarClave(academia, "claveA") && valid;
        valid = validarClave(academia, "nombre") && valid;
        if (!valid) {
            return;
        }
        academia.docentes = docentes.filter(d => d.seleccionado);
        let foto = $("#foto")[0].files[0];
        var formData = new FormData();
        if (foto) {
            let nombre = `${academia["claveA"]}.${foto["name"].split(".")[foto["name"].split(".").length - 1]}`;
            var file = new File([], nombre);
            formData.append("file", foto);
            formData.append("name", file);
            data["foto"] = formData;
        }
        cargando();
        salvarImg(formData, foto)
            .then(img => {
                academia.foto = img.path;
                if (sessionStorage.getItem("accion").includes("crear")) {
                    guardarAcademia(academia)
                        .then(t => {
                            reset();
                            cerrarM.load = true;
                            cerrarModal();
                            $("#alerta").html(`
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Registro exitoso</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `);
                        })
                        .catch(e => {
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
                    for (let i = 0; i < docentes.length; i++) {
                        if (!docentes[i].seleccionado && docentes[i].ori) {
                            docentes[i].act = 0;
                        }
                        if (docentes[i].seleccionado) {
                            docentes[i].act = 1;
                        }
                        if (docentes[i].Pre) {
                            docentes[i].pre = 1;
                        } else {
                            docentes[i].pre = 0;
                        }
                        if (docentes[i].Sec) {
                            docentes[i].sec = 1;
                        } else {
                            docentes[i].sec = 0;
                        }
                    }
                    academia.docentes = docentes;
                    cerrarM.load = true;
                    cerrarModal();
                    actualizarAcademia(academia)
                        .then(t => {
                            cerrarM.load = true;
                            cerrarModal();
                            $("#alerta").html(`
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Actualizacion exitosa</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `);
                        })
                        .catch(e => {
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
                        })
                }
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

    load();

    $("#cancelar").click(() => {
        reset();
    });

});