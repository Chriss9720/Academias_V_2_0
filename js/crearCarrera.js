$(document).ready(() => {

    $("#registroCarrera").submit(() => {
        return false;
    });

    $("#buscarJefe").click((element) => {
        if (element.target.value.includes("Buscar")) {
            $("#mostrarJefe")[0].className = "col-md-12 col-xl-6 border border-warning p-2 rounded mt-md-2 mt-xl-0";
            $("#mostrarJefe")[0].innerHTML = `
            <div class="card">
                <div class="card-header text-center h4">Docente seleccionado para jefe</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 d-flex align-items-center">
                            <img src="img/perfil.png" alt="foto de perfil" class="fotoPerfil rounded-circle img-fluid mx-auto" id="imgJefe">
                        </div>
                        <div class="col-8 mt-2">
                            <div class="form-inline">
                                <label class="registroLabelCarrera" for="CorreoJefe">Correo:</label>
                                <input type="text" name="CorreoJefe" id="CorreoJefe" disabled class="form-control ml-2">
                            </div>
                            <div class="form-inline mt-md-2">
                                <label class="registroLabelCarrera" for="NombreJefe">Nombre:</label>
                                <input type="text" name="NombreJefe" id="NombreJefe" disabled class="form-control ml-2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-center">
                    <input id="cancelarJefe" type="button" class="btn btn-danger" value="Cancelar">
                </div>
            </div>`;
        }
        if (element.target.value.includes("Mostrar")) {
            $("#buscarJefe")[0].value = "Ocultar";
            $("#mostrarJefe")[0].hidden = false;
        } else if (element.target.value.includes("Ocultar")) {
            $("#mostrarJefe")[0].hidden = true;
            $("#buscarJefe")[0].value = "Mostrar";
        } else {
            $("#buscarJefe")[0].value = "Ocultar";
        }
        $("#cancelarJefe").click(() => {
            $("#buscarJefe")[0].value = "Buscar ";
            $("#mostrarJefe")[0].className = "";
            $("#mostrarJefe")[0].innerHTML = "";
        });
    });

    $("#buscarMiembro").click((element) => {
        if (element.target.value.includes("Buscar")) {
            $("#mostrarMiembro")[0].className = "col-md-12 col-xl-6 border border-warning p-2 rounded mt-md-2 mt-xl-0";
            $("#mostrarMiembro")[0].innerHTML = `
            <div class="card">
                <div class="card-header text-center h4">Docente seleccionado para miembro</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 d-flex align-items-center">
                            <img src="img/perfil.png" alt="foto de perfil" class="fotoPerfil rounded-circle img-fluid mx-auto" id="imgJefe">
                        </div>
                        <div class="col-8 mt-2">
                            <div class="form-inline">
                                <label class="registroLabelCarrera" for="CorreoJefe">Correo:</label>
                                <input type="text" name="CorreoJefe" id="CorreoJefe" disabled class="form-control ml-2">
                            </div>
                            <div class="form-inline mt-md-2">
                                <label class="registroLabelCarrera" for="NombreJefe">Nombre:</label>
                                <input type="text" name="NombreJefe" id="NombreJefe" disabled class="form-control ml-2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-around">
                    <input id="cancelarMiembro" type="button" class="btn btn-danger" value="Cancelar">
                    <input id="guardarMiembro" type="button" class="btn btn-primary" value="Guardar">
                </div>
            </div>`;
        }
        if (element.target.value.includes("Mostrar")) {
            $("#buscarMiembro")[0].value = "Ocultar";
            $("#mostrarMiembro")[0].hidden = false;
        } else if (element.target.value.includes("Ocultar")) {
            $("#mostrarMiembro")[0].hidden = true;
            $("#buscarMiembro")[0].value = "Mostrar";
        } else {
            $("#buscarMiembro")[0].value = "Ocultar";
        }
        $("#cancelarMiembro").click(() => {
            $("#buscarMiembro")[0].value = "Buscar ";
            $("#mostrarMiembro")[0].className = "";
            $("#mostrarMiembro")[0].innerHTML = "";
        });
        $("#guardarMiembro").click(() => {
            $("#buscarMiembro")[0].value = "Buscar ";
            $("#mostrarMiembro")[0].className = "";
            $("#mostrarMiembro")[0].innerHTML = "";
        });
    });

    const getDocentes = () => {
        datos = [];
        for (let i = 0; i < (4 * 8); i++) {
            datos.push({
                foto: "img/perfil.png",
                nomina: "nomina",
                nombre: "nombre",
            });
        }
        return datos;
    };

    const buscarCookie = name => {
        let cookies = document.cookie.replace(" ", "").split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split('=');
            let nombre = cookie[0];
            let value = cookie[1];
            if (nombre.includes(name)) {
                return value;
            }
        }
        return 0;
    };

    const cargar = () => {

        let mostrar = 4;

        let datos = getDocentes();

        let maximo = Math.ceil(datos.length / mostrar);
        let pagina = buscarCookie("paginaDocenteAddCarrera");
        pagina = maximo > pagina ? pagina : 0;
        document.cookie = `paginaDocenteAddCarrera=${pagina};max-age=${60 * 10};`;

        $("#datos")[0].innerHTML = "";

        for (let i = (pagina * mostrar), j = 0; i < datos.length && j < mostrar; i++, j++) {
            $("#datos")[0].innerHTML += `
                <div class="col-sm-12 col-md-6 col-xl-3 border">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${datos[i].foto}" alt="foto de perfil no encontrada" class="fotoPerfil rounded-circle img-fluid mt-1">
                        <label for="Nomina">${datos[i].nomina}_${i}</label>
                        <label for="Nombre">${datos[i].nombre}_${i}</label>
                        <input name=${i} type="button" value="Dar de baja" class="btn btn-danger mb-2">
                    </div>
                </div>`;
        }

        pagina = parseInt(pagina) + 1;
        piePagina(pagina, maximo);
    };

    cargar();

});

const paginaRapida = (pagina) => {
    document.cookie = `paginaDocenteAddCarrera=${pagina - 1};max-age=${60 * 10};`;
    location.reload();
}