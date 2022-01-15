const accion = (estado, valor) => estado ? "" : `onclick="paginaRapida(${valor})"`;

const estado = estado => estado ? "active" : "clickme";

const activo = estado => estado ? "disabled" : "clickme";

const restar = (pagina, max) => (pagina + 2 <= max) ? [2, pagina + 2] : [3, max];

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