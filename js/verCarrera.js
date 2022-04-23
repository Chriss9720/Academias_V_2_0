$(document).ready(() => {

    let docentes = [];
    let carreras = [];

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

    const cargar = (pagina) => {
        let filtro = docentes.filter(d => d.v == true);
        let seleccionado = $("#mostrar")[0].options.selectedIndex;
        let mostrar = parseInt($("#mostrar")[0].options[seleccionado].innerText);
        let contenido = $("#docentes")[0];
        let max = Math.ceil(filtro.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        contenido.innerHTML = "";
        for (let i = inicio; i < total && i < filtro.length; i++) {
            contenido.innerHTML += `
                <div class="col-4">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${filtro[i].foto}" class="img-fluid foto-opcional">
                        <label class="text-input">${filtro[i].nomina}</label>
                        <label>${filtro[i].nombre}</label>
                    </div>
                </div>
            `;
        }
        pie(pagina, max);
    };

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

    const infoBaiscaCarreras = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/infoBaiscaCarreras.php',
                dataType: 'json',
                success: s => resolve(s),
                error: s => reject(s)
            })
        });
    };

    const armarCarrera = () => {
        let r = "";
        carreras.forEach(d => {
            r += `<option value="${d.clave_carrera} - ${d.nombre}">`;
        });
        removerGuardados($("#listaCarreras")[0]);
        $("#listaCarreras").html(r);
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

    const buscador = () => {
        $("#Buscador").html(`
            <div class="container mt-3">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="form-inline mb-2">
                        <label class="form-label text-input mr-3">Busqueda por nomina/nombre</label>
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
                            <strong class="h1">No se encontro al docente</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
                cargar(1);
            }
        });
        $("#Borrar").click(() => {
            $("#alerta").html(``);
            $("#docenteSel").val("");
            docentes.forEach(d => d.v = true);
            cargar(1);
        });
    };

    $("#CarreraSel").keypress(async(k) => {
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
            let find = carreras.find(f => f.clave_carrera == clave && f.nombre == nombre);
            if (find) {
                $("#alerta").html(``);
                $("#DatosC").html(`
                    <img id="img-portada" src="${find.foto_portada}" class="portada img-fluid">
                    <div class="arriba ml-3 form-inline">
                        <img src="${find.foto}" class="img-fluid foto-opcional">
                        <div class="d-flex flex-column align-items-start">
                            <label class="text-dark h3 font-weight-bold">${find.clave_carrera} - ${find.nombre}</label>
                            <label class="h5">${find.ND}</label>
                        </div>
                    </div>
                `);
                await getDocentesCarrera(find.clave_carrera)
                    .then(doc => {
                        let f = doc.filter(d => d.jefe == 0);
                        for (let i = 0; i < f.length; i++) {
                            if (f[i].jefe == 0) {
                                docentes.push(f[i]);
                                docentes[i].v = true;
                            }
                        }
                    })
                    .catch(e => {
                        docentes = [];
                        console.log(e);
                        if (e.responseText == "Solicitar Reinicio de sesion") {
                            cerrarM.load = true;
                            cerrarModal();
                            login();
                        }
                    });
                $("#mostrarSel").html(`
                    <div class="form-inline justify-content-center">
                        <label class="text-input font-weight-bold ancho justify-content-end">Mostrar</label>
                        <select class="form-control ml-2 text-input bg-input" id="mostrar">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="" selected>3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                            <option value="">6</option>
                        </select>
                    </div>
                `);
                cargar(1);
                $("#mostrar").change(evt => {
                    let seleccionado = evt.target.selectedIndex;
                    let mostrar = evt.target.options[seleccionado].innerText;
                    let find = false;
                    let lista = $("li");
                    let pagina = 1;
                    for (let i = 0; i < lista.length && !find; i++) {
                        if (lista[i].className.includes("page-item") && lista[i].className.includes("active")) {
                            pagina = parseInt(lista[i].children[0].innerText);
                            find = true;
                        }
                    }
                    let filtro = docentes.filter(d => d.v == true);
                    let max = Math.ceil(filtro.length / mostrar);
                    pagina = (max < pagina) ? max : pagina;
                    cargar(pagina);

                });
                buscador();
            } else {
                $("#alerta").html(`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong class="h1">No se encontro la carrera</strong>
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
                infoBaiscaCarreras()
                    .then(info => {
                        carreras = info;
                        armarCarrera();
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