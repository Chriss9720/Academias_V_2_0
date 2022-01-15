$(document).ready(() => {

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

});