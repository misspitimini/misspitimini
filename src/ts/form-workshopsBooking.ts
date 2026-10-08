import { UrlsApi } from './urls.ts';

// Define an interface for the form fields to ensure type safety.
interface FormFields {
    fecha: HTMLSelectElement | null;
    nombre: HTMLInputElement | null;
    apellidos: HTMLInputElement | null;
    email: HTMLInputElement | null;
    confirm_email: HTMLInputElement | null; // Honeypot
    telefono: HTMLInputElement | null;
    mensaje: HTMLTextAreaElement | null;
    privacy: HTMLInputElement | null;
    newsletter: HTMLInputElement | null;
    form_timestamp: HTMLInputElement | null;
    numero_plazas: HTMLInputElement | null;
    es_regalo: HTMLInputElement | null;
}

document.addEventListener('DOMContentLoaded', () => {
    // Setear el timestamp inicial
    const timestampInput = document.getElementById("form_timestamp") as HTMLInputElement | null;
    if (timestampInput) {
        timestampInput.value = Date.now().toString();
    }

    const formulario = document.getElementById('formularioReserva');
    if (!formulario) return;
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se refresque

        // 1. Captura de elementos con el tipo definido.
        const campos: FormFields = {
            fecha: document.getElementById("fecha") as HTMLSelectElement | null,
            nombre: document.getElementById("nombre") as HTMLInputElement | null,
            apellidos: document.getElementById("apellidos") as HTMLInputElement | null, // Honeypot / Campo opcional
            email: document.getElementById("email") as HTMLInputElement | null,
            confirm_email: document.getElementById("confirm_email") as HTMLInputElement | null, // Honeypot
            telefono: document.getElementById("telefono") as HTMLInputElement | null,
            mensaje: document.getElementById("mensaje") as HTMLTextAreaElement | null,
            privacy: document.getElementById("privacy") as HTMLInputElement | null,
            newsletter: document.getElementById("newsletter") as HTMLInputElement | null,
            form_timestamp: document.getElementById("form_timestamp") as HTMLInputElement | null,
            numero_plazas: document.getElementById("numero_plazas") as HTMLInputElement | null,
            es_regalo: document.getElementById("es_regalo") as HTMLInputElement | null,
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

        const numeroPlazas = campos.numero_plazas ? parseInt(campos.numero_plazas.value, 10) : 1;
        const asistentesAdicionales = [];
        if (numeroPlazas > 1) {
            for (let i = 2; i <= numeroPlazas; i++) {
                const asistenteInput = document.getElementById(`nombre_asistente_${i}`) as HTMLInputElement | null;
                asistentesAdicionales.push(asistenteInput?.value.trim() || '');
            }
        }


        // 4. Preparar datos
        const datos = {
            fecha: campos.fecha?.value.trim() || '',
            nombre: campos.nombre?.value.trim() || '',
            apellidos: campos.apellidos ? campos.apellidos.value.trim() : '', // Honeypot
            email: campos.email?.value.trim() || '',
            telefono: campos.telefono?.value.trim() || '',
            mensaje: campos.mensaje?.value.trim() || '',
            numero_plazas: numeroPlazas,
            es_regalo: campos.es_regalo?.checked || false,
            asistentes_adicionales: asistentesAdicionales,
            
            // Tratar checkboxes como Booleans
            privacy: campos.privacy?.checked || false,
            newsletter: campos.newsletter?.checked || false,
            
            // Convertir timestamp a Entero (Milisegundos)
            form_timestamp: campos.form_timestamp ? parseInt(campos.form_timestamp.value, 10) : 0
        };
        
        try {
            const urlDominio = UrlsApi.SEND_BOOKING_FORM;
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
                ? `Formulario enviado correctamente. Compruebe que ha recibido un email en la dirección facilitada '${datos.email}'.`
                : "Formulario enviado correctamente.";
            
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

            if (campos.numero_plazas) {
                campos.numero_plazas.value = '1';
                campos.numero_plazas.dispatchEvent(new Event('input'));
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

    let esValido = true;

    if (!campos.fecha?.value.trim()) {
        mostrarError('error-fecha', 'Este campo es obligatorio.');
        if (campos.fecha) marcarInputError(campos.fecha);
        esValido = false;
    } else {
        quitarError('error-fecha', campos.fecha);
    }

    if (!campos.nombre?.value.trim()) {
        mostrarError('error-nombre', 'Este campo es obligatorio.');
        if (campos.nombre) marcarInputError(campos.nombre);
        esValido = false;
    } else {
        quitarError('error-nombre', campos.nombre);
    }

    if (!campos.telefono?.value.trim()){
        mostrarError( 'error-telefono','Este campo es obligatorio.');
        if (campos.telefono) marcarInputError(campos.telefono);
        esValido = false;
    } else if (campos.telefono.value.trim() && !validarTelefono(campos.telefono.value.trim())){
        mostrarError('error-telefono','El teléfono introducido no es válido.');
        if (campos.telefono) marcarInputError(campos.telefono);
        esValido = false; 
    } else {
        quitarError('error-telefono', campos.telefono);
    }

    if (!campos.email?.value.trim()){
        mostrarError( 'error-email','Este campo es obligatorio.');
        if (campos.email) marcarInputError(campos.email);
        esValido = false;
    } else if (campos.email && !validarEmail(campos.email.value.trim())){
        mostrarError( 'error-email','El email introducido no es válido.');
        marcarInputError(campos.email);
        esValido = false;
    } else {
        quitarError('error-email', campos.email);
    }

    if (!campos.numero_plazas?.value || parseInt(campos.numero_plazas.value, 10) <= 0) {
        mostrarError('error-numero_plazas', 'El número de plazas debe ser mayor que 0.');
        if (campos.numero_plazas) marcarInputError(campos.numero_plazas);
        esValido = false;
    } else {
        quitarError('error-numero_plazas', campos.numero_plazas);
    }

    const numeroPlazas = campos.numero_plazas ? parseInt(campos.numero_plazas.value, 10) : 1;
    if (numeroPlazas > 1) {
        for (let i = 2; i <= numeroPlazas; i++) {
            const asistenteInput = document.getElementById(`nombre_asistente_${i}`) as HTMLInputElement | null;
            const errorId = `error-nombre_asistente_${i}`;
            if (!asistenteInput?.value.trim()) {
                const errorContainer = document.getElementById(errorId);
                if (errorContainer) {
                    mostrarError(errorId, 'Este campo es obligatorio.');
                }
                if (asistenteInput) marcarInputError(asistenteInput);
                esValido = false;
            } else {
                quitarError(errorId, asistenteInput);
            }
        }
    }

    if (campos.privacy?.checked === false) {
        window.dispatchEvent(new CustomEvent('abrir-modal-privacidad', { detail: true }));
        esValido = false;
    }

    return esValido;
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

function quitarError(idError: string | null, input: HTMLElement | null) {
    if(idError) ocultarElemento(idError);
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
