$(document).ready(() => {

    $("#Editarme").click(evt => {
        sessionStorage.setItem('accion', 'editarme');
        $.ajax({
            url: "php/validarCambio.php",
            data: {
                accion: sessionStorage.getItem('accion'),
                afectar: ''
            },
            type: "post",
            dataType: "json",
            success: (s) => window.location = s.cambio,
            error: (e) => {
                if (e.status == 404 && e.responseText == "Solicitar Reinicio de sesion") {
                    cerrarM.load = true;
                    login();
                } else {
                    $("#errorG").html(`
                        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                            <strong class="h1">${e.responseJSON.msg}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }
            }
        });
    });

});