const validacionNumerica = data => {
    let re = new RegExp('\\d+');
    return re.exec(data);
}

const validacionDeNoVacio = data => {
    let re = new RegExp('.+');
    return re.exec(data);
}

const session = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "php/activo.php",
            success: s => resolve(),
            error: e => reject()
        });
    })
}