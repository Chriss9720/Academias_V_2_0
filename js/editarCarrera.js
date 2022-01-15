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

    const selected = estado => estado ? "selected" : "";

    const opcionesMostrar = () => {
        let maximo = buscarCookie("cantidadCarrera");
        if (maximo == 0) {
            document.cookie = `cantidadCarrera=4;max-age=60*10;`;
            maximo = 4;
        }
        $("#mostrar")[0].innerHTML = `
            <option value="1" ${selected(maximo == 1)}>1</option>
            <option value="2" ${selected(maximo == 2)}>2</option>
            <option value="3" ${selected(maximo == 3)}>3</option>
            <option value="4" ${selected(maximo == 4)}>4</option>
            <option value="5" ${selected(maximo == 5)}>5</option>
            <option value="6" ${selected(maximo == 6)}>6</option>
            <option value="7" ${selected(maximo == 7)}>7</option>
            <option value="8" ${selected(maximo == 8)}>8</option>`;
    }

    const cargar = () => {

        let mostrar = parseInt(buscarCookie("cantidadCarrera"));

        let datos = getDocentes();;

        let maximo = Math.ceil(datos.length / mostrar);
        let pagina = buscarCookie("paginaCarrera");
        pagina = maximo > pagina ? pagina : 0;
        document.cookie = `paginaCarrera=${pagina};max-age=60*10;`;

        $("#datos")[0].innerHTML = "";

        for (let i = (pagina * mostrar), j = 0; i < datos.length && j < mostrar; i++, j++) {
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

    opcionesMostrar();
    cargar();

    $("#cantidad").click(() => {
        document.cookie = `cantidadCarrera=${$("#mostrar")[0].value};max-age=60*10;`;
        location.reload();
    });

});

const paginaRapida = (pagina) => {
    document.cookie = `paginaCarrera=${pagina - 1};max-age=60*10;`;
    location.reload();
}