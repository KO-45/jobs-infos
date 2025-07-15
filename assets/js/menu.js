// menu.js

/**
 * Inicializa el menú después de cargarlo.
 */
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-link');
    
    // Agrega un listener de clic a cada elemento del menú
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const targetUrl = item.getAttribute('href');
            window.location.href = targetUrl; // Redirige a la URL del enlace
        });
    });

    // Manejo de submenús
    const submenus = document.querySelectorAll('.submenu');
    let hideTimeout;

    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
            const submenu = item.nextElementSibling;
            if (submenu) {
                submenu.style.display = 'block';
            }
        });

        item.addEventListener('mouseout', () => {
            const submenu = item.nextElementSibling;
            hideTimeout = setTimeout(() => {
                if (submenu) {
                    submenu.style.display = 'none';
                }
            }, 200);
        });
    });

    // Agregar listener para el submenú
    submenus.forEach(submenu => {
        submenu.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
        });

        submenu.addEventListener('mouseout', () => {
            hideTimeout = setTimeout(() => {
                submenu.style.display = 'none';
            }, 1000);
        });
    });

    // Ocultar todos los submenús al cargar la página
    submenus.forEach(submenu => {
        submenu.style.display = 'none';
    });
}

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeMenu);
