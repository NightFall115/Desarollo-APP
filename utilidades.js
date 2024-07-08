const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        const errorDiv = document.getElementById('e-' + item.id);
        if (errorDiv) errorDiv.innerHTML = '';
    });
    document.getElementById('id').readOnly = false;
    document.getElementById('btnSave').value = 'Guardar';
};

const verificar = async (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        if (id == 'email') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
        if (id == 'fono') {
            if (input.value.length != 9) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Debe tener 9 dígitos </span>'
            }
        }
    }
};

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) return true;
    return false;
};

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    if (!formato.test(email))
        return false
    return true
}

const validaRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            let tmp = rutCompleto.split('-');
            let digv = tmp[1];
            let rut = tmp[0];
            if (digv == 'K') digv = 'k';

            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }
    return Fn.validaRut(run)
}