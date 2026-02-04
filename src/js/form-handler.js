document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('formularioContacto');
    if (!formulario) return;
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque
    
        let nombre = document.getElementById('nombre');
        let email = document.getElementById('email');
        let mensaje = document.getElementById('mensaje');
    
        const datos = {
            nombre: nombre.value,
            email: email.value,
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
            alert('Error al enviar el formulario [' + error + ']');
        }
    });
});