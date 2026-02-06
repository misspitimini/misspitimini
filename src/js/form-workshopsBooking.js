document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('formularioReserva');
    if (!formulario) return;
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque

        let nombre = document.getElementById('nombre');
        let email = document.getElementById('email');
        let telefono = document.getElementById('telefono');
        let mensaje = document.getElementById('mensaje');
    
        const campos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensaje
        };

        if ( !validarFormulario(campos)) return;

        const datos = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            mensaje: mensaje.value
        };

        try {
            const urlDominio = "https://www.misspitimini.com/SendFormBooking.php5";
            const respuesta = await fetch(urlDominio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
    
            const resultado = await respuesta.text();

            nombre.value='';
            email.value='';
            telefono.value='';
            mensaje.value='';
            mostrarExito('error-nombre', 'Formulario enviado correctamente');
        } catch (error) {
            mostrarError(null, 'error-nombre', 'Error al enviar el formulario de contacto');
        }
    });
});

// Funciones auxiliares para no repetir código
function validarFormulario(campos) {

    // 1. Validar Nombre (Obligatorio)
    if (!campos.nombre.value.trim()) {
        mostrarError(campos.nombre, 'error-nombre', 'Deben rellenarse los campos obligatorios');
        return false;
    } else {
        quitarError(campos.nombre, 'error-nombre');
    }

    // 2. Validar Email O Teléfono (Al menos uno debe existir)
    if (!campos.email.value.trim() && !campos.telefono.value.trim()){
        mostrarError(campos.email, 'error-nombre','Deben rellenarse los campos obligatorios'); // Solo marcamos el borde
        mostrarError(campos.telefono, 'error-nombre','Deben rellenarse los campos obligatorios');
        return false;
        //alert('Debes dejarnos al menos una forma de contacto (Email o Teléfono)'); // Unico alert permitido o usa un toast
    } else {
        quitarError(campos.email, 'error-nombre');
        quitarError(campos.telefono, 'error-nombre');
    }
    return true;
}

// Funciones auxiliares para no repetir código
function mostrarError(elemento, idError, mensajeCustom) {
    // 1. Estilos del input
    if(elemento) {
        elemento.classList.add('border-red-500', 'bg-red-50');
    }
    
    // 2. Cambiar texto y mostrar el error
    const txtError = document.getElementById(idError);
    if (txtError) {
        txtError.classList.add('border-red-500', 'bg-red-50');
        if (mensajeCustom) {
            txtError.textContent = mensajeCustom; // Aquí cambiamos el texto
        }
        txtError.classList.remove('hidden');
    }
}

function mostrarExito(idError, mensajeCustom) {

    // 2. Cambiar texto y mostrar el error
    const txtError = document.getElementById(idError);
    if (txtError) {
        txtError.classList.add('border-green-500', 'bg-green-50','text-green-100');
        if (mensajeCustom) {
            txtError.textContent = mensajeCustom; // Aquí cambiamos el texto
        }
        txtError.classList.remove('hidden');
    }
}

function quitarError(elemento, idError) {
    elemento.classList.remove('border-red-500', 'bg-red-50');
    elemento.classList.add('border-gray-300', 'focus:border-black');
    if(idError) document.getElementById(idError).classList.add('hidden');
}