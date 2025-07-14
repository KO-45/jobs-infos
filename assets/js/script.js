// script.js

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Cargar el menú desde el archivo menu.html
    fetch('/pages/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            initializeMenu(); // Inicializa el menú después de cargarlo
        })
        .catch(error => console.error('Error al cargar el menú:', error));
    
    function initializeMenu() {
        // Selecciona el menú de navegación
        const menuItems = document.querySelectorAll('nav > ul > li > a');
        
        // Agrega un listener de clic a cada elemento del menú
        menuItems.forEach(item => {
            item.addEventListener('click', function(event) {
                // Previene el comportamiento por defecto del enlace
                event.preventDefault();
                // Aquí se puede agregar la lógica para cargar el contenido correspondiente
                // loadContent(item.getAttribute('href'));
                // Redirige a la URL del enlace
                window.location.href = item.getAttribute('href');
            });
        });

        // Manejo de submenús
        const submenus = document.querySelectorAll('nav > ul > li > ul.submenu');
        
        let hideTimeout;
        menuItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                clearTimeout(hideTimeout); // Limpia el timeout si el mouse vuelve a estar sobre el menú
                const submenu = item.nextElementSibling;
                if (submenu) {
                    submenu.style.display = 'block'; // Muestra el submenú
                }
            });
            item.addEventListener('mouseout', function() {
                const submenu = item.nextElementSibling;
                hideTimeout = setTimeout(() => {
                    if (submenu) {
                        submenu.style.display = 'none'; // Oculta el submenú después de un retraso
                    }
                }, 2000); // Ajusta el tiempo según sea necesario
            });
        });

        // Agregar listener para el submenú
        submenus.forEach(submenu => {
            submenu.addEventListener('mouseover', function() {
                clearTimeout(hideTimeout); // Limpia el timeout si el mouse está sobre el submenú
            });
            submenu.addEventListener('mouseout', function() {
                hideTimeout = setTimeout(() => {
                    submenu.style.display = 'none'; // Oculta el submenú después de un retraso
                }, 1000); // Ajusta el tiempo según sea necesario
            });
        });

        // Ocultar todos los submenús al cargar la página
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
    }

    // Futuro punto de ampliación: 
    // Implementar la función loadContent para cargar contenido dinámicamente

    // Futuro punto de ampliación: 
    // Agregar un sistema de navegación para resaltar el elemento activo del menú

    // Futuro punto de ampliación: 
    // Implementar un sistema de búsqueda para filtrar los temas disponibles

    
});
