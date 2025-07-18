// menu.js

/**
 * Inicializa el menú después de cargarlo.
 */
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-link');
    const submenus = document.querySelectorAll('.submenu');
    let hideTimeout;

    // Ocultar todos los submenús al cargar la página
    hideAllSubmenus(submenus);

    // Agrega un listener de clic a cada elemento del menú
    menuItems.forEach(item => {
        item.addEventListener('click', handleMenuClick);
        item.addEventListener('mouseover', () => showSubmenu(item, hideTimeout));
        item.addEventListener('mouseout', () => hideSubmenu(item, hideTimeout));
    });

    // Agregar listener para el submenú
    submenus.forEach(submenu => {
        submenu.addEventListener('mouseover', () => clearTimeout(hideTimeout));
        submenu.addEventListener('mouseout', () => hideSubmenu(submenu, hideTimeout, 1000));
    });

    // Inicializar el botón de menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');

    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        menuList.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace en móvil
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.menu-link, .submenu-link').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Maneja el clic en un elemento del menú.
 * @param {Event} event - El evento de clic.
 */
function handleMenuClick(event) {
    event.preventDefault();
    const targetUrl = this.getAttribute('href');
    window.location.href = targetUrl; // Redirige a la URL del enlace
}

/**
 * Muestra el submenú correspondiente.
 * @param {HTMLElement} item - El elemento del menú.
 * @param {number} hideTimeout - El temporizador para ocultar el submenú.
 */
function showSubmenu(item, hideTimeout) {
    clearTimeout(hideTimeout);
    const submenu = item.nextElementSibling;
    if (submenu) {
        submenu.style.display = 'block';
    }
}

/**
 * Oculta el submenú correspondiente.
 * @param {HTMLElement} item - El elemento del menú o submenú.
 * @param {number} hideTimeout - El temporizador para ocultar el submenú.
 * @param {number} [delay=2000] - El tiempo de espera antes de ocultar.
 */
function hideSubmenu(item, hideTimeout, delay = 2000) {
    const submenu = item.nextElementSibling;
    hideTimeout = setTimeout(() => {
        if (submenu) {
            submenu.style.display = 'none';
        }
    }, delay);
}

/**
 * Oculta todos los submenús.
 * @param {NodeList} submenus - Lista de submenús a ocultar.
 */
function hideAllSubmenus(submenus) {
    submenus.forEach(submenu => {
        submenu.style.display = 'none';
    });
}

// Agregar evento para evitar que el submenú se oculte al pasar el mouse sobre él
document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.addEventListener('mouseover', () => {
        clearTimeout(hideTimeout); // Detener el temporizador de ocultar
    });
    submenu.addEventListener('mouseout', () => {
        hideSubmenu(submenu, hideTimeout); // Ocultar el submenú al salir
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
        const menuHtml = await loadMenu(['menu.html']);
        document.getElementById('menu-container').innerHTML = menuHtml;
        initializeMenu(); // Inicializa el menú después de cargarlo
    } catch (error) {
        console.error('Error crítico al cargar el menú:', error);
        showError('No se pudo cargar el menú. Por favor, inténtelo más tarde.');
    }
});
