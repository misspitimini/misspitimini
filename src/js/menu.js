import { menuItems } from '../data/menuData.js';

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');

    const openMenu = () => {
        // Main overlay with a solid white background
        const overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        overlay.className = 'inset-0 z-50 w-full h-full'; // Changed from bg-white/95 to bg-white
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'absolute top-6 right-4 p-2 rounded-full active:scale-95 transition-transform text-gray-800';
        closeButton.setAttribute('aria-label', 'Cerrar menú');
        closeButton.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

        // Centering container
        const centeringContainer = document.createElement('div');
        centeringContainer.className = 'flex flex-col items-center justify-center  w-full h-full';

        // Menu items container
        const itemsContainer = document.createElement('div');
        // Removed -mt-8 to prevent the list from being pushed up
        itemsContainer.className = 'flex flex-col items-center justify-center space-y-5 min-h-screen w-full pb-24'; 
       
        // Create and append menu items
        menuItems.forEach(itemData => {
            const link = document.createElement('a');
            link.href = itemData.url;
            link.className = 'relative font-display transition-all duration-300 hover:font-bold text-2xl';
            
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
        mobileMenuContainer.innerHTML = ''; // Clear previous content
        mobileMenuContainer.appendChild(overlay);

        // Event listeners for closing
        closeButton.addEventListener('click', closeMenu);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { // Click on backdrop
                closeMenu();
            }
        });
        hamburgerButton.classList.add('hidden');
    };

    const closeMenu = () => {
        mobileMenuContainer.innerHTML = ''; // Remove the menu
        hamburgerButton.classList.remove('hidden');
    };

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', openMenu);
    }
});
