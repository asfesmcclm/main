
// 1. INICIALIZAR ICONOS
lucide.createIcons();

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
        setTimeout(() => modal.classList.add('active'), 10);
        // Si abrimos el calendario, generamos la lista dinámicamente
        if (id === 'modalCalendario') renderCalendarios();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
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
            // Resaltar si es en los próximos 31 días
            const esProximo = !esPasado && (fechaItem - hoy) / (1000 * 60 * 60 * 24) <= 31;
            
            const div = document.createElement('div');
            div.className = `date-item ${esPasado ? 'date-past' : ''} ${esProximo ? 'date-highlight' : ''}`;
            
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
    
    if (lista.style.display === 'block') {
        lista.style.display = 'none';
        lista.classList.remove('active');
    } else {
        lista.style.display = 'block';
        lista.classList.add('active');
    }
}

// 6. DETECCIÓN DE SISTEMA OPERATIVO PARA APPS
function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const linkRegistra = document.getElementById('link-registra-final');
    if(linkRegistra) linkRegistra.href = isIOS ? "https://apps.apple.com/es/app/ugt-registra/id1465851456" : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    const linkAfiliado = document.getElementById('link-afiliado-final');
    if(linkAfiliado) linkAfiliado.href = isIOS ? "https://apps.apple.com/es/app/ugt-app/id1440223785" : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
}

// AL CARGAR LA WEB
window.onload = setupAppLinks;



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
