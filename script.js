// 1. CARGA DINÁMICA DE MODALES (Mantiene el index.html limpio)
document.addEventListener('DOMContentLoaded', () => {
    fetch('modales.html')
        .then(response => {
            if (!response.ok) throw new Error('No se encontró modales.html');
            return response.text();
        })
        .then(data => {
            const container = document.getElementById('modal-container');
            if (container) {
                container.innerHTML = data;
                // Re-inicializa iconos y enlaces después de cargar el HTML
                if (window.lucide) lucide.createIcons();
                setupAppLinks();
            }
        })
        .catch(err => console.warn('Aviso: Ejecutando en local o modales.html ausente.'));
    
    // Inicialización general
    setupAppLinks();
    if(window.lucide) lucide.createIcons();
});

// 2. DATOS (FESTIVOS Y APERTURAS 2026)
const festivosCLM = [
    { fecha: "2026-01-01", nombre: "Año Nuevo" },
    { fecha: "2026-01-06", nombre: "Epifanía (Reyes)" },
    { fecha: "2026-04-02", nombre: "Jueves Santo" },
    { fecha: "2026-04-03", nombre: "Viernes Santo" },
    { fecha: "2026-05-01", nombre: "Fiesta del Trabajo" },
    { fecha: "2026-05-30", nombre: "Día de la Región" },
    { fecha: "2026-06-04", nombre: "Corpus Christi" },
    { fecha: "2026-08-15", nombre: "Asunción de la Virgen" },
    { fecha: "2026-10-12", nombre: "Fiesta Nacional" },
    { fecha: "2026-11-01", nombre: "Todos los Santos" },
    { fecha: "2026-12-06", nombre: "Día de la Constitución" },
    { fecha: "2026-12-08", nombre: "Inmaculada Concepción" },
    { fecha: "2026-12-25", nombre: "Natividad del Señor" }
];

const aperturasComercio = [
    { fecha: "2026-01-04", nombre: "Domingo" },
    { fecha: "2026-01-11", nombre: "Domingo" },
    { fecha: "2026-04-02", nombre: "Jueves Santo" },
    { fecha: "2026-05-30", nombre: "Día de la Región" },
    { fecha: "2026-07-05", nombre: "Domingo" },
    { fecha: "2026-11-27", nombre: "Viernes (Black Friday)" },
    { fecha: "2026-12-06", nombre: "Domingo" },
    { fecha: "2026-12-13", nombre: "Domingo" },
    { fecha: "2026-12-20", nombre: "Domingo" },
    { fecha: "2026-12-27", nombre: "Domingo" }
];

// 3. FUNCIONES DE MODALES (ABRIR / CERRAR)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        // Bloqueamos scroll del fondo
        document.body.style.overflow = 'hidden';
        
        // Si es el calendario, dibujamos las fechas
        if (id === 'modalCalendario') {
            renderCalendarios();
        }
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeModalExterno(event, id) {
    if (event.target.id === id) closeModal(id);
}

// 4. LÓGICA DEL CALENDARIO (COLORES Y TACHADOS)
function renderCalendarios() {
    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    const pintarLista = (datos, containerId) => {
        const contenedor = document.getElementById(containerId);
        if (!contenedor) return;
        contenedor.innerHTML = "";
        
        datos.forEach(item => {
            const fechaItem = new Date(item.fecha);
            const esPasado = fechaItem < hoy;
            const esProximo = !esPasado && (fechaItem - hoy) / (1000 * 60 * 60 * 24) <= 31;
            
            const div = document.createElement('div');
            div.className = `date-item ${esPasado ? 'date-past' : ''} ${esProximo ? 'date-highlight' : ''}`;
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.padding = "8px 0";
            div.style.borderBottom = "1px solid #eee";
            div.style.opacity = esPasado ? "0.5" : "1";
            if(esPasado) div.style.textDecoration = "line-through";
            
            const opciones = { day: '2-digit', month: 'short' };
            const fechaFormateada = fechaItem.toLocaleDateString('es-ES', opciones);
            
            div.innerHTML = `<span>${fechaFormateada}</span> <strong>${item.nombre}</strong>`;
            contenedor.appendChild(div);
        });
    };

    pintarLista(festivosCLM, "lista-festivos");
    pintarLista(aperturasComercio, "lista-comercio");
}

// 5. SEDES (DESPLEGABLES)
function toggleSedes(id) {
    const lista = document.getElementById(id);
    const todas = document.querySelectorAll('.lista-sedes');
    
    todas.forEach(s => { 
        if (s.id !== id) { 
            s.style.display = 'none'; 
            s.classList.remove('active'); 
        } 
    });
    
    if (lista) {
        if (lista.style.display === 'block') {
            lista.style.display = 'none';
            lista.classList.remove('active');
        } else {
            lista.style.display = 'block';
            lista.classList.add('active');
        }
    }
}

// 6. DETECCIÓN DE SISTEMA OPERATIVO (IOS/ANDROID)
function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    const linkRegistra = document.getElementById('link-registra-final');
    if(linkRegistra) {
        linkRegistra.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-registra/id6737269009" 
            : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    }
    
    const linkAfiliado = document.getElementById('link-afiliado-final');
    if(linkAfiliado) {
        linkAfiliado.href = isIOS 
            ? "https://apps.apple.com/es/app/ugt-app/id1531325029" 
            : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
    }
}
