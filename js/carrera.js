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

    const contenido = (pagina, i) => `
    <li class="page-item ${pagina == i ? 'active' :''}">
        <a name="pagina" class="page-link click">${i}</a>
    </li>`;

    const pie = (pagina, max) => {
        let cuerpo = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${pagina == 1 ? "disabled" : "click"}">
                <a name="pagina" class="page-link" aria-label="previous">
                    <span aria-hidden="true">&laquo;</span>
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
            <li class="page-item ${pagina == max ? "disabled" : "click"}">
                <a name="pagina" class="page-link" aria-label="next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>`;

        if (entro) $("#pie")[0].innerHTML = cuerpo;

        $(`a[name="pagina"]`).click(evt => {
            let dato = evt.target.innerHTML;
            if (dato.includes("»")) cargar(parseInt(max));
            else if (dato.includes("«")) cargar(parseInt(1));
            else cargar(parseInt(dato));
        });

    };

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