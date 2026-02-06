const sedesData = [
    {
        id: "Albacete",
        nombre: "Albacete",
        federal: { nombre: "FeSMC UGT Albacete", direccion: "C/ Luis Rosales, 7 - 1ª planta, 02003", telefono: "967 521 850", email: "albacete@fesmcugt.org" },
        municipios: [
            { pueblo: "Almansa", direccion: "Plaza del Rey D. Jaime I, 7", telefono: "967 342 954" },
            { pueblo: "Hellín", direccion: "C/ Juan XXIII, 5", telefono: "967 304 030" },
            { pueblo: "Villarrobledo", direccion: "C/ Cruz Verde, 4", telefono: "967 142 014" }
        ]
    },
    {
        id: "CR",
        nombre: "Ciudad Real",
        federal: { nombre: "FeSMC UGT Ciudad Real (Residencial)", direccion: "Residencial Ronda, C/ de la Solana, s/n, 13004", telefono: "926 251 828", email: "ciudadreal@fesmcugt.org" },
        union: { nombre: "UGT Unión Provincial (Alarcos)", direccion: "C/ Alarcos, 24, 13001", telefono: "926 214 945" },
        municipios: [
            { pueblo: "Alcázar de S. Juan", direccion: "C/ La Feria, 13", telefono: "926 546 123" },
            { pueblo: "Puertollano", direccion: "C/ Juan Bravo, 6", telefono: "926 425 728" },
            { pueblo: "Tomelloso", direccion: "C/ Socuéllamos, 98", telefono: "667 767 769" },
            { pueblo: "Manzanares", direccion: "C/ Molinos de Viento, 1", telefono: "926 611 762" }
        ]
    },
    {
        id: "Guada",
        nombre: "Guadalajara",
        federal: { nombre: "FeSMC UGT Guadalajara y SEDE REGIONAL", direccion: "Plaza de España, 12, 19001", telefono: "949 223 980", email: "guadalajara@fesmcugt.org | castillalamancha@fesmcugt.org" },
        municipios: []
    },
    {
        id: "Cuenca",
        nombre: "Cuenca",
        federal: { nombre: "FeSMC UGT Cuenca", direccion: "Avda. Reyes Católicos, 78, 16003", telefono: "969 211 213", email: "cuenca@fesmcugt.org" },
        municipios: [{ pueblo: "Tarancón", direccion: "C/ Garcilaso de la Vega, local 4", telefono: "969 322 063" }]
    },
    {
        id: "Toledo",
        nombre: "Toledo",
        federal: { nombre: "FeSMC UGT Toledo", direccion: "Cuesta de Carlos V, 1, 45001", telefono: "925 252 518", email: "toledo@fesmcugt.org" },
        municipios: [{ pueblo: "Talavera de la Reina", direccion: "C/ Mesones, 38", telefono: "925 813 300" }]
    }
];


// 1. CARGA DINÁMICA DE MODALES Y SEDES
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
                // Cargamos las sedes desde el JSON una vez el HTML base está listo
                cargarSedes();
            }
        })
        .catch(err => console.warn('Aviso: Ejecutando en local o modales.html ausente.'));
    
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

// 4. CARGA DINÁMICA DE CONTENIDO (Hacienda, SS y Formación)
async function gestionarContenidoModal(tipo) {
    const titulo = document.getElementById("modalTitulo");
    const cuerpo = document.getElementById("modalCuerpo");

    try {
        if (tipo === 'formacionEmpleo') {
            titulo.innerText = 'Formación y Empleo';
            const res = await fetch('doc/modulo-formacion.html');
            if (!res.ok) throw new Error('No se encontró doc/modulo-formacion.html');
            cuerpo.innerHTML = await res.text();
        } else {
            const respuesta = await fetch('tramites.json');
            const datos = await respuesta.json();
            const seccion = datos[tipo];
            
            titulo.innerText = tipo === 'seguridadSocial' ? 'Seguridad Social' : 'Hacienda (AEAT)';
            
            let htmlContenido = "";
            seccion.forEach(item => {
                htmlContenido += `
                    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 10px; background: #fafafa; text-align: left;">
                        <strong style="color: #333; font-size: 1.05rem; display: block;">${item.nombre}</strong>
                        <p style="font-size: 0.85rem; color: #666; margin: 8px 0 12px 0;">${item.descripcion}</p>
                        <a href="${item.url}" target="_blank" style="display: block; text-align: center; background: #fff; color: #e30613; border: 1px solid #e30613; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.9rem;">
                            ACCEDER AL TRÁMITE
                        </a>
                    </div>`;
            });
            cuerpo.innerHTML = htmlContenido;
        }

        // Botón VOLVER común a todos al final
        cuerpo.innerHTML += `
            <button onclick="closeModal('modalInfo')" 
                    style="margin-top:10px; width:100%; padding: 15px; background: #e30613; color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: bold; font-size: 1rem;">
                VOLVER
            </button>`;

        openModal('modalInfo');
    } catch (error) {
        console.error("Error al cargar contenido:", error);
    }
}

