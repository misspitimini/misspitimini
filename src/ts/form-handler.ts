import { UrlsApi } from './urls.ts';

// Define an interface for the form fields to ensure type safety.
interface FormFields {
    nombre: HTMLInputElement | null;
    email: HTMLInputElement | null;
    confirm_email: HTMLInputElement | null;
    telefono: HTMLInputElement | null;
    mensaje: HTMLTextAreaElement | null;
    privacy: HTMLInputElement | null;
    newsletter: HTMLInputElement | null;
    form_timestamp: HTMLInputElement | null;
}

document.addEventListener('DOMContentLoaded', () => {
    // Setear el timestamp inicial
    const timestampInput = document.getElementById("form_timestamp") as HTMLInputElement | null;
    if (timestampInput) {
        timestampInput.value = Date.now().toString();
    }
    const formulario = document.getElementById('formularioContacto');
    if (!formulario) return;

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque

        // 1. Captura de elementos con el tipo definido.
        const campos = {
            nombre: document.getElementById("nombre") as HTMLInputElement | null,
            apellidos: document.getElementById("apellidos") as HTMLInputElement | null, // Honeypot / Campo opcional
            email: document.getElementById("email") as HTMLInputElement | null,
            confirm_email: document.getElementById("confirm_email") as HTMLInputElement | null, // Honeypot
            telefono: document.getElementById("telefono") as HTMLInputElement | null,
            mensaje: document.getElementById("mensaje") as HTMLTextAreaElement | null,
            privacy: document.getElementById("privacy") as HTMLInputElement | null,
            newsletter: document.getElementById("newsletter") as HTMLInputElement | null,
            form_timestamp: document.getElementById("form_timestamp") as HTMLInputElement | null
          };

        // 2. Limpiar estados previos (Éxito y Errores)
        ocultarElemento('message-success');
        // Use 'keyof' to iterate over the keys of the typed object.
        (Object.keys(campos) as Array<keyof FormFields>).forEach(key => {
            const campo = campos[key];
            if (campo) {
                quitarError(`error-${key}`, campo);
            }
        });

        if (!validarFormulario(campos)) return;

        // 4. Preparar datos
        const datos = {
            nombre: campos.nombre?.value.trim() || '',
            apellidos: campos.apellidos ? campos.apellidos.value.trim() : '',
            email: campos.email?.value.trim() || '',
            telefono: campos.telefono?.value.trim() || '',
            mensaje: campos.mensaje?.value.trim() || '',
            
            // Tratar checkboxes como Booleans
            privacy: campos.privacy?.checked || false,
            newsletter: campos.newsletter?.checked || false,
            
            // Convertir timestamp a Entero (Milisegundos)
            form_timestamp: campos.form_timestamp ? parseInt(campos.form_timestamp.value, 10) : 0
        };
        
        try {
            const urlDominio = UrlsApi.SEND_FORM;
            const respuesta = await fetch(urlDominio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            if (!respuesta.ok) throw new Error('Error en el servidor');

            // 5. Gestión de Éxito
            const mensajeExito = (campos.email?.value.trim())
                ? `Formulario enviado correctamente. \r\n` +
                `Compruebe que ha recibido un email en  \r\n ` +
                `la dirección facilitada '${datos.email}'.`
                : `Formulario enviado correctamente.`;
            
            window.dispatchEvent(new CustomEvent('abrir-modal-success', { detail: true }));
            mostrarExito('message-success', mensajeExito);
            
            (Object.keys(campos) as Array<keyof FormFields>).forEach(key => {
                const campo = campos[key];
                if (campo && 'value' in campo) {
                    (campo as HTMLInputElement).value = '';
                }
                if(campo && campo.type === 'checkbox'){
                    (campo as HTMLInputElement).checked = false;
                }
            });

            if (campos.form_timestamp) {
                campos.form_timestamp.value = Date.now().toString();
            }

            if (campos.apellidos) {
                campos.apellidos.value = datos.apellidos;
            }
            
            if (campos.newsletter) {
                campos.newsletter.checked = true;
            }

        } catch (error) {
            if (campos.nombre) {
                mostrarError('error-nombre', 'Hubo un problema al enviar. Inténtalo de nuevo.');
            }
        }
    });
});

/**
 * LÓGICA DE VALIDACIÓN
 */
function validarFormulario(campos: FormFields): boolean {

    if (!campos.nombre?.value.trim()) {
        mostrarError('error-nombre', 'Este campo es obligatorio.');
        if (campos.nombre) marcarInputError(campos.nombre);
        return false;
    } else {
        quitarError('error-nombre', campos.nombre);
    }

    // 2. Validar Email O Teléfono (Al menos uno debe existir)
    if (!campos.email?.value.trim() && !campos.telefono?.value.trim()){
        mostrarError( 'error-email','Debes dejarnos al menos una forma de contacto (Email o Teléfono).'); 
        mostrarError('error-telefono','Debes dejarnos al menos una forma de contacto (Email o Teléfono).');
        if (campos.email) marcarInputError(campos.email);
        if (campos.telefono) marcarInputError(campos.telefono);
        return false; 
    } else {
        quitarError('error-email', campos.email);
        quitarError('error-telefono', campos.telefono);
    }
    
    if (campos.telefono?.value.trim() && !validarTelefono(campos.telefono.value.trim())){
        mostrarError('error-telefono','El teléfono introducido no es válido.');
        if (campos.telefono) marcarInputError(campos.telefono);
        return false; 
    } else {
        quitarError('error-telefono', campos.telefono);
    }

    if (campos.email?.value.trim() && !validarEmail(campos.email.value.trim())) {
        mostrarError( 'error-email','El email introducido no es válido.');
        if (campos.email) marcarInputError(campos.email);
        return false; 
    } else {
        quitarError('error-email', campos.email);
    }

    if (!campos.mensaje?.value.trim()) {
        mostrarError('error-mensaje', 'Este campo es obligatorio.');
        if (campos.mensaje) marcarInputError(campos.mensaje);
        return false;
    } else {
        quitarError('error-mensaje', campos.mensaje);
    }

    if (campos.privacy?.checked === false) {
        window.dispatchEvent(new CustomEvent('abrir-modal-privacidad', { detail: true }));
        return false;
    }

    return true;
}

/**
 * UTILIDADES DE UI (Tailwind)
 */
// Funciones auxiliares para no repetir código
function mostrarExito(idElemento: string, mensaje: string) {
    const el = document.getElementById(idElemento); 
    if (el) {
        const span = el.querySelector('span.text-sm.font-medium');
        if (span) span.textContent = mensaje;
        el.classList.remove('hidden');
    }
}
function mostrarError(idElemento: string, mensaje: string) {
    const el = document.getElementById(idElemento);
    if (el) {
        const span = el.querySelector('span.text-xs.font-medium.italic');
        if (span) span.textContent = mensaje;
        el.classList.remove('hidden');
    }
}

function marcarInputError(input: HTMLElement) {
    input.classList.add('border-red-500', 'ring-1', 'ring-red-500');
}

function quitarError(idError: string, input: HTMLElement | null) {
    ocultarElemento(idError);
    if (input) input.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
}

function ocultarElemento(id: string) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function validarEmail (email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function validarTelefono (telefono: string): boolean {
    const telefonoRegex = /^\+?[\d\s]{7,15}$/
    return telefonoRegex.test(telefono);
};