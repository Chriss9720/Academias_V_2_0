$(document).ready(() => {

    $("[name='visible']").click(() => {
        let elemt = $("#clave")[0];
        if (elemt.type == "password") {
            elemt.type = "text";
            $("#icono")[0].className = "fas fa-lock-open";
        } else {
            elemt.type = "password";
            $("#icono")[0].className = "fas fa-lock";
        }
    });

});