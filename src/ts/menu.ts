import { menuItems } from '@/data/menuData.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu-container');
    if (menuButton && mobileMenu) {

        // --- Event handler for closing the menu ---
        const handleCloseMenu = (e: Event) => {
            if(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        
            const overlay = document.getElementById('mobile-menu-overlay');
            if (overlay) {
                // Animación de salida
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
                
                // Esperamos a que termine la animación (400ms) antes de borrar
                setTimeout(() => {
                    mobileMenu.innerHTML = ''; 
                    menuButton.classList.remove('hidden');
                }, 400);
            }
            const menuButtonClose = document.getElementById('menu-button-close');
            if (menuButtonClose==null) return;
            menuButtonClose.innerHTML ='';
        };
        
        // --- Event handler for opening the menu ---
        const handleOpenMenu = (e: Event) => {
            e.preventDefault(); // Prevent double events (click after touch)
            e.stopPropagation(); // Stop event from bubbling up
    
            // Main overlay with a solid white background
            const overlay = document.createElement('div');
            overlay.id = 'mobile-menu-overlay';
            overlay.className = 'inset-0 z-50 w-full h-full'; 
            
            // Close button
            
            const menuButtonClose = document.getElementById('menu-button-close');
            if (menuButtonClose==null) return;

            const closeButton = document.createElement('button');
            closeButton.className = 'absolute top-6 right-4 p-2 rounded-full active:scale-95 transition-transform text-gray-800';
            closeButton.setAttribute('aria-label', 'Cerrar menú');
            closeButton.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            menuButtonClose.appendChild(closeButton);

            // Centering container
            const centeringContainer = document.createElement('div');
            centeringContainer.className = 'flex flex-col items-center justify-center w-full h-full';
    
            // Menu items container
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'flex flex-col items-center justify-center space-y-5 min-h-screen w-full pb-24'; 
           
            const href = window.location.pathname;
            // Create and append menu items
            menuItems.forEach((itemData, index) => {
                const link = document.createElement('a');
                link.href = itemData.url;
                let className = 'relative font-display transition-all duration-300 hover:font-bold text-2xl';
                if(itemData.url === href) {
                    className += ' font-bold';
                }
                link.className = className;
    
                const span = document.createElement('span');
                span.textContent = itemData.title;
                link.appendChild(span);
                
                itemsContainer.appendChild(link);

                // Añadimos estas líneas:
                link.style.opacity = '0';
                link.style.transform = 'translateX(-20px)';
                link.style.transition = `all 0.5s ease-out ${index * 0.1}s`; // El retraso sube con el índice

                itemsContainer.appendChild(link);

                // Disparamos la animación
                requestAnimationFrame(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                });
            });
    
            // Assemble the menu
            centeringContainer.appendChild(itemsContainer);
            overlay.appendChild(centeringContainer);
    
            // Add to the DOM
            mobileMenu.innerHTML = ''; // Clear previous content
            mobileMenu.appendChild(overlay);
    
            // 1. Estado inicial (invisible y un poco abajo)
            overlay.style.opacity = '0';
            overlay.style.transition = 'all 0.4s ease-out';
            overlay.style.transform = 'translateY(20px)';

            // 2. Forzamos el renderizado y aplicamos el estado final
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            });

            // Event listeners for closing
            closeButton.addEventListener('click', handleCloseMenu);
            closeButton.addEventListener('touchstart', handleCloseMenu);
    
            overlay.addEventListener('click', (e: Event) => {
                if (e.target === overlay) { // Click on backdrop
                    handleCloseMenu(e);
                }
            });
            overlay.addEventListener('touchstart', (e: Event) => {
                 if (e.target === overlay) { // Touch on backdrop
                    handleCloseMenu(e);
                }
            });
    
            menuButton.classList.add('hidden');
        };

        menuButton.addEventListener('click', handleOpenMenu);
        menuButton.addEventListener('touchstart', handleOpenMenu);

    }
});
