$(document).ready(() => {

    $("#accion")[0].innerHTML = "Crear";

    CKEDITOR.replace('ev');
    CKEDITOR.replace('obs');

    $('div[name="evaluacion"]').click(evt => {
        if (evt.target.attributes.id || evt.delegateTarget.id) {
            let id = (evt.target.attributes.id && evt.target.attributes.id.value) || evt.delegateTarget.id;
            $("#tituloModal")[0].innerText = id;
            let text = $(`#${id}`)[0].innerHTML;
            if ($(`#${id}`)[0].innerText == "click para editar") {
                text = "";
            }
            CKEDITOR.instances["ev"].setData(text);
            $("#editor").modal('show');
        }
    });

    $("#aplicarEvaluacion").click(evt => {
        let text = CKEDITOR.instances["ev"].getData();
        let id = $("#tituloModal")[0].innerText;
        $(`#${id}`)[0].innerHTML = text;
        $("#editor").modal('hide');
    });

});