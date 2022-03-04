$(document).ready(() => {

    $("#accion")[0].innerHTML = "Crear";

    $('div[name="evaluacion"]').click(evt => {
        $("#tituloModal")[0].innerText = "titulo pendiente";
        $("#editor").modal('show');
    });

    CKEDITOR.replace('ev');

});