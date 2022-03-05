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

    $("#entrar").click(async() => {
        let nomina = getValue("nomina");
        let clave = getValue("clave");

        if (!validacionDeNoVacio(nomina)) return errorExacto({ campo: "nomina", desc: "Ingrese su nomina" });
        else quitarError({ campo: "nomina" })

        if (!validacionDeNoVacio(clave)) return errorExacto({ campo: "clave", desc: "Ingrese su clave" });
        else quitarError({ campo: "clave" })

        if (!validacionNumerica(nomina)) return error("Datos ingresados erroneamente")

        login({ nomina: nomina, clave: clave })
            .then(t => window.location = t.cambio)
            .catch(c => error(c.msg))
    });

    const login = ({ nomina, clave }) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "php/logeo.php",
                type: "post",
                data: {
                    nomina: nomina,
                    clave: clave
                },
                dataType: "json",
                success: s => resolve(s),
                error: e => {
                    console.log(e);
                    reject(e.responseJSON);
                }
            });
        });
    }

    const getValue = name => $(`#${name}`)[0].value;

    const error = desc => {
        $("#Error").html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>${desc}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `)
    };

    const errorExacto = ({ campo, desc }) => {
        let input = $(`#${campo}`)[0];
        if (!input.className.includes('invalid')) {
            input.className += ' is-invalid';
            $(`#${campo}C`)[0].className += " error";
        }
        $(`div[name="${campo}"]`).text(desc);
    }

    const quitarError = ({ campo }) => {
        let input = $(`#${campo}`)[0];
        input.className = input.className.replace(' is-invalid', "");
        $(`#${campo}C`)[0].className = $(`#${campo}C`)[0].className.replace(" error", "");
    };


});