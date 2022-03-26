const validacionNumerica = data => {
    let re = new RegExp('\\d+');
    return re.exec(data);
}

const validacionDeNoVacio = data => {
    let re = new RegExp('.+');
    return re.exec(data);
}

const camposRequeridos = (data, keys) => {
    let valor = true;
    keys.forEach(k => {
        if (data[k].value == 0) {
            if (!data[k].className.includes("is-invalid"))
                data[k].className += " is-invalid";
            let element = $(`div[name="${k}"]`)[0];
            element.innerHTML = "Este campo es requerido";
            valor = false;
        } else {
            if (typeof(data[k]) !== "string") {
                data[k].className = data[k].className.replace(" is-invalid", " is-valid");
            }
        }
    });
    return valor;
};

const validarNombre = (data, key) => {
    let valor = true;
    if (data[key].value.length > 0) {
        let re = new RegExp('([a-zA-Zñ]+\\s*)+');
        let exec = re.exec(data[key].value);
        if (exec && exec[0] == exec["input"]) {
            seccion1(data, key);
            data[key] = data[key].value;
        } else {
            seccion2(data, key);
            let element = $(`div[name="${key}"]`)[0];
            element.innerHTML = "El nombre solo puede contener letras y espacios";
            valor = false;
        }
    }
    return valor;
};

const validarNomina = (data, key) => {
    let valor = true;
    if (data[key].value.length > 0) {
        let re = new RegExp('\\d{8}');
        let exec = re.exec(data[key].value);
        if (exec && exec[0] == exec["input"]) {
            seccion1(data, key);
            data[key] = data[key].value;
        } else {
            seccion2(data, key);
            let element = $(`div[name="${key}"]`)[0];
            element.innerHTML = "La nómina debe de contener 8 digitos";
            valor = false;
        }
    }
    return valor;
};

const validarClave = (data, key) => {
    let valor = true;
    if (data[key].value.length > 0) {
        let re = new RegExp('.{3}.*');
        let exec = re.exec(data[key].value);
        if (exec && exec[0] == exec["input"]) {
            seccion1(data, key);
            data[key] = data[key].value;
        } else {
            seccion2(data, key);
            let element = $(`div[name="${key}"]`)[0];
            element.innerHTML = "El minimo son 3 cifras";
            valor = false;
        }
    }
    return valor;
};

const validarTelefono = (data, key) => {
    let valor = true;
    if (data[key].value.length > 0) {
        let re = new RegExp('\\d{10}');
        let exec = re.exec(data[key].value);
        if (exec && exec[0] == exec["input"]) {
            seccion1(data, key);
            data[key] = data[key].value;
        } else {
            seccion2(data, key);
            let element = $(`div[name="${key}"]`)[0];
            element.innerHTML = "El teléfono debe de tener 10 digitos";
            valor = false;
        }
    } else {
        seccion3(data, key);
        data[key] = data[key].value;
    }
    return valor;
};

const validarCorreo = (data, key, extension) => {
    let valor = true;
    if (data[key].value.length > 0) {
        let re = new RegExp("^[ña-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[ña-z0-9!#$%&'*+/=?^_`{|}~-]+)*$");
        let exec = re.exec(data[key].value);
        if (exec && exec[0] == exec["input"]) {
            seccion1(data, key);
            data[key] = `${data[key].value}${extension}`;
        } else {
            seccion2(data, key);
            let element = $(`div[name="${key}"]`)[0];
            element.innerHTML = "El correo es invalido";
            valor = false;
        }
    } else {
        seccion3(data, key);
        data[key] = data[key].value;
    }
    return valor;
};

const seccion1 = (data, key) => {
    if (data[key].className.includes("is-invalid")) {
        data[key].className = data[key].className.replace(" is-invalid", " is-valid");
    } else if (!data[key].className.includes("is-valid")) {
        data[key].className += " is-valid";
    }
};

const seccion2 = (data, key) => {
    if (data[key].className.includes("is-valid")) {
        data[key].className = data[key].className.replace(" is-valid", " is-invalid");
    } else if (!data[key].className.includes("is-invalid")) {
        data[key].className += " is-invalid";
    }
};

const seccion3 = (data, key) => {
    if (!data[key].className.includes("is-valid")) {
        if (!data[key].className.includes("is-invalid")) {
            data[key].className += " is-valid";
        } else {
            data[key].className = data[key].className.replace(" is-invalid", " is-valid");
        }
    }
    data[key].className = data[key].className.replace(" is-invalid", "");
};