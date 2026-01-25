// Inicializar Iconos
lucide.createIcons();

// Función para abrir modales
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Función para cerrar modales
function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Cerrar al pulsar fuera del contenido
function closeModalExterno(event, id) {
    if (event.target.id === id) {
        closeModal(id);
    }
}

// Control de Sedes (Acordeón)
function toggleSedes(id) {
    const lista = document.getElementById(id);
    const todas = document.querySelectorAll('.lista-sedes');
    
    // Cerrar las otras si se abre una nueva
    todas.forEach(s => {
        if (s.id !== id) s.classList.remove('active');
    });

    lista.classList.toggle('active');
}

// Enlaces dinámicos para Apps (detectar Android/iOS)
function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    const linkRegistra = document.getElementById('link-registra-final');
    if(linkRegistra) {
        linkRegistra.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-registra/id1465851456" 
            : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    }

    const linkAfiliado = document.getElementById('link-afiliado-final');
    if(linkAfiliado) {
        linkAfiliado.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-app/id1440223785" 
            : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
    }
}

window.onload = setupAppLinks;
