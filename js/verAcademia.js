$(document).ready(() => {

    let planesData = [];

    for (let i = 0; i < (4 * 10); i++) {
        planesData.push({
            fecha: '02/15/21',
            autor: 'Anabel',
            desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum deleniti, sed fugiat beatae suscipit aliquam eveniet ullam facilis accusamus natus, repellendus, aspernatur sint quo consectetur! Iste fugit maxime deserunt quas!
            Deserunt veritatis expedita ea? Pariatur eligendi doloremque hic illo repellat accusamus error debitis, corrupti nemo saepe eum sequi libero impedit iusto facilis. Voluptatum laudantium repellendus quaerat assumenda quam, illum modi?
            Neque doloribus unde, ducimus reprehenderit quisquam sunt, veniam necessitatibus nemo nobis sequi quidem laudantium quis officia nisi itaque asperiores? Natus eveniet suscipit repellendus nisi totam sequi, rerum consectetur non minima.
            Laudantium, earum! Molestias distinctio eveniet iste, facere veritatis deserunt officiis adipisci modi eos dicta hic dolor consectetur ratione aliquid totam earum illo ex ab debitis nulla perspiciatis alias? Quae, ipsam.
            Praesentium reiciendis numquam eaque provident animi fugiat hic repellat temporibus corporis, dolor architecto veritatis cumque, laudantium nesciunt itaque saepe ratione accusantium minima libero voluptatem consectetur commodi optio. Aspernatur, eum deserunt.
            Voluptatem maiores delectus, dolorum pariatur aperiam aspernatur numquam, et perferendis vero minima harum eveniet, facilis magnam. Laudantium voluptas quia sequi autem ipsum velit quis, nam ratione hic? Sed, provident quidem!
            Cum tempora, impedit nobis enim dolore nisi nam eveniet fuga eum, ex vero repellendus culpa dolores laudantium expedita ducimus aliquam inventore nemo laborum aut totam. Aliquam perferendis distinctio veritatis ipsum.
            Perferendis sapiente consequuntur quasi mollitia, excepturi dolor numquam a ipsam et totam, ipsum odit earum sed, quisquam accusantium. Nobis exercitationem pariatur, numquam mollitia sint aspernatur magnam repellendus nam? Ullam, magnam?
            At temporibus aut voluptates corrupti. Eius, repellat modi magni aspernatur qui non error suscipit tenetur enim consequatur reiciendis perferendis autem ipsam magnam, ab quia recusandae voluptas veniam dolorum saepe quas.
            Cupiditate culpa natus ipsa doloribus dignissimos laudantium ut atque illo sit, vitae officiis quam nihil nam! Assumenda, qui, id minima quisquam nulla expedita esse quam harum quasi, nostrum perferendis quia?`
        });
    }

    const evento = (evt, max) => {
        if (evt.target.nodeName == 'A' && !evt.target.children[0]) {
            return parseInt(evt.target.innerHTML);
        } else {
            let name = (evt.target.children[0]) ? evt.target.children[0].name : evt.target.name;
            return (name.includes('Final')) ? parseInt(max) : 1;
        }
    };

    const contenido = (name, pagina, i) => `
        <li class="page-item ${pagina == i ? 'active' :''}">
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
                    for (let i = pagina - 3; i < (pagina + 2); i++) cuerpo += contenido(name, pagina, i);
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
        });

        $(`img[name="Inicio${name}"]`).click(evt => {
            if (evt.target.attributes.name.value === "IniciopaginaPlanes")
                cargarPlanes(1);
            else if (evt.target.attributes.name.value === "IniciopaginaActas")
                cargarActas(1);
            else if (evt.target.attributes.name.value === "IniciopaginaDocentes")
                cargarDocentes(1);
        });

        $(`img[name="Final${name}"]`).click(evt => {
            if (evt.target.attributes.name.value === "FinalpaginaPlanes")
                cargarPlanes(max);
            else if (evt.target.attributes.name.value === "FinalpaginaActas")
                cargarActas(max);
            else if (evt.target.attributes.name.value === "FinalpaginaDocentes")
                cargarDocentes(max);
        });

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
                <div name="plan" class="d-flex flex-column justify-content-center align-items-center click">
                    <img src="img/pdf.ico" style="height: 100px" class="img-fluid">
                    <label>Subido por: Anabel ${(i+1)} </label>
                    <label>Fecha: 22/02/21</label>
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaPlanes");
    };

    cargarPlanes(1);

    const cargarActas = pagina => {
        let planes = $("#actas")[0];
        let mostrar = 4;
        let max = Math.ceil(planesData.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < planesData.length; i++) {
            planes.innerHTML += `
            <div class="col-3">
                <div class="d-flex flex-column justify-content-center align-items-center click">
                    <img src="img/pdf.ico" style="height: 100px" class="img-fluid">
                    <label>Subido por: Anabel ${(i+1)} </label>
                    <label>Fecha: 22/02/21</label>
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaActas");
    };

    cargarActas(1);

    let docentes = [];

    for (let i = 0; i < (10 * 3); i++) {
        docentes.push({
            "foto": "img/IconLog.png",
            "nomina": "18130122",
            "nombre": `valor ${(i+1)}`,
            "carrera": "ISC"
        });
    }

    const cargarDocentes = pagina => {
        let planes = $("#docentes")[0];
        let mostrar = 3;
        let max = Math.ceil(docentes.length / mostrar);
        let total = mostrar * pagina;
        let inicio = (pagina - 1) * mostrar;
        planes.innerHTML = "";
        for (let i = inicio; i < total && i < docentes.length; i++) {
            planes.innerHTML += `
            <div class="col-4">
                <div class="d-flex flex-column align-items-center">
                    <img src="${docentes[i].foto}" class="img-fluid foto-opcional">
                    <label class="text-input">${docentes[i].nomina}</label>
                    <label>${docentes[i].nombre}</label>
                    <label>${docentes[i].carrera}</label>
                    <div class="d-flex d-inline justify-content-center mb-3">
                        <img src="img/ver-detalles.png" class="opciones img-fluid click ml-2" title="ver">
                    </div>
                </div>
            </div>`;
        }
        pie(pagina, max, "paginaDocentes");
    };

    cargarDocentes(1)

    $(`div[name="plan"]`).click(evt => {
        $("#verDoc").modal();
    });

});