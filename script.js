// 1. Inicializar Iconos
lucide.createIcons();

// 2. Función para abrir modales
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

// 3. Función para cerrar modales
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// 4. Cerrar al pulsar fuera del contenido
function closeModalExterno(event, id) {
    if (event.target.id === id) {
        closeModal(id);
    }
}

// 5. FUNCIÓN DE LAS SEDES (La que hace que se desplieguen)
function toggleSedes(id) {
    const lista = document.getElementById(id);
    if (lista) {
        // Buscamos todas las listas de sedes para cerrar las que estén abiertas
        const todas = document.querySelectorAll('.lista-sedes');
        todas.forEach(s => {
            if (s.id !== id) {
                s.classList.remove('active');
                s.style.display = 'none'; // Asegura que se oculten
            }
        });

        // Alternamos la que hemos pulsado
        if (lista.style.display === 'block') {
            lista.style.display = 'none';
            lista.classList.remove('active');
        } else {
            lista.style.display = 'block';
            lista.classList.add('active');
        }
    }
}

// 6. Enlaces inteligentes para Apps
function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const linkRegistra = document.getElementById('link-registra-final');
    if(linkRegistra) {
        linkRegistra.href = isIOS ? "https://apps.apple.com/es/app/ugt-registra/id1465851456" : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    }
    const linkAfiliado = document.getElementById('link-afiliado-final');
    if(linkAfiliado) {
        linkAfiliado.href = isIOS ? "https://apps.apple.com/es/app/ugt-app/id1440223785" : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
    }
}

window.onload = setupAppLinks;
