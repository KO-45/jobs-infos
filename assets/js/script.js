// script.js

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
