// Inicialización de iconos Lucide
lucide.createIcons();

// Función para abrir modales
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar modales
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera del contenido blanco
function closeModalExterno(e, id) {
    if (e.target.id === id) closeModal(id);
}

// Acordeón de Sedes
function toggleSedes(id) {
    const el = document.getElementById(id);
    const isVisible = el.style.display === 'flex';
    // Opcional: Cerrar los demás acordeones abiertos
    document.querySelectorAll('.lista-sedes').forEach(d => d.style.display = 'none');
    // Alternar el actual
    el.style.display = isVisible ? 'none' : 'flex';
}

// Configuración de enlaces inteligentes según el Sistema Operativo
function configurarEnlacesApps() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const btnReg = document.getElementById('link-registra-final');
    const btnAfi = document.getElementById('link-afiliado-final');

    if (isIOS) {
        if(btnReg) btnReg.href = "https://apps.apple.com/es/app/ugt-registra/id6737269009";
        if(btnAfi) btnAfi.href = "https://apps.apple.com/es/app/ugt-app/id1531325029";
    } else {
        if(btnReg) btnReg.href = "https://play.google.com/store/apps/details?id=com.ugt.ugtregistra";
        if(btnAfi) btnAfi.href = "https://play.google.com/store/apps/details?id=com.app.ugt";
    }
}

// Ejecutar al cargar la página
window.addEventListener('load', configurarEnlacesApps);
