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


// 4. GESTIÓN DE CONTENIDO DINÁMICO (Hacienda, SS y Formación)
async function gestionarContenidoModal(tipo) {
    const titulo = document.getElementById("modalTitulo");
    const cuerpo = document.getElementById("modalCuerpo");

    try {
        if (tipo === 'formacionEmpleo') {
            titulo.innerText = 'Formación y Empleo';
            const res = await fetch('doc/modulo-formacion.html');
            if (!res.ok) throw new Error('No se encontró el archivo de formación');
            cuerpo.innerHTML = await res.text();
        } else {
            // Carga desde trámites.json
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

        // Botón VOLVER único al final del contenido inyectado
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

// 5. CARGA DE SEDES DESDE JSON (Integración Final)
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
                    <a href="mailto:${prov.federal.email}" style="display:block; margin-top:5px; color:#666; font-size:0.8rem;">
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

// 6. FUNCIONES DE APOYO (Transiciones y Vistas)
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
        <div class="seccion-card" style="border-left: 5px solid #e30613; padding:20px; background:#fff; border-radius:12px; margin-bottom:15px; border: 1px solid #eee; border-left: 5px solid #e30613;">
            <div style="color:#e30613; font-weight:800; margin-bottom:10px; font-size:1rem;">UGT CASTILLA-LA MANCHA</div>
            <p style="font-size:0.82rem; color:#777; margin-bottom:15px;">Cursos gratuitos, FP Dual y Oposiciones en la región.</p>
            <a href="https://www.ugtclm.es/formacion/" target="_blank" style="display:block; text-align:center; background:#e30613; color:white; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; font-size:0.85rem;">VER FORMACIÓN REGIONAL</a>
        </div>
        <div class="seccion-card" style="border-left: 5px solid #444; padding:20px; background:#fff; border-radius:12px; margin-bottom:15px; border: 1px solid #eee; border-left: 5px solid #444;">
            <div style="color:#444; font-weight:800; margin-bottom:10px; font-size:1rem;">FeSMC UGT (Sectorial)</div>
            <p style="font-size:0.82rem; color:#777; margin-bottom:15px;">Especialización en Comercio, Hostelería, Logística y OPE ADIF.</p>
            <a href="https://www.fesmcugt.org/formacion/cursos" target="_blank" style="display:block; text-align:center; background:#444; color:white; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; font-size:0.85rem;">VER CURSOS SECTORIALES</a>
        </div>
        <button onclick="gestionarContenidoModal('formacionEmpleo')" style="width:100%; padding:15px; background:none; color:#e30613; border:1px solid #e30613; border-radius:12px; font-weight:800;">VOLVER ATRÁS</button>
    `;
    cambiarContenidoModal(htmlOpciones, "Opciones de Formación");
}
