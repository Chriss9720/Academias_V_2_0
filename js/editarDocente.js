$(document).ready(() => {

    const getDocentes = () => {
        datos = [];
        for (let i = 0; i < (4 * 8); i++) {
            datos.push({
                foto: "img/perfil.png",
                nomina: "nomina",
                nombre: "nombre",
                carrera: "carrera"
            });
        }
        return datos;
    };

    const buscarCookie = name => {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split('=');
            let nombre = cookie[0];
            let value = cookie[1];
            if (nombre === name) {
                return value;
            }
        }
        return 0;
    };

    const accion = (estado, valor) => estado ? "" : `onclick="paginaRapida(${valor})"`;

    const estado = estado => estado ? "active" : "clickme";

    const activo = estado => estado ? "disabled" : "clickme";

    const restar = (pagina, max) => {
        if (pagina + 2 <= max) {
            return [2, pagina + 2];
        } else {
            return [3, max];
        }
    };

    const piePagina = (pagina, max) => {
        let cuerpo = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${activo(pagina == 1)}">
                <a ${accion(pagina == 1, 1)} class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;
        let entro = max > 0;
        if (max <= 5) {
            for (let i = 1; i <= max; i++) {
                cuerpo += `
                <li class="page-item ${estado(pagina == i)}">
                    <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                </li>`;
            }
        } else {
            if (pagina == max) {
                for (let i = max - 4; i <= max; i++) {
                    cuerpo += `
                    <li class="page-item ${estado(pagina == i)}">
                        <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                    </li>`;
                }
            } else if (pagina + 4 <= max) {
                console.log("AQUI");
                if ((pagina - 2) <= 1) {
                    for (let i = 1; i <= 5; i++) {
                        cuerpo += `
                        <li class="page-item ${estado(pagina == i)}">
                            <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                        </li>`;
                    }
                } else if ((pagina + 2) == max) {
                    for (let i = pagina; i <= (pagina + 4); i++) {
                        cuerpo += `
                        <li class="page-item ${estado(pagina == i)}">
                            <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                        </li>`;
                    }
                } else {
                    let resta = restar(pagina, max);
                    for (let i = pagina - resta[0]; i <= resta[1]; i++) {
                        cuerpo += `
                        <li class="page-item ${estado(pagina == i)}">
                            <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                        </li>`;
                    }
                }
            } else {
                let resta = restar(pagina, max);
                for (let i = pagina - resta[0]; i <= resta[1]; i++) {
                    cuerpo += `
                    <li class="page-item ${estado(pagina == i)}">
                        <a ${accion(pagina == i, i)} class="page-link" aria-label="Previous">${i}</a>
                    </li>`;
                }
            }
        }
        cuerpo += `
            <li class="page-item ${activo(pagina == max)}">
                <a ${accion(pagina == max, max)} class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>`;

        if (entro) $("#paginas")[0].innerHTML = cuerpo;

    };

    const cargar = () => {

        let datos = getDocentes();;

        let maximo = Math.ceil(datos.length / 4);
        let pagina = buscarCookie("paginaDocente");
        pagina = maximo > pagina ? pagina : 0;
        document.cookie = `paginaDocente=${pagina};max-age=60*10;`;

        $("#datos")[0].innerHTML = "";

        for (let i = (pagina * 4), j = 0; i < datos.length && j < 4; i++, j++) {
            $("#datos")[0].innerHTML += `
                <div class="col-sm-12 col-md-6 col-xl-3 border">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${datos[i].foto}" alt="foto de perfil no encontrada" class="fotoPerfil rounded-circle img-fluid mt-1">
                        <label for="Nomina">${datos[i].nomina}_${i}</label>
                        <label for="Nombre">${datos[i].nombre}_${i}</label>
                        <label for="Carrera">${datos[i].carrera}_${i}</label>
                        <input name=${i} type="button" value="Editar" class="btn btn-success mb-2">
                    </div>
                </div>`;
        }

        pagina = parseInt(pagina) + 1;
        piePagina(pagina, maximo);
    };

    cargar();

});

const paginaRapida = (pagina) => {
    document.cookie = `paginaDocente=${pagina - 1};max-age=60*10;`;
    location.reload();
}