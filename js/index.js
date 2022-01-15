$(document).ready(() => {
    $('#formularioLogin').submit((form) => {
        form.preventDefault();
        form.stopPropagation();
        console.log(form);
        let nomina = $("#nomina")[0].value;
        let clave = $("#clave")[0].value;
        if (nomina.length == 0) {
            $('#nomina')[0].className = "form-control is-invalid";
            $('#validation-nomina')[0].className = "invalid-feedback";
            $('#validation-nomina')[0].innerHTML = `<h5>Ingrese la nomina</h5>`;
            return;
        } else {
            $('#nomina')[0].className = "form-control";
        }
        if (clave.length == 0) {
            $('#clave')[0].className = "form-control is-invalid";
            $('#validation-clave')[0].className = "invalid-feedback";
            $('#validation-clave')[0].innerHTML = `<h5>Ingrese la clave</h5>`;
            return;
        } else {
            $('#clave')[0].className = "form-control";
        }

        $('#nomina')[0].className = "form-control is-invalid";
        $('#clave')[0].className = "form-control is-invalid";
        $('#validation-nomina')[0].innerHTML = `<h5></h5>`;
        $('#validation-clave')[0].className = "invalid-feedback";
        $('#validation-clave')[0].innerHTML = `<h5>Datos erroneos</h5>`;

        return;
    });
});