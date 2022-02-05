$(document).ready(() => {

    $("#accion")[0].innerHTML = "Crear";

    $("#foto").change(file => {
        file = file.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => $("#perfil")[0].src = reader.result;
        }
    });

    $("#registroDocente").submit(form => {
        let data = {
            "nombre": form.target.nombre,
            "nomina": form.target.nomina,
            "telefono": form.target.telefono,
            "correo": form.target.correo,
            "clave": form.target.clave
        }

        let fallo = false;

        Object.keys(data).forEach(k => {
            if (data[k].value.length == 0) {
                if (!data[k].className.includes("is-invalid"))
                    data[k].className += " is-invalid";
                $(`div[name="${k}"]`)[0].innerHTML = "Este campo es requerido";
                fallo = true;
            } else
                data[k].className = data[k].className.replace(" is-invalid", "");
        });

        if (!fallo) {
            $("#alerta")[0].innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Registro exitoso
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span class="h1" aria-hidden="true">&times;</span>
                    </button>
                </div>`;
        }

        return false;
    });

});