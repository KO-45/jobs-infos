// script.js

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el menú desde el archivo menu.html
    loadMenu(['pages/menu.html', '../../pages/menu.html'])
        .then(menuHtml => {
            document.getElementById('menu-container').innerHTML = menuHtml;
            initializeMenu(); // Inicializa el menú después de cargarlo
        })
        .catch(error => {
            console.error('Error al cargar el menú:', error);
            showError('No se pudo cargar el menú. Por favor, inténtelo más tarde.');
        });
});

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
 * Inicializa el menú después de cargarlo.
 */
function initializeMenu() {
    const menuItems = document.querySelectorAll('nav > ul > li > a');
    
    // Agrega un listener de clic a cada elemento del menú
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = item.getAttribute('href');
        });
    });

    // Manejo de submenús
    const submenus = document.querySelectorAll('nav > ul > li > ul.submenu');
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
            }, 2000);
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

/**
 * Muestra un mensaje de error al usuario.
 * @param {string} message - Mensaje de error a mostrar.
 */
function showError(message) {
    const container = document.getElementById('menu-container');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}
