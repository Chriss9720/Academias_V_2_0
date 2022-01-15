$(document).ready(() => {

    $("#cancelar").click(() => {
        $("#imgPerfil")[0].src = "img/perfil.png";
        $("#nombreImg")[0].innerHTML = "Elija una imagen";
        $("#Nomina")[0].className = `form-control`;
        $("#Correo")[0].className = `form-control`;
        $("#Telefono")[0].className = `form-control`;
        $("#Clave")[0].className = `form-control`;
    });

    $("#fotoPerfil").change(() => {
        let archivo = $("#fotoPerfil")[0].files[0];
        let reader = new FileReader();
        if (archivo) {
            reader.readAsDataURL(archivo);
            reader.onloadend = () => {
                $("#imgPerfil")[0].src = reader.result;
                $("#nombreImg")[0].innerHTML = archivo.name;
            }
        } else {
            $("#imgPerfil")[0].src = "img/perfil.png";
            $("#nombreImg")[0].innerHTML = "Elija una imagen";
        }
    });

    $("#registro").submit((form) => {

        let datos = form.target;

        let fotoPerfil = datos.fotoPerfil.files[0] || "img/perfil.png";
        let nomina = datos.Nomina.value.trim();
        let correo = datos.Correo.value.trim();
        let telefono = datos.Telefono.value.trim();
        let Clave = datos.Clave.value.trim();

        let paso = nomina.length > 0 && correo.length > 0 && telefono.length > 0 && clave.length > 0;

        $("#Nomina")[0].className = `form-control ${(nomina.length == 0) ? " is-invalid" : ""}`;
        $("#Correo")[0].className = `form-control ${(correo.length == 0) ? " is-invalid" : ""}`;
        $("#Telefono")[0].className = `form-control ${(telefono.length == 0) ? " is-invalid" : ""}`;
        $("#Clave")[0].className = `form-control ${(Clave.length == 0) ? " is-invalid" : ""}`;

        correo += "@itesca.edu.mx";

        return paso;
    });

});