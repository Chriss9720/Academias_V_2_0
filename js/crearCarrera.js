$(document).ready(() => {

    $("#registroCarrera").submit(() => {
        return false;
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