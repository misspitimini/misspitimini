document.addEventListener('DOMContentLoaded', () => {
    const numeroPlazasInput = document.getElementById('numero_plazas') as HTMLInputElement | null;
    const additionalAttendeesContainer = document.getElementById('additional-attendees-container');
    const decreaseButton = document.getElementById('decrease');
    const increaseButton = document.getElementById('increase');

    if (decreaseButton && increaseButton && numeroPlazasInput) {
        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(numeroPlazasInput.value, 10);
            if (currentValue > 1) {
                numeroPlazasInput.value = (currentValue - 1).toString();
                numeroPlazasInput.dispatchEvent(new Event('input'));
            }
        });

        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(numeroPlazasInput.value, 10);
            numeroPlazasInput.value = (currentValue + 1).toString();
            numeroPlazasInput.dispatchEvent(new Event('input'));
        });
    }

    if (numeroPlazasInput && additionalAttendeesContainer) {
        numeroPlazasInput.addEventListener('input', () => {
            const numberOfAttendees = parseInt(numeroPlazasInput.value, 10) || 1;

            additionalAttendeesContainer.innerHTML = '';

            if (numberOfAttendees > 1) {
                for (let i = 2; i <= numberOfAttendees; i++) {
                    const attendeeBlock = document.createElement('div');
                    attendeeBlock.classList.add('additional-attendee', 'mb-4');
                    attendeeBlock.innerHTML = `
                        <p class="indent-2 font-body text-base text-gray-600 leading-relaxed text-justify tracking-wide m-0">
                            <label for="nombre_asistente_${i}" class="block text-[#2c3e50] mb-2">Nombre y Apellidos Asistente ${i} (*):</label>
                            <input type="text" id="nombre_asistente_${i}" name="nombre_asistente_${i}" class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black">
                            <div
                                id="error-nombre_asistente_${i}"
                                class="hidden flex items-center gap-1.5 text-red-600 transition-all duration-200 ease-in-out"
                                role="alert"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-xs font-medium italic">Este campo es obligatorio.</span>
                            </div>
                        </p>
                        <br/>
                    `;
                    additionalAttendeesContainer.appendChild(attendeeBlock);
                }
            }
        });
    }
});
