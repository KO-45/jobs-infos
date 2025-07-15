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

/**
 * Carga el menú desde una lista de rutas posibles.
 * @param {string[]} paths - Array de rutas a probar.
 * @returns {Promise<string>} - Contenido HTML del menú.
 */
async function loadMenu(paths) {
    for (const path of paths) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.warn(`No se pudo cargar el menú desde ${path}:`, error);
        }
    }
    throw new Error('No se pudo cargar el menú desde ninguna de las rutas proporcionadas.');
}

/**
 * Muestra un mensaje de error al usuario.
 * @param {string} message - Mensaje de error a mostrar.
 */
function showError(message) {
    const container = document.getElementById('menu-container');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

// Cargar e inicializar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const menuHtml = await loadMenu(['pages/menu.html', '../../pages/menu.html']);
        document.getElementById('menu-container').innerHTML = menuHtml;
        initializeMenu(); // Inicializa el menú después de cargarlo
    } catch (error) {
        console.error('Error crítico al cargar el menú:', error);
        showError('No se pudo cargar el menú. Por favor, inténtelo más tarde.');
    }
});