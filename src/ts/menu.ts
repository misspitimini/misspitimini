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
            mobileMenu.innerHTML = ''; // Remove the menu
            menuButton.classList.remove('hidden');
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
            const closeButton = document.createElement('button');
            closeButton.className = 'absolute top-6 right-4 p-2 rounded-full active:scale-95 transition-transform text-gray-800';
            closeButton.setAttribute('aria-label', 'Cerrar menú');
            closeButton.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    
            // Centering container
            const centeringContainer = document.createElement('div');
            centeringContainer.className = 'flex flex-col items-center justify-center w-full h-full';
    
            // Menu items container
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'flex flex-col items-center justify-center space-y-5 min-h-screen w-full pb-24'; 
           
            const href = window.location.pathname;
            // Create and append menu items
            menuItems.forEach(itemData => {
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
            });
    
            // Assemble the menu
            centeringContainer.appendChild(itemsContainer);
            overlay.appendChild(closeButton);
            overlay.appendChild(centeringContainer);
    
            // Add to the DOM
            mobileMenu.innerHTML = ''; // Clear previous content
            mobileMenu.appendChild(overlay);
    
            // Event listeners for closing
            closeButton.addEventListener('click', handleCloseMenu);
            closeButton.addEventListener('touchstart', handleCloseMenu);
    
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) { // Click on backdrop
                    handleCloseMenu(e);
                }
            });
            overlay.addEventListener('touchstart', (e) => {
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
