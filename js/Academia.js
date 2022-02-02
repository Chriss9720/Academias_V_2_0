$(document).ready(() => {

    let datos = [];

    for (let i = 0; i < (10 * 3); i++) {
        datos.push({
            "foto": "img/IconLog.png",
            "nomina": "18130122",
            "nombre": `valor ${(i+1)}`
        });
    }

    $("#accion")[0].innerHTML = "Crear";

    $("#portada").change(file => {
        file = file.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => $("#img-portada")[0].src = reader.result;
        }
    });

    const cargar = (pagina) => {
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
                    </div>
                </div>
            `;
        }
        pie(pagina, max);
    };

    cargar(1);

});