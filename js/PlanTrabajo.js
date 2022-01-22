$(document).ready(() => {
    $("#crear").click(() => {
        let nombre = "pla7";
        $.ajax({
            url: "php/generarPDF.php",
            type: "POST",
            data: {
                nombreArchivo: nombre,
                academia: 'academia 1',
                semestre: 'enero-junio 2022',
                contenido: $("#documento")[0].innerHTML,
            },
            success: (r) => window.open(`pruebasPDF/${nombre}.pdf`),
            erorr: (e) => console.log(e)
        });
    })
});