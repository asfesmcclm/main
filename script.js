// 1. CARGA DINÁMICA DE MODALES
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
                if (window.lucide) lucide.createIcons();
                setupAppLinks();
            }
        })
        .catch(err => console.warn('Aviso: Ejecutando en local o modales.html ausente.'));
    
    setupAppLinks();
    if(window.lucide) lucide.createIcons();
});

// 2. DATOS (FESTIVOS Y APERTURAS 2026)
const festivosCLM = [
    { fecha: "2026-01-01", nombre: "Año Nuevo" }, { fecha: "2026-01-06", nombre: "Epifanía (Reyes)" },
    { fecha: "2026-04-02", nombre: "Jueves Santo" }, { fecha: "2026-04-03", nombre: "Viernes Santo" },
    { fecha: "2026-05-01", nombre: "Fiesta del Trabajo" }, { fecha: "2026-06-04", nombre: "Corpus Christi" },
    { fecha: "2026-08-15", nombre: "Asunción de la Virgen" }, { fecha: "2026-10-12", nombre: "Fiesta Nacional" },
    { fecha: "2026-11-01", nombre: "Todos los Santos" }, { fecha: "2026-12-06", nombre: "Día de la Constitución" },
    { fecha: "2026-12-08", nombre: "Inmaculada Concepción" }, { fecha: "2026-12-25", nombre: "Natividad del Señor" }
];

const aperturasComercio = [
    { fecha: "2026-01-04", nombre: "Domingo" }, { fecha: "2026-01-11", nombre: "Domingo" },
    { fecha: "2026-04-02", nombre: "Jueves Santo" }, { fecha: "2026-05-30", nombre: "Día de la Región" },
    { fecha: "2026-07-05", nombre: "Domingo" }, { fecha: "2026-11-27", nombre: "Viernes (Black Friday)" },
    { fecha: "2026-12-06", nombre: "Domingo" }, { fecha: "2026-12-13", nombre: "Domingo" },
    { fecha: "2026-12-20", nombre: "Domingo" }, { fecha: "2026-12-27", nombre: "Domingo" }
];

// 3. FUNCIONES DE MODALES (ABRIR / CERRAR)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (id === 'modalCalendario') renderCalendarios();
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

// 4. CARGAR TRÁMITES (HACIENDA Y SEGURIDAD SOCIAL)
async function abrirModal(tipo) {
    try {
        const respuesta = await fetch('tramites.json');
        if (!respuesta.ok) throw new Error('No se pudo cargar tramites.json');
        const datos = await respuesta.json();
        const seccion = datos[tipo];
        
        const modal = document.getElementById("modalInfo");
        const titulo = document.getElementById("modalTitulo");
        const cuerpo = document.getElementById("modalCuerpo");

        titulo.innerText = tipo === 'seguridadSocial' ? 'Seguridad Social' : 'Hacienda (AEAT)';
        
        let htmlContenido = "";
        seccion.forEach(item => {
            htmlContenido += `
                <div class="tramite-item">
                    <strong>${item.nombre}</strong>
                    <p>${item.descripcion}</p>
                    <a href="${item.url}" target="_blank" class="btn-directo">Acceder al trámite</a>
                </div>`;
        });

        // AÑADIMOS EL BOTÓN DE VOLVER QUE FALTABA
        htmlContenido += `<button onclick="closeModal('modalInfo')" class="btn-close" style="margin-top:20px; width:100%;">Volver</button>`;

        cuerpo.innerHTML = htmlContenido;
        modal.style.display = "flex"; // Cambiado a flex para centrar como los demás
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error("Error:", error);
    }
}

// 5. LÓGICA DEL CALENDARIO
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
            const div = document.createElement('div');
            div.className = `date-item ${esPasado ? 'date-past' : ''}`;
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.padding = "8px 0";
            div.style.borderBottom = "1px solid #eee";
            if(esPasado) { div.style.opacity = "0.5"; div.style.textDecoration = "line-through"; }
            const fechaFormateada = fechaItem.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            div.innerHTML = `<span>${fechaFormateada}</span> <strong>${item.nombre}</strong>`;
            contenedor.appendChild(div);
        });
    };
    pintarLista(festivosCLM, "lista-festivos");
    pintarLista(aperturasComercio, "lista-comercio");
}

// 6. OTROS
function toggleSedes(id) {
    const todas = document.querySelectorAll('.lista-sedes');
    todas.forEach(s => { if (s.id !== id) s.style.display = 'none'; });
    const lista = document.getElementById(id);
    if (lista) lista.style.display = (lista.style.display === 'block') ? 'none' : 'block';
}

function setupAppLinks() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const l1 = document.getElementById('link-registra-final');
    if(l1) l1.href = isIOS ? "https://apps.apple.com/es/app/ugt-registra/id6737269009" : "https://play.google.com/store/apps/details?id=org.ugt.ugtregistra";
    const l2 = document.getElementById('link-afiliado-final');
    if(l2) l2.href = isIOS ? "https://apps.apple.com/es/app/ugt-app/id1531325029" : "https://play.google.com/store/apps/details?id=com.ugt.afiliados";
}
