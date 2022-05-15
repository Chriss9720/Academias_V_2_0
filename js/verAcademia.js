$(document).ready(() => {

    var cerrarM = {
        load: false,
        login: false
    };

    var misDatos;

    var academias = [];

    var planesData = [];

    var planesActas = [];

    var docentes = [];

    var evi = [];

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

    const getAllAcademiasInfo = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getAllAcademias.php',
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            })
        });
    };

    const armarAcademias = () => {
        let r = "";
        academias.forEach(a => {
            r += `<option value="${a.clave_academia} - ${a.nombre}">`;
        })
        removerGuardados($("#listaAcademias")[0]);
        $("#listaAcademias").html(r);
    };

    const getPre = (clave, puesto) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getPuestoAcademia.php',
                data: { clave: clave, puesto: puesto },
                type: 'POST',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getPlanesAcademia = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getPlanesAcademia.php',
                data: { clave: clave },
                type: 'POSt',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getActasAcemia = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getActasAcademia.php',
                data: { clave: clave },
                type: 'POSt',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getAgenda = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getAgendaAcademia.php',
                data: { clave: clave },
                type: 'POSt',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getDocntes = clave => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getDocentesAcademia.php',
                data: { clave: clave },
                type: 'POSt',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const buscador = () => {
        $("#Buscador").html(`
            <div class="container mt-3">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="form-inline mb-2">
                        <label class="form-label text-input mr-3">Búsqueda por nomina/nombre</label>
                        <input id="docenteSel" type="search" class="form-control text-input bg-input rounded-pill mx-auto" list="listaDocentes">
                        <datalist id="listaDocentes">
                        </datalist>
                    </div>
                    <input id="Borrar" value="Borrar" class="btn btn-danger ml-2" type="button">
                </div>
            </div>
        `);
        removerGuardados($("#listaDocentes")[0]);
        let r = "";
        docentes.forEach(d => {
            r += `<option value="${d.nomina} - ${d.nombre}">`;
        });
        $("#listaDocentes").html(r);
        $("#docenteSel").keypress(k => {
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
                let find = docentes.find(f => f.nomina == clave && f.nombre == nombre);
                if (find) {
                    $("#alerta").html(``);
                    docentes.forEach(d => d.v = d.nomina == clave);
                } else {
                    docentes.forEach(d => d.v = true);
                    $("#alerta").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">No se encontró al docente</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
                cargarDocentes(1);
            }
        });
        $("#Borrar").click(() => {
            $("#alerta").html(``);
            $("#docenteSel").val("");
            docentes.forEach(d => d.v = true);
            cargarDocentes(1);
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

    const getEvideciaActa = id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getEvideciaActa.php',
                data: { id: id },
                type: 'POST',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const getEvideciaPlanes = id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getEvideciaPlanes.php',
                data: { id: id },
                type: 'POST',
                dataType: 'json',
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cargarInfoAcademia = async(datos) => {
        $("#infoAcademia").html(`
            <div class="container">
                <img id="img-portada" src="${datos.foto}" class="portada img-fluid">
            </div>
            <div class="container font-weight-bold h3 text-center mb-3 mt-3">
                ${datos.clave_academia} - ${datos.nombre}
            </div>
        `);
        let PS = "";
        await getPre(datos.clave_academia, 'Presidente')
            .then(pre => {
                PS += `
                <div class="col-6 mx-auto">
                    <div class="h1 text-center bg-menu-principal">Presidente</div>
                    <div class="mt-3 d-flex flex-column justify-content-center align-items-center">
                        <div class="col-4">
                            <div class="d-flex flex-column align-items-center">
                                <img src="${pre[0].foto}" class="img-fluid foto-opcional">
                                <label class="text-input">${pre[0].nomina}</label>
                                <label>${pre[0].nombre}</label>
                                <label>${pre[0].correo}</label>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        await getPre(datos.clave_academia, 'Secretario')
            .then(pre => {
                PS += `
                <div class="col-6 mx-auto">
                    <div class="h1 text-center bg-menu-principal">Secretario</div>
                    <div class="mt-3 d-flex flex-column justify-content-center align-items-center">
                        <div class="col-4">
                            <div class="d-flex flex-column align-items-center">
                                <img src="${pre[0].foto}" class="img-fluid foto-opcional">
                                <label class="text-input">${pre[0].nomina}</label>
                                <label>${pre[0].nombre}</label>
                                <label>${pre[0].correo}</label>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        await getPlanesAcademia(datos.clave_academia)
            .then(async(planes) => {
                planesData = [];
                for (let i = 0; i < planes.length; i++) {
                    if (isPresidente() || isSecretario() | isSuper()) {
                        await getEvideciaPlanes(planes[i].id)
                            .then(async(ev) => {
                                planes[i].ev = ev;
                                await leerEv(planes[i].localizacionJson)
                                    .then(json => {
                                        planes[i].datosEv = json;
                                    }).catch(e => {
                                        if (e.responseText == "Solicitar Reinicio de sesion") {
                                            cerrarM.load = true;
                                            cerrarModal();
                                            login();
                                        }
                                    });
                            }).catch(e => {
                                if (e.responseText == "Solicitar Reinicio de sesion") {
                                    cerrarM.load = true;
                                    cerrarModal();
                                    login();
                                }
                            });
                    }
                    planesData.push(planes[i]);
                }
                cargarPlanes(1);
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        await getActasAcemia(datos.clave_academia)
            .then(async(actas) => {
                planesActas = [];
                for (let i = 0; i < actas.length; i++) {
                    if (isPresidente() || isSecretario() | isSuper()) {
                        await getEvideciaActa(actas[i].id_acta)
                            .then(async(ev) => {
                                actas[i].ev = ev;
                                await leerEv(actas[i].localizacionJson)
                                    .then(json => {
                                        actas[i].datosEv = json;
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
                    }
                    planesActas.push(actas[i]);
                }
                cargarActas(1);
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        await getAgenda(datos.clave_academia)
            .then(ag => {
                cargarAgenda(ag);
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        await getDocntes(datos.clave_academia)
            .then(doc => {
                for (let i = 0; i < doc.length; i++) {
                    docentes.push(doc[i]);
                    docentes[i].v = true;
                }
                buscador();
                cargarDocentes(1);
            })
            .catch(e => {
                if (e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    cerrarModal();
                    login();
                }
            });
        $("#PS").html(PS);
    };

    const isPresidente = () => misDatos.puesto.find(f => f == "Presidente") !== undefined;

    const isSecretario = () => misDatos.puesto.find(f => f == "Secretario") !== undefined;

    const isSuper = () => misDatos.nivel == 0 || misDatos == 1;

    $("#AcaSel").keypress(async(k) => {
        if (k.which === 13) {
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
            let find = academias.find(f => f.clave_academia == clave && f.nombre == nombre);
            if (find) {
                $("#alerta").html(``);
                await cargarInfoAcademia(find);
            } else {
                $("#PS").html('');
                $("#infoAcademia").html('');
                $("#alerta").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">No se encontró la academia</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
            cerrarM.load = true;
            cerrarM.login = true;
            cerrarModal();
        }
    });

    const load = () => {
        cargando();
        getMisDatos()
            .then(t => {
                misDatos = t;
                getAllAcademiasInfo()
                    .then(aca => {
                        academias = aca;
                        armarAcademias();
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
            return (name.includes('Final')) ? parseInt(max) : 1;
        }
    };

    const contenido = (name, pagina, i) => `
        <li class="page-item ${pagina == i ? 'active' : ''}">
            <a name="${name}" class="page-link click bg-input text-input ml-2 form-control text-center">${i}</a>
        </li>`;

    const pie = (pagina, max, name) => {
        let cuerpo = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${pagina == 1 ? "disabled" : "click"} flechaCont">
                <a name="${name}" class="page-link h-100 w-100 form-control bg-input" aria-label="previous">
                    <img src='img/FlechaIzq.png' class="img-fluid flecha" name='Inicio${name}'>
                </a>
            </li>`;
        let entro = max > 0;
        if (max <= 5) {
            for (let i = 1; i <= max; i++) cuerpo += contenido(name, pagina, i);
        } else {
            if (pagina == max) {
                for (let i = max - 4; i <= max; i++) cuerpo += contenido(name, pagina, i);
            } else if ((pagina + 4) <= max) {
                if ((pagina - 2) <= 1) {
                    for (let i = 1; i <= 5; i++) cuerpo += contenido(name, pagina, i);
                } else if ((pagina + 2) == max) {
                    for (let i = pagina; i <= (pagina + 4); i++) cuerpo += contenido(name, pagina, i);
                } else {
                    for (let i = pagina - 3; i < (pagina + 2); i++) cuerpo += contenido(name, pagingita, i);
                }
            } else {
                for (let i = pagina - 3; i < (pagina + 2); i++) cuerpo += contenido(name, pagina, i);
            }
        }
        cuerpo += `
            <li class="page-item ${pagina == max ? "disabled" : "click"} flechaCont ml-3">
                <a name="${name}" class="page-link h-100 w-100 form-control bg-input" aria-label="next">
                    <img src='img/FlechaDer.png' class="img-fluid flecha" name='Final${name}'>
                </a>
            </li>
        </ul>`;

        if (name == "paginaPlanes") {
            if (entro) $("#piePlanes")[0].innerHTML = cuerpo;
        } else if (name == "paginaDocentes") {
            if (entro) $("#pieDocentes")[0].innerHTML = cuerpo;
        } else if (name == 'paginaInfo') {
            if (entro) $("#pieInfo")[0].innerHTML = cuerpo;
        } else {
            if (entro) $("#pieActas")[0].innerHTML = cuerpo;
        }

        $(`a[name="${name}"]`).click(evt => {
            if (evt.target.attributes.name.value === "paginaPlanes")
                cargarPlanes(evento(evt, max));
            else if (evt.target.attributes.name.value === "paginaActas")
                cargarActas(evento(evt, max));
            else if (evt.target.attributes.name.value === "paginaDocentes")
                cargarDocentes(evento(evt, max));
            else if (evt.target.attributes.name.value === "paginaInfo")
                cargarEvi(evento(evt, max));
        });

        $(`img[name="Inicio${name}"]`).click(evt => {
            if (evt.target.attributes.name.value === "IniciopaginaPlanes")
                cargarPlanes(1);
            else if (evt.target.attributes.name.value === "IniciopaginaActas")
                cargarActas(1);
            else if (evt.target.attributes.name.value === "IniciopaginaDocentes")
                cargarDocentes(1);
            else if (evt.target.attributes.name.value === "paginaInfo")
                cargarEvi(1);
        });

        $(`img[name="Final${name}"]`).click(evt => {
            if (evt.target.attributes.name.value === "FinalpaginaPlanes")
                cargarPlanes(max);
            else if (evt.target.attributes.name.value === "FinalpaginaActas")
                cargarActas(max);
            else if (evt.target.attributes.name.value === "FinalpaginaDocentes")
                cargarDocentes(max);
            else if (evt.target.attributes.name.value === "paginaInfo")
                cargarEvi(max);
        });

    };

    const getFecha = fecha => fecha.substring(0, 19);

    const armarPadre = (Semestre, date, id) => {
        $("#docPadre").html(`
            <h4>Plan de trabajo</h4>
            <img src="img/pdf.ico">
            <h5>Semestre: ${Semestre}</h5>
            <h5>fecha: ${date.substring(0, 19)}</h5>
            <span class="">
                <i name="descargarEvi" id="${id}" class="fas fa-download click"></i>
            </span>
        `);
    };

    const opcionP = i => {
        let html = (isSuper() || isPresidente() || isSecretario() ?
            `
                <span style="font-size: 2rem;" name="Planes">
                    <i class="fas fa-eye click" id="Planes_${i}"></i>
                </span>
            ` :
            `
                <span style="font-size: 2rem;" name="descargarPadre">
                    <i class="fas fa-download click" id="Planes_${i}"></i>
                </span>
            `);
        return html;
    };

    const cargarPlanes = pagina => {
        let planes = $("#planes")[0];
        let mostrar = 4;
        let max = Math.ceil(planesData.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < planesData.length; i++) {
            planes.innerHTML += `
            <div class="col-3">
                <div name="plan" class="d-flex flex-column justify-content-center align-items-center">
                    <img src="img/pdf.ico" style="height: 100px" class="img-fluid">
                    <label>Semestre:${planesData[i].Semestre}</label>
                    <label>Fecha: ${getFecha(planesData[i].fecha.date)}</label>
                    ${opcionP(i)}
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaPlanes");
        $("span[name='descargarPadre']").click(evt => {
            let id = evt.target.id.split("_")[1];
            window.open(`Academias/${planesData[id].localizacion}`);
        });
        $('span[name="Planes"]').click(evt => {
            cargando();
            $("#pieInfo").html("");
            $("#titulo").html("Informacion del plan de trabajo");
            $("#verDoc").modal();
            let id = evt.target.id.split("_")[1];
            let { Semestre, fecha } = planesData[id];
            let { date } = fecha;
            armarPadre(Semestre, date, id);
            $("i[name='descargarEvi']").click(evt => {
                let id = evt.target.id;
                window.open(`Academias/${planesData[id].localizacion}`);
            });
            let doc = planesData[id].datosEv;
            let ev = planesData[id].ev;
            let datosE = [];
            for (let i = 0; i < ev.length; i++) {
                let desc = "";
                let documentoE = "";
                if (ev[i].punto) {
                    desc = doc[(ev[i].punto)].Acciones;
                    documentoE = doc[(ev[i].punto)].tareas[(ev[i].no_tarea - 1)];
                }
                let datosDoc = {
                    "L": ev[i].localizacion,
                    "N": ev[i].nomina,
                    "D": ev[i].nombre
                };
                datosE.push({ desc, documentoE, datosDoc });
            }
            evi = datosE;
            cargarEvi(1);
            $("i[name='descargarPadre']").click(evt => {
                let id = evt.target.id.split("_")[1];
                window.open(`Academias/${evi[id].datosDoc.L}`);
            });
            cerrarM.load = true;
            cerrarM.login = true;
            cerrarModal();
            $("#verDoc").modal();
        });
    };

    const opcionA = i => {
        let html = (isSuper() || isPresidente() || isSecretario() ?
            `
                <span style="font-size: 2rem;" name="actas">
                    <i class="fas fa-eye click" id="Planes_${i}"></i>
                </span>
            ` :
            `
                <span style="font-size: 2rem;" name="descargarPadre">
                    <i class="fas fa-download click" id="actas_${i}"></i>
                </span>
            `);
        return html;
    }

    const cargarActas = pagina => {
        let planes = $("#actas")[0];
        let mostrar = 4;
        let max = Math.ceil(planesActas.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < planesActas.length; i++) {
            planes.innerHTML += `
            <div class="col-3">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <img src="img/pdf.ico" style="height: 100px" class="img-fluid">
                    <label>Semestre:${planesActas[i].Semestre}</label>
                    <label>Fecha: ${getFecha(planesActas[i].fecha.date)}</label>
                    ${opcionA(i)}
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaActas");
        $("span[name='descargarPadre']").click(evt => {
            let id = evt.target.id.split("_")[1];
            window.open(`Academias/${planesActas[id].localizacion}`);
        });
        $('span[name="actas"]').click(async(evt) => {
            cargando();
            $("#pieInfo").html("");
            $("#titulo").html("Informacion del Acta");
            let id = evt.target.id.split("_")[1];
            let { Semestre, fecha } = planesActas[id];
            let { date } = fecha;
            armarPadre(Semestre, date, id);
            $("i[name='descargarEvi']").click(evt => {
                let id = evt.target.id;
                window.open(`Academias/${planesActas[id].localizacion}`);
            });
            let doc = planesActas[id].datosEv;
            let ev = planesActas[id].ev;
            let datosE = [];
            for (let i = 0; i < ev.length; i++) {
                let desc = "";
                let documentoE = "";
                if (doc.ant) {
                    if (doc.ant[(ev[i].punto - 1)]) desc = doc.ant[(ev[i].punto - 1)].acuerdo;
                    if (doc.ant[(ev[i].punto - 1)]) documentoE = doc.ant[(ev[i].punto - 1)].tareas[(ev[i].no_tarea - 1)];
                }
                let datosDoc = {
                    "L": ev[i].localizacion,
                    "N": ev[i].nomina,
                    "D": ev[i].nombre
                };
                datosE.push({ desc, documentoE, datosDoc });
            }
            evi = datosE;
            cargarEvi(1);
            $("i[name='descargarPadre']").click(evt => {
                let id = evt.target.id.split("_")[1];
                window.open(`Academias/${evi[id].datosDoc.L}`);
            });
            cerrarM.load = true;
            cerrarM.login = true;
            cerrarModal();
            $("#verDoc").modal();
        });
    };

    const getFechaAgenda = fecha => {
        fecha = fecha.substring(0, 19);
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let date = fecha.split(" ")[0].split("-");
        let dia = date[2];
        let mes = meses[date[1] - 1];
        let año = date[0];
        let hora = fecha.split(" ")[1];
        let fh = hora.split(":");
        let f = new Date(año, date[1] - 1, dia);
        f.setHours(fh[0], fh[1], fh[2]);
        return { dia, mes, año, hora, f };
    };

    const cargarAgenda = agenda => {
        let campo = $("#fechas")[0];
        campo.innerHTML = "";
        let hoy = new Date();
        for (let i = 0; i < agenda.length; i++) {
            let fecha = getFechaAgenda(agenda[i].fecha.date);
            if (hoy < fecha.f) {
                campo.innerHTML += `
                    <div class="col-6">
                        <div name="fecha" class="d-flex click mb-4">
                            <label name="dia" class="click">${fecha.dia}</label>
                            <div class="d-flex flex-column ml-2 click border-top border-bottom border-dark">
                                <label class="p-0 m-0 click">${fecha.mes} ${fecha.año},${fecha.hora}</label>
                                <label class="p-0 m-0 click text-muted">Reunión semanal para asuntos de interés.</label>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    };

    const cargarDocentes = pagina => {
        let data = docentes.filter(d => d.v);
        let planes = $("#docentes")[0];
        let mostrar = 3;
        let max = Math.ceil(data.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < data.length; i++) {
            planes.innerHTML += `
            <div class="col-4">
                <div class="d-flex flex-column align-items-center">
                    <img src="${data[i].foto}" class="img-fluid foto-opcional">
                    <label class="text-input">${data[i].nomina}</label>
                    <label>${data[i].nombre}</label>
                    <label>${data[i].correo}</label>
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaDocentes");
    };

    const cargarEvi = pagina => {
        let data = evi;
        let planes = $("#verEvidencia")[0];
        let mostrar = 3;
        let max = Math.ceil(data.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < data.length; i++) {
            let { desc, documentoE, datosDoc } = data[i];
            let { N, L, D } = datosDoc;
            planes.innerHTML += `
            <div class="col-6">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <img src="img/pdf.ico" class="img-pdf">
                    <div>
                        <span>
                            <i id='Padre_${i}' name="descargarPadre" class="fas fa-download click"></i>
                        </span>
                    </div>
                    <label>Subido por: <b>${N} - ${D}</b></label>
                    <label>Descripcion: <b>${desc}</b></label>
                    <label>Entrega: <b>${documentoE}</b></label>
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaInfo");
    };

    load();

});