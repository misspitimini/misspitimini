document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('formularioContacto');
    if (!formulario) return;
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque
        
        let nombre = document.getElementById('nombre');
        let email = document.getElementById('email');
        let telefono = document.getElementById('telefono');
        let mensaje = document.getElementById('mensaje');
    
        const datos = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            mensaje: mensaje.value
        };

        if ( !validarFormulario(datos)) return;  
    
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
function validarFormulario(datos) {

    // 1. Validar Nombre (Obligatorio)
    if (!datos.nombre.value?.trim()) {
        mostrarError(datos.nombre, 'error-nombre');
        return false;
    } else {
        quitarError(datos.nombre, 'error-nombre');
    }

    // 2. Validar Email O Teléfono (Al menos uno debe existir)
    if (!datos.email.value?.trim() && !datos.telefono.value?.trim()){
        mostrarError(datos.email, null); // Solo marcamos el borde
        mostrarError(datos.telefono, null);
        return false;
        //alert('Debes dejarnos al menos una forma de contacto (Email o Teléfono)'); // Unico alert permitido o usa un toast
    } else {
        quitarError(datos.email, null);
        quitarError(datos.telefono, null);
    }
    return true;
}

// Funciones auxiliares para no repetir código
function mostrarError(elemento, idError) {
    // Si el elemento no existe, salimos de la función para no romper el código
    if (!elemento) return;

    elemento.classList.add('border-red-500', 'bg-red-50');
    elemento.classList.remove('border-gray-300', 'focus:border-black');
    if(idError) document.getElementById(idError).classList.remove('hidden');
}

function quitarError(elemento, idError) {
    // Si el elemento no existe, salimos de la función para no romper el código
    if (!elemento) return;

    elemento.classList.remove('border-red-500', 'bg-red-50');
    elemento.classList.add('border-gray-300', 'focus:border-black');
    if(idError) document.getElementById(idError).classList.add('hidden');
}