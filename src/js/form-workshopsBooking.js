document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('formularioReserva');
    if (!formulario) return;
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque

        // 1. Captura de elementos (Cacheamos los elementos, no solo el valor)
        const campos = {
            nombre: document.getElementById('nombre'),
            email: document.getElementById('email'),
            telefono: document.getElementById('telefono'),
            mensaje: document.getElementById('mensaje'),
            privacy: document.getElementById('privacy'),
            newsletter: document.getElementById('newsletter')
        };

        // 2. Limpiar estados previos (Éxito y Errores)
        ocultarElemento('message-success');
        Object.keys(campos).forEach(key => quitarError(`error-${key}`, campos[key]));

        if ( !validarFormulario(campos)) return;

        // 4. Preparar datos
        const datos = Object.fromEntries(Object.entries(campos).map(([k, v]) => [k, v.value.trim()]));
        
        try {
            const urlDominio = "https://www.misspitimini.com/SendFormBooking.php5";
            const respuesta = await fetch(urlDominio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            if (!respuesta.ok) throw new Error('Error en el servidor');
            // const resultado = await respuesta.text();

            // 5. Gestión de Éxito
            const mensajeExito = (campos.email.value.trim())? 
                "Formulario enviado correctamente. Compruebe que ha recibido un email en la dirección facilitada '"+datos.email+"'."
                : "Formulario enviado correctamente.";
            
            mostrarExito('message-success', mensajeExito);

            Object.keys(campos).forEach(key => {
                if (campos[key] && 'value' in campos[key]) {
                    campos[key].value = '';
                }
            });

        } catch (error) {
            mostrarError('error-nombre', 'Hubo un problema al enviar. Inténtalo de nuevo.');
        }
    });
});

/**
 * LÓGICA DE VALIDACIÓN
 */
function validarFormulario(campos) {

    if (!campos.nombre.value.trim()) {
        mostrarError('error-nombre', 'Este campo es obligatorio.');
        marcarInputError(campos.nombre);
        return false;
    } else {
        quitarError('error-nombre');
    }

    if (!campos.telefono.value.trim()){
        mostrarError( 'error-telefono','Este campo es obligatorio.');
        marcarInputError(campos.telefono);
        return false;
    } else if (campos.telefono.value.trim() && !validarTelefono(campos.telefono.value.trim())){
        mostrarError('error-telefono','El teléfono introducido no es válido.');
        marcarInputError(campos.telefono);
        return false; 
    } else {
        quitarError('error-telefono');
    }

    if (!campos.email.value.trim()){
        mostrarError( 'error-email','Este campo es obligatorio.');
        marcarInputError(campos.email);
        return false;
    } else if (!validarEmail(campos.email.value.trim())){
        mostrarError( 'error-email','El email introducido no es válido.');
        marcarInputError(campos.email);
        return false;
    } else {
        quitarError('error-email');
    }

    if (campos.privacy.checked === false) {
        window.dispatchEvent(new CustomEvent('abrir-modal-privacidad', { detail: true }));
        return false;
    }

    return true;
}

/**
 * UTILIDADES DE UI (Tailwind)
 */
// Funciones auxiliares para no repetir código
function mostrarExito(idElemento, mensaje) {
    const el = document.getElementById(idElemento); 
    if (el) {
        const span = el.querySelector('span.text-sm.font-medium');
        if (span) span.textContent = mensaje;
        el.classList.remove('hidden');
    }
}
function mostrarError(idElemento, mensaje) {
    const el = document.getElementById(idElemento);
    if (el) {
        const span = el.querySelector('span.text-xs.font-medium.italic');
        if (span) span.textContent = mensaje;
        el.classList.remove('hidden');
    }
}

function marcarInputError(input) {
    input.classList.add('border-red-500', 'ring-1', 'ring-red-500');
}

function quitarError(idError, input) {
    ocultarElemento(idError);
    if (input) input.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
}

function ocultarElemento(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function validarEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function validarTelefono (telefono) {
    const telefonoRegex = /^\+?[\d\s]{7,15}$/
    return telefonoRegex.test(telefono);
};