// 5. CARGA DE SEDES DESDE JSON
async function cargarSedes() {
    try {
        const response = await fetch('sedes.json');
        const data = await response.json();
        const contenedor = document.getElementById('contenedor-sedes-dinamico');
        if (!contenedor) return;

        let html = '';
        data.provincias.forEach(prov => {
            html += `
            <button class="btn-provincia" onclick="toggleSedes('lista-${prov.id}')">
                ${prov.nombre} <i data-lucide="chevron-down"></i>
            </button>
            <div id="lista-${prov.id}" class="lista-sedes" style="display:none; padding:10px;">
                
                <div class="sede-item" style="border-left: 4px solid #444; background: #f8f9fa; padding:12px; margin-bottom:10px; border-radius:12px; border:1px solid #eee;">
                    <h4 style="margin:0; color:#333; font-size:0.95rem; font-weight:800;">${prov.federal.nombre}</h4>
                    <p style="font-size:0.85rem; margin:5px 0; color:#666;">${prov.federal.direccion}</p>
                    <a href="tel:${prov.federal.telefono.replace(/\s/g, '')}" style="color:#e30613; font-weight:bold; text-decoration:none;">
                        <i data-lucide="phone" style="width:14px; vertical-align:middle;"></i> ${prov.federal.telefono}
                    </a>
                    ${prov.federal.telefono2 ? ` | <a href="tel:${prov.federal.telefono2.replace(/\s/g, '')}" style="color:#e30613; font-weight:bold; text-decoration:none;">${prov.federal.telefono2}</a>` : ''}
                    <a href="mailto:${prov.federal.email}" style="display:block; margin-top:5px; color:#666; font-size:0.8rem; text-decoration:none;">
                        <i data-lucide="mail" style="width:14px; vertical-align:middle;"></i> ${prov.federal.email}
                    </a>
                </div>

                <div class="sede-item" style="border-left: 4px solid #e30613; background: #fff5f5; padding:12px; margin-bottom:10px; border-radius:12px; border:1px solid #ffebeb;">
                    <h4 style="margin:0; color:#e30613; font-size:0.95rem; font-weight:800;">${prov.union.nombre}</h4>
                    <p style="font-size:0.85rem; margin:5px 0;">${prov.union.direccion}</p>
                    <a href="tel:${prov.union.telefono.replace(/\s/g, '')}" style="color:#e30613; font-weight:bold; text-decoration:none;">
                        <i data-lucide="phone" style="width:14px; vertical-align:middle;"></i> ${prov.union.telefono}
                    </a>
                </div>

                <div style="margin-top:10px;">
                    ${prov.municipios.map(m => `
                        <div style="font-size:0.85rem; padding: 10px 0; border-top:1px solid #eee;">
                            <strong>${m.pueblo}:</strong> ${m.direccion} 
                            ${m.telefono ? `<br><a href="tel:${m.telefono.replace(/\s/g, '')}" style="color:#e30613; text-decoration:none; font-weight:bold;">${m.telefono}</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
        });
        contenedor.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    } catch (e) { console.error("Error cargando sedes:", e); }
}

// 6. LÓGICA DEL CALENDARIO
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

// 7. NAVEGACIÓN Y OTROS
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

function cambiarContenidoModal(htmlContenido, nuevoTitulo) {
    const cuerpo = document.getElementById("modalCuerpo");
    const titulo = document.getElementById("modalTitulo");
    if (!cuerpo || !titulo) return;
    cuerpo.style.opacity = 0;
    setTimeout(() => {
        if (nuevoTitulo) titulo.innerText = nuevoTitulo;
        cuerpo.innerHTML = htmlContenido;
        cuerpo.style.opacity = 1;
    }, 150);
}

function mostrarOpcionesFormacion() {
    const htmlOpciones = `
        <div class="seccion-card" style="border-left: 5px solid #e30613; padding:20px; background:#fff; border-radius:12px; margin-bottom:15px; border: 1px solid #eee;">
            <div style="color:#e30613; font-weight:800; margin-bottom:10px; font-size:1rem;">UGT CASTILLA-LA MANCHA</div>
            <p style="font-size:0.82rem; color:#777; margin-bottom:12px;">Cursos gratuitos, FP Dual y ACREDITA.</p>
            <a href="https://www.ugtclm.es/formacion/" target="_blank" style="display:block; text-align:center; background:#e30613; color:white; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; font-size:0.85rem;">VER FORMACIÓN REGIONAL</a>
        </div>
        <div class="seccion-card" style="border-left: 5px solid #444; padding:20px; background:#fff; border-radius:12px; margin-bottom:15px; border: 1px solid #eee;">
            <div style="color:#444; font-weight:800; margin-bottom:10px; font-size:1rem;">FeSMC UGT (Sectorial)</div>
            <p style="font-size:0.82rem; color:#777; margin-bottom:12px;">Comercio, Hostelería, Logística y OPE ADIF.</p>
            <a href="https://www.fesmcugt.org/formacion/cursos" target="_blank" style="display:block; text-align:center; background:#444; color:white; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; font-size:0.85rem;">VER CURSOS SECTORIALES</a>
        </div>
        <button onclick="gestionarContenidoModal('formacionEmpleo')" 
                style="margin-top:10px; width:100%; padding:15px; background:none; color:#e30613; border:1px solid #e30613; border-radius:12px; cursor:pointer; font-weight:800;">
            VOLVER ATRÁS
        </button>`;
    cambiarContenidoModal(htmlOpciones, "Opciones de Formación");
}
