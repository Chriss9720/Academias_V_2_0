$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    let allDoentes = [];

    let carreraInfo;
    let infoAcademias = [];
    let misDocs = [];
    let mat = [];

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

    const allDocentes = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/getAllDocentes.php",
                type: "POST",
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const armarLista = () => {
        let r = "";
        allDoentes.forEach(d => {
            r += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        removerGuardados($("#listaDocentes")[0]);
        $("#listaDocentes").html(r);
    };

    const infoBasica = (nomina, sp) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `php/${sp}.php`,
                data: { nomina: nomina },
                dataType: 'json',
                type: 'POST',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const mostrarCarrera = () => {
        let info = carreraInfo[0];
        $("#mostrar").html(`
            <img id="img-portada" src="${info.foto_portada}" class="portada img-fluid">
            <div class="arriba ml-3 form-inline">
                <img src="${info.FD}" class="img-fluid foto-opcional">
                <div class="d-flex flex-column">
                    <label class="text-dark h3 font-weight-bold">${info.clave_carrera} - ${info.carrera}</label>
                    <label class="h5">${info.ND}</label>
                </div>
            </div>
        `);
        $("#pie").html("");
    };

    const mostrarAcademia = () => {
        cargar(1, infoAcademias, 'Academias');
    };

    const mostrarDocs = async() => {
        await cargar(1, misDocs, 'Docs');
        $("[name='descargarPadre']").click(evt => {
            let i = evt.target.id.split("_")[1];
            window.open(`Academias/${misDocs[i].L2 || misDocs[i].localizacion}`)
        });
        $("[name='descargarEvi']").click(evt => {
            let i = evt.target.id.split("_")[1];
            window.open(`Academias/${misDocs[i].localizacion}`)
        });
    };

    const mostrarMat = () => {
        let r = "";
        mat.forEach(m => {
            r += `
                <label class="h2 mr-1 ml-1 mb-1">
                    <span class="badge badge-secondary">${m.materia}</span>
                </label>`;
        });
        $("#mostrar").html(r);
        $("#pie").html("");
    };

    const accionesMenu = () => {
        $('label[name="options"]').click(evt => {
            switch (evt.target.children[0].id) {
                case "Carrera":
                    mostrarCarrera();
                    break;
                case "Academias":
                    mostrarAcademia();
                    break;
                case "Documentos":
                    mostrarDocs();
                    break;
                case "Materias":
                    mostrarMat();
                    break;
            }
        });
    };

    $("#DocenteSel").keypress(async(k) => {
        if (k.which == 13) {
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
            $("#menuOpciones").html("");
            let find = allDoentes.find(f => f.nomina == clave && f.nombre == nombre);
            if (find) {
                $("#alerta").html(``);
                $("#datosDocentes").html(`
                    <img src="${find.foto}" class="img-fluid foto-opcional">
                    <div class="d-flex flex-column align-items-start ml-5">
                        <label class="text-dark h2 font-weight-bold">${find.nombre}</label>
                        <label class="h3 align-self-start">${find.telefono}</label>
                        <label class="h5 align-self-start">${find.correo}</label>
                    </div>
                `);
                let menu = "";
                await infoBasica(clave, 'infoBasicaCarrera')
                    .then(info => {
                        carreraInfo = info;
                        if (info && info.length > 0) {
                            menu += `
                                <label name="options" class="btn btn-secondary active opciones text-input">
                                    <input type="radio" name="options" id="Carrera" autocomplete="off"> Carrera
                                </label>
                            `;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        }
                    });
                await infoBasica(clave, 'infoBasicaAcademia')
                    .then(info => {
                        infoAcademias = info;
                        if (info && info.length > 0) {
                            menu += `
                                <label name="options" class="btn btn-secondary opciones text-input">
                                    <input type="radio" name="options" id="Academias" autocomplete="off"> Academias
                                </label>
                            `;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        }
                    });
                await infoBasica(clave, 'infoBasicaDocs')
                    .then(info => {
                        misDocs = info;
                        if (info && info.length > 0) {
                            menu += `
                                <label name="options" class="btn btn-secondary opciones text-input">
                                    <input type="radio" name="options" id="Documentos" autocomplete="off"> Documentos
                                </label>
                            `;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        }
                    });
                await infoBasica(clave, 'getMateriasDocente')
                    .then(info => {
                        mat = info;
                        if (info && info.length > 0) {
                            menu += `
                                <label name="options" class="btn btn-secondary opciones text-input">
                                    <input type="radio" name="options" id="Materias" autocomplete="off"> Materias
                                </label>
                            `;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        }
                    });
                $("#menuOpciones").html(menu);
                $("#mostrar").html(``);
                accionesMenu();
            } else {
                $("#alerta").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">No se encontro al docente</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }

        }
    })

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                allDocentes()
                    .then(AD => {
                        allDoentes = AD;
                        armarLista();
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

        if (entro) $("#pie")[0].innerHTML = cuerpo

        $(`a[name="pagina"]`).click(evt => cargar(evento(evt, max)));

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

    const getTarea = (t, i) => {
        if (t) {
            return `
                <div>
                    <label >Entrego: <b>${t}</b></label>
                    <span>
                        <i id='Evi_${i}' name="descargarEvi" class="fas fa-download click"></i>
                    </span>
                </div>`;
        } else {
            return "";
        }
    };

    const cargar = async(pagina, datos, armando) => {
        let mostrar = 3;
        let contenido = $("#mostrar")[0];
        let max = Math.ceil(datos.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        let r = "<div class='row'>";
        for (let i = inicio; i < total && i < datos.length; i++) {
            switch (armando) {
                case "Academias":
                    r += `
                        <div class="col-4">
                            <div class="d-flex flex-column align-items-center">
                                <div style="background-image: url('${datos[i].foto_portada}')" class="img-fluid areaFondo d-flex justify-content-center align-items-end"></div>
                                <img src="${datos[i].foto}" class="img-fluid imgRelleno">
                                <label class="text-input">${datos[i].clave_academia} - ${datos[i].nombre}</label>
                            </div>
                        </div>
                    `;
                    break;
                case "Docs":
                    await leerEv(datos[i].localizacionJson)
                        .then(json => datos[i].data = json)
                        .catch(e => console.log(e));
                    let desc;
                    let tarea;
                    let sem;
                    switch (datos[i].PADRE) {
                        case 'Actas':
                            desc = datos[i].data.Acuerdos[(datos[i].punto) - 1].acuerdo;
                            sem = datos[i].data.Sem;
                            tarea = datos[i].data.Acuerdos[(datos[i].punto) - 1].tareas[(datos[i].no_tarea - 1)];
                            break;
                        case "Planes":
                            sem = datos[i].data.datos.semestre;
                            desc = datos[i].data[datos[i].punto].Acciones;
                            tarea = datos[i].data[(datos[i].punto)].tareas[(datos[i].no_tarea - 1)];
                            break;
                        case "Evaluacion":
                            sem = datos[i].data.infoDoc.periodo;
                            if (datos[i].localizacion.includes('EVPresidente')) {
                                desc = "Evaluacion de Presidente";
                            } else if (datos[i].localizacion.includes('EVDocente')) {
                                desc = "Evaluacion de Docente";
                            } else {
                                desc = "Evaluacion de Secretario";
                            }
                            break;
                    }
                    r += `
                        <div class="col-4">
                            <div class="d-flex flex-column align-items-center">
                                <img src="img/pdf.ico" class="img-fluid img-pdf">
                                <label >Semestre: <b>${sem}</b></label>
                                <div>
                                    <label >Tipo: <b>${datos[i].PADRE}</b></label>
                                    <span>
                                        <i id='Padre_${i}'  name="descargarPadre" class="fas fa-download click"></i>
                                    </span>
                                </div>
                                <label >Descripcion: <b>${desc}</b></label>
                                ${getTarea(tarea,i)}
                            </div>
                        </div>
                    `;
                    break;
            }
        }
        contenido.innerHTML = `${r}</div>`
        pie(pagina, max);
    };

});