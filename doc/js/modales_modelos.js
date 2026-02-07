/* doc/js/modales_modelos.js */

const ModalesUGT = {
    modelos: {},
    selKey: "",

    // 1. Inicializar la aplicación con los datos del JSON
    init: function(data) {
        this.modelos = data;
        this.renderIndice();
    },

    // 2. Dibujar la lista de permisos en la pantalla principal
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

    // 3. PASO 1: Modal de elección (Datos vs Blanco)
    abrirPaso1: function(key) {
        this.selKey = key;
        const m = this.modelos[key];
        const contenido = `
            <h2 style="color:#e30613; font-size:1.2rem; margin-top:0;">${m.titulo}</h2>
            <p style="font-size:0.9rem; color:#666;">Seleccione una opción para continuar:</p>
            <button class="btn-ugt" onclick="ModalesUGT.abrirPaso2()">Rellenar mis datos personales</button>
            <button class="btn-ugt btn-sec" onclick="ModalesUGT.generar(true)">Ver borrador en blanco</button>
        `;
        this.mostrarModal(contenido);
    },

    // 4. PASO 2: Formulario dinámico basado en los campos del JSON
    abrirPaso2: function() {
        const m = this.modelos[this.selKey];
        const camposHtml = m.campos.map(c => `
            <div class="form-group">
                <label>${c.label}</label>
                <input type="${c.tipo || 'text'}" id="val-${c.id}" placeholder="Introduzca dato...">
            </div>
        `).join('');

        const contenido = `
            <h3 style="margin-top:0;">Personalizar Escrito</h3>
            <div class="scroll-area">${camposHtml}</div>
            <button class="btn-ugt" onclick="ModalesUGT.generar(false)">Generar Documento Final</button>
            <button class="btn-ugt btn-sec" onclick="ModalesUGT.abrirPaso1('${this.selKey}')">Volver atrás</button>
        `;
        this.mostrarModal(contenido);
    },

    // 5. PASO 3: Generación del texto legal y previsualización
    generar: function(blanco) {
        const m = this.modelos[this.selKey];
        let texto = m.plantilla;

        m.campos.forEach(c => {
            let valor = blanco ? `[${c.label.toUpperCase()}]` : document.getElementById(`val-${c.id}`).value;
            
            // Si el campo está vacío, ponemos el nombre del campo entre corchetes
            if (!valor) valor = `[${c.label.toUpperCase()}]`;
            
            // Formatear fechas de YYYY-MM-DD a DD/MM/YYYY para España
            if (!blanco && document.getElementById(`val-${c.id}`).type === 'date' && valor.includes('-')) {
                valor = valor.split('-').reverse().join('/');
            }
            
            // Reemplazar la variable ${id} en la plantilla
            texto = texto.split(`\${${c.id}}`).join(valor);
        });

        const contenido = `
            <h3 style="margin-top:0;">Escrito Listo</h3>
            <div id="output-text-final" class="output-final">${texto}</div>
            <button class="btn-ugt" onclick="ModalesUGT.copiar()">Copiar al Portapapeles</button>
            <button class="btn-ugt btn-sec" onclick="ModalesUGT.cerrar()">Finalizar y Cerrar</button>
        `;
        this.mostrarModal(contenido);
    },

    // 6. Funciones de utilidad (Cerrar, Abrir y Copiar)
    mostrarModal: function(html) {
        const inner = document.getElementById('modal-content-inner');
        if (inner) {
            inner.innerHTML = html;
            document.getElementById('modal-overlay').style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        }
    },

    cerrar: function() {
        document.getElementById('modal-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    copiar: function() {
        const txt = document.getElementById('output-text-final').innerText;
        navigator.clipboard.writeText(txt).then(() => {
            alert("¡Texto copiado! Ya puedes pegarlo en tu correo o documento.");
        }).catch(err => {
            console.error("Error al copiar: ", err);
        });
    }
};
