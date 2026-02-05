document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('formularioContacto');
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
            const urlDominio = "https://www.misspitimini.com/SendForm.php5";
            const respuesta = await fetch(urlDominio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
    
            const resultado = await respuesta.text();
            alert('Formulario enviado correctamente');
        } catch (error) {
            alert('Error al enviar el formulario de contacto');
        }
    });
});

// Funciones auxiliares para no repetir código
function validarFormulario(campos) {

    // 1. Validar Nombre (Obligatorio)
    if (!campos.nombre.value.trim()) {
        mostrarError(campos.nombre, 'error-nombre');
        return false;
    } else {
        quitarError(campos.nombre, 'error-nombre');
    }

    // 2. Validar Email O Teléfono (Al menos uno debe existir)
    if (!campos.email.value.trim() && !campos.telefono.value.trim()){
        mostrarError(campos.email, null); // Solo marcamos el borde
        mostrarError(campos.telefono, null);
        return false;
        //alert('Debes dejarnos al menos una forma de contacto (Email o Teléfono)'); // Unico alert permitido o usa un toast
    } else {
        quitarError(campos.email, null);
        quitarError(campos.telefono, null);
    }
    return true;
}

// Funciones auxiliares para no repetir código
function mostrarError(elemento, idError) {
    elemento.classList.add('border-red-500', 'bg-red-50');
    elemento.classList.remove('border-gray-300', 'focus:border-black');
    if(idError) document.getElementById(idError).classList.remove('hidden');
}

function quitarError(elemento, idError) {
    elemento.classList.remove('border-red-500', 'bg-red-50');
    elemento.classList.add('border-gray-300', 'focus:border-black');
    if(idError) document.getElementById(idError).classList.add('hidden');
}