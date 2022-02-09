$(document).ready(() => {

    $("#accion")[0].innerText = "Buscar";

    let datos = [];

    for (let i = 0; i < (10 * 3); i++) {
        datos.push({
            "fondo": "portada.png",
            "foto": "IconLog.png",
            "nomina": "18130122",
            "nombre": `valor ${(i+1)}`,
            "carrera": "ISC"
        });
    }

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
        let seleccionado = $("#mostrar")[0].options.selectedIndex;
        let mostrar = parseInt($("#mostrar")[0].options[seleccionado].innerText);
        let contenido = $("#docentes")[0];
        let max = Math.ceil(datos.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        contenido.innerHTML = "";
        for (let i = inicio; i < total && i < datos.length; i++) {
            contenido.innerHTML += `
                <div class="col-4">
                    <div class="d-flex flex-column align-items-center">
                        <div style="background-image: url('../img/${datos[i].fondo}')" class="img-fluid areaFondo d-flex justify-content-center align-items-end">
                        </div>
                        <img src="../img/${datos[i].foto}" class="img-fluid imgRelleno">
                        <label class="text-input">${datos[i].nomina}</label>
                        <label>${datos[i].nombre}</label>
                        <label>${datos[i].carrera}</label>
                        <div class="d-flex d-inline justify-content-center mb-3">
                            <img src="img/editar.png" class="opciones img-fluid click" title="editar">
                            <img src="img/ver-detalles.png" class="opciones img-fluid click ml-2" title="ver">
                        </div>
                    </div>
                </div>
            `;
        }
        pie(pagina, max);
    };

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
        let max = Math.ceil(datos.length / mostrar);
        pagina = (max < pagina) ? max : pagina;
        cargar(pagina);

    });

});