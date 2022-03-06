$(document).ready(() => {

    var misDatos;
    var docentesCoordinador;

    $(window).on("load", () => {
        getMisDatos()
            .then(t => {
                misDatos = t;
                menu(t.nivel);
                cargarCoordinador();
            })
            .catch(e => window.location = "/Academias");
    });

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

    const menu = nivel => {
        puedeVer();
        puedeDescargar();
        switch (parseInt(nivel)) {
            case 0:
                puedeEditar(nivel);
                puedeCrear(nivel);
                puedeLiberar();
                break;
        }
    };

    const puedeVer = () => {
        $("#verMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ver
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <input type="button" value="Carrera" class="dropdown-item">
                    <input type="button" value="Docente" class="dropdown-item">
                    <input type="button" value="Academia" class="dropdown-item">
                    <input type="button" value="Plan de trabajo" class="dropdown-item">
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeEditar = nivel => {
        $("#editarMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="editar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Editar
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    ${nivel == 0 ? '<input type="button" value="Carrera" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Academia" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Plan de trabajo" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Acta" class="dropdown-item">' : ''}
                    ${nivel == 1 ? '<input type="button" value="Ev. docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. presidente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. secreatario" class="dropdown-item">' : ''}
                </div>
            </div>
        `);
    };

    const puedeCrear = nivel => {
        $("#CrearMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="editar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Crear
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    ${nivel == 0 ? '<input type="button" value="Carrera" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Academia" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Plan de trabajo" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Acta" class="dropdown-item">' : ''}
                    ${nivel == 1 ? '<input type="button" value="Ev. docente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. presidente" class="dropdown-item">' : ''}
                    ${nivel == 0 ? '<input type="button" value="Ev. secreatario" class="dropdown-item">' : ''}
                </div>
            </div>
        `);
    };

    const puedeDescargar = () => {
        $("#desMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Descargar
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <input type="button" value="Plan de trabajo" class="dropdown-item">
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeLiberar = () => {
        $("#liberarMenu").html(`
            <div class="dropdown">
                <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="button" value="Pendientes" class="sin text-menu">
                </button>
                <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                    <div class="d-flex d-inline align-items-center">
                        <input type="button" value="Plan de trabajo" class="dropdown-item">
                        <span class="badge badge-danger">4</span>
                    </div>
                    <input type="button" value="Acta" class="dropdown-item">
                    <input type="button" value="Ev. docente" class="dropdown-item">
                    <input type="button" value="Ev. presidente" class="dropdown-item">
                    <input type="button" value="Ev. secreatario" class="dropdown-item">
                </div>
            </div>
        `);
    };

    const puedeFinalizar = nivel => {
        $("#finalizarMenu").html(`
        <div class="dropdown">
            <button class="btn text-menu dropdown-toggle" type="button" id="ver" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <input type="button" value="Pendientes" class="sin text-menu">
            </button>
            <div class="dropdown-menu bg-menu-principal" aria-labelledby="editar">
                <input type="button" value="Plan de trabajo" class="dropdown-item">
                <input type="button" value="Acta" class="dropdown-item">
                <input type="button" value="Ev. docente" class="dropdown-item">
                <input type="button" value="Ev. presidente" class="dropdown-item">
                <input type="button" value="Ev. secreatario" class="dropdown-item">
            </div>
        </div>
    `);
    };

    const getCoordinador = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                "url": 'php/coordinador.php',
                dataType: "json",
                success: s => resolve(s),
                error: e => reject(e)
            });
        });
    };

    const cargarCoordinador = () => {
        getCoordinador()
            .then(async(t) => {
                $("#datosCoordinador").html(`
                    <img src="${t.foto || "img/IconLog.png"}" class="img-fluid foto-opcional">
                    <label class="text-input">${t.nomina || "nomina"}</label>
                    <label>${t.nombre || "nombre"}</label>
                    <label>${t.correo || "correo"}</label>
                    <div class="d-flex d-inline justify-content-center mb-3">
                        <img src="img/ver-detalles.png" class="opciones img-fluid click ml-2" title="ver">
                    </div>
                    ${misDatos['nivel'] == 0 ? await cambiarCoordinador() : ""}
                `);

                if (misDatos['nivel'] == 0) {

                    $("#nuevoCoordinador").click(() => {
                        console.log($("#buscarCoordinador")[0].value);
                    });
                }
            })
            .catch(c => {
                $("#datosCoordinador").html(`
                    <h3>Ocurrio un error, puede que no se tenga establecido a un coordinador</h3>
                `);
            });

    };

    const cambiarCoordinador = async() => {
        let x = await getbuscarCoordinadorNuevo()
            .then(t => {
                return `
                    <div class="form-inline mt-1">
                        <label class="form-label text-input">Busqueda por nombre/nomina</label>
                        <input id="buscarCoordinador" type="search" class="form-control text-input bg-input rounded-pill mx-auto" list="listaDocentes">
                        <datalist id="listaDocentes">
                            ${getOpcionesCoordinador(t)}
                        </datalist>
                    </div>
                    <input id="nuevoCoordinador" type="button" value="Cambiar" class="btn btn-primary mt-2 rounded">
                `;
            }).catch(c => {
                $("#datosCoordinador").html(`
                    <h3>Ocurrio un error, puede que no se tenga establecido a un coordinador</h3>
                `);
            });
        return x;
    };

    const getbuscarCoordinadorNuevo = () => {
        return new Promise((resolve, reject) => {
            if (!docentesCoordinador) {
                $.ajax({
                    url: "php/buscarCoordinadorNuevo.php",
                    dataType: "json",
                    success: s => resolve(s),
                    error: e => reject(e)
                });
            } else resolve(docentesCoordinador);
        })
    };

    const getOpcionesCoordinador = lista => {
        if (!docentesCoordinador) docentesCoordinador = lista;
        let r = "";
        docentesCoordinador.forEach(l => r += `<option>${l.nomina} - ${l.nombre}</option>`);
        return r;
    };

});