/* doc/js/modales_modelos.js */

// 1. DICCIONARIO DE ETIQUETAS (Traductor para el formulario)
const etiquetasCampos = {
    "empresa": "Nombre de la Empresa",
    "localidad": "Localidad (donde firmas)",
    "fecha": "Fecha de hoy",
    "nombre": "Tu Nombre y Apellidos",
    "dni": "DNI o NIE",
    "email": "Tu Correo electrónico",
    "telefono": "Tu Teléfono",
    "fecha_nacimiento": "Fecha nacimiento del menor",
    "semanas": "Nº de semanas solicitadas",
    "monoparental": "Familia monoparental (Sí/No)",
    "modalidad": "Modalidad (Completa/Parcial)",
    "fecha_inicio": "Fecha de inicio del permiso",
    "fecha_fin": "Fecha de finalización",
    "motivo": "Motivo o aclaraciones",
    "puesto": "Tu Puesto de trabajo",
    "departamento": "Departamento / Sección",
    "parentesco": "Grado de parentesco",
    "convenio": "Convenio Colectivo aplicable",
    "hijos_menores": "Nº de hijos menores de 12 años",
    "reduccion": "Porcentaje o concreción horaria",
    "parto_multiple": "Nº de hijos en este parto",
    "discapacidad": "¿Existe discapacidad? (Sí/No)"
};

const ModalesUGT = {
    modelos: {},
    selKey: "",

    init: function(data) {
        this.modelos = data;
        this.renderIndice();
    },

    renderIndice: function() {
        const lista = document.getElementById('indice-lista');
        if (!lista) return;
        lista.innerHTML = "";
        Object.keys(this.modelos).forEach(key => {
            const li = document.createElement('div');
            li.className = 'card-permiso';
            li.innerHTML = `<span>${this.modelos[key].titulo}</span> <b>➔</b>`;
            li.onclick = () => this.abrirPaso1(key);
            lista.appendChild(li);
        });
    },

    // PASO 1: Información de uso y selección
    abrirPaso1: function(key) {
        this.selKey = key;
        const m = this.modelos[key];
        const contenido = `
            <h2 style="color:#e30613; font-size:1.2rem; margin-top:0;">${m.titulo}</h2>
            
            <div style="background: #f0f7ff; border-left: 4px solid #0056b3; padding: 12px; margin-bottom: 20px; border-radius: 4px; text-align: left;">
                <p style="font-size: 0.85rem; color: #003a7a; margin: 0; line-height: 1.4;">
                    <strong>INFORMACIÓN:</strong> ${m.uso || 'Consulte los detalles del permiso.'}
                </p>
            </div>

            <p style="font-size:0.9rem; color:#666; margin-bottom:15px;">¿Cómo desea preparar su solicitud?</p>
            <button class="btn-ugt" onclick="ModalesUGT.abrirPaso2()">PERSONALIZAR CON MIS DATOS</button>
            <button class="btn-ugt btn-sec" style="margin-top:10px;" onclick="ModalesUGT.generar(true)">VER BORRADOR EN BLANCO</button>
        `;
        this.mostrarModal(contenido);
    },

    // PASO 2: Formulario dinámico con CALENDARIO automático
    abrirPaso2: function() {
        const m = this.modelos[this.selKey];
        if (!m.variables) return;

        const camposHtml = m.variables.map(v => {
            const labelBonito = etiquetasCampos[v] || v;
            // Si la variable contiene "fecha", activamos el input de calendario
            const tipoInput = v.toLowerCase().includes('fecha') ? 'date' : 'text';
            
            return `
                <div class="form-group" style="margin-bottom: 15px; text-align: left;">
                    <label style="display:block; font-weight:bold; font-size:0.8rem; margin-bottom:5px; color:#444;">${labelBonito}</label>
                    <input type="${tipoInput}" id="val-${v}" class="input-ugt" 
                           style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing: border-box;">
                </div>
            `;
        }).join('');

        const contenido = `
            <h3 style="margin-top:0; color:#e30613;">Personalizar Escrito</h3>
            <div class="scroll-area" style="max-height: 45vh; overflow-y: auto; padding-right:10px;">
                ${camposHtml}
            </div>
            <div style="margin-top:20px;">
                <button class="btn-ugt" onclick="ModalesUGT.generar(false)">GENERAR DOCUMENTO</button>
                <button class="btn-ugt btn-sec" style="margin-top:10px;" onclick="ModalesUGT.abrirPaso1('${this.selKey}')">VOLVER</button>
            </div>
        `;
        this.mostrarModal(contenido);
    },

    // PASO 3: Generación final con conversión de formato de fecha
    generar: function(blanco) {
        const m = this.modelos[this.selKey];
        let texto = m.plantilla;
        if (!m.variables) return;

        m.variables.forEach(v => {
            const inputEl = document.getElementById(`val-${v}`);
            const etiqueta = etiquetasCampos[v] || v;
            let valor = "";

            if (blanco) {
                valor = `[${etiqueta.toUpperCase()}]`;
            } else {
                valor = inputEl ? inputEl.value.trim() : "";
                
                // Conversión de fecha de YYYY-MM-DD a DD/MM/YYYY
                if (v.toLowerCase().includes('fecha') && valor.includes('-')) {
                    valor = valor.split('-').reverse().join('/');
                }

                if (!valor) valor = `[${etiqueta.toUpperCase()}]`;
            }
            
            const regex = new RegExp(`{${v}}`, 'g');
            texto = texto.replace(regex, valor);
        });

        const contenido = `
            <h3 style="margin-top:0; color:#e30613;">Escrito Listo</h3>
            <div id="output-text-final" class="output-final" style="white-space: pre-wrap; text-align: left; background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 0.85rem; max-height: 50vh; overflow-y: auto;">${texto}</div>
            <div style="margin-top:20px;">
                <button class="btn-ugt" onclick="ModalesUGT.copiar()">Copiar al Portapapeles</button>
                <button class="btn-ugt btn-sec" style="margin-top:10px;" onclick="ModalesUGT.cerrar()">Cerrar</button>
            </div>
        `;
        this.mostrarModal(contenido);
    },

    mostrarModal: function(html) {
        const inner = document.getElementById('modal-content-inner');
        if (inner) {
            inner.innerHTML = html;
            document.getElementById('modal-overlay').style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    },

    cerrar: function() {
        document.getElementById('modal-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    copiar: function() {
        const txt = document.getElementById('output-text-final').innerText;
        navigator.clipboard.writeText(txt).then(() => {
            alert("¡Texto copiado!");
        });
    }
};
