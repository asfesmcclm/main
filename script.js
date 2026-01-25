// 1. Inicializar Iconos de Lucide
lucide.createIcons();

// 2. Funciones para Modales (Abrir y Cerrar)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// 3. Cerrar modales al hacer clic fuera del recuadro blanco
function closeModalExterno(event, id) {
    if (event.target.id === id) {
        closeModal(id);
    }
}

// 4. Control de Acordeón de Sedes (Abrir una y cerrar las otras)
function toggleSedes(id) {
    const lista = document.getElementById(id);
    const todas = document.querySelectorAll('.lista-sedes');
    
    todas.forEach(s => {
        if (s.id !== id) s.classList.remove('active');
    });

    lista.classList.toggle('active');
}

// 5. Enlaces Inteligentes para las Apps (Detectar sistema operativo)
function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Enlace UGT Registra
    const linkRegistra = document.getElementById('link-registra-final');
    if(linkRegistra) {
        linkRegistra.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-registra/id1465851456" 
            : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    }

    // Enlace App Afiliado
    const linkAfiliado = document.getElementById('link-afiliado-final');
    if(linkAfiliado) {
        linkAfiliado.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-app/id1440223785" 
            : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
    }
}

// Ejecutar al cargar la página
window.onload = setupAppLinks;
