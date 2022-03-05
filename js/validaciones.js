const validacionNumerica = data => {
    let re = new RegExp('\\d+');
    return re.exec(data);
}

const validacionDeNoVacio = data => {
    let re = new RegExp('.+');
    return re.exec(data);
}