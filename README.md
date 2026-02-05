# 🚩 Herramientas Laborales - FeSMC UGT Castilla-La Mancha

Aplicación web ligera y optimizada para dispositivos móviles, diseñada para facilitar el acceso a información laboral, convenios colectivos y trámites oficiales para delegados y afiliados de la región.

## 📱 Descripción del Proyecto
Esta herramienta centraliza los recursos más consultados en la acción sindical diaria, eliminando la necesidad de buscar enlaces complejos en Google. Está construida con HTML5, CSS3 y JavaScript puro (Vanilla JS), sin dependencias externas pesadas.

---

## 🏗️ Estructura del Código (Recordatorio)

Para mantener el proyecto limpio, hemos dividido la aplicación en varios archivos clave:

1.  **`index.html`**: Es el esqueleto. Contiene los botones principales de la pantalla de inicio.
2.  **`modales.html`**: Contiene el contenido de todas las ventanas emergentes (Convenios, Sedes, Calculadoras, etc.). Se carga dinámicamente para no sobrecargar el inicio.
3.  **`tramites.json`**: La "base de datos". Aquí es donde se añaden o quitan los enlaces de Seguridad Social y Hacienda.
4.  **`script.js`**: El cerebro. Gestiona la apertura de modales, la lectura del JSON y la carga de iconos de Lucide.
5.  **`style.css`**: Define la estética (colores corporativos #e30613, tarjetas blancas y diseño móvil).

---

## 🛠️ Cómo realizar cambios comunes

### 1. Añadir o cambiar un enlace de Hacienda/Seguridad Social
No toques el HTML. Ve directamente a `tramites.json`.
* **Regla de oro**: Cada bloque `{ }` debe ir separado por una coma `,`, EXCEPTO el último de la lista.
* **Campos**: `nombre`, `descripcion` y `url`.

### 2. Modificar un Convenio o una Sede
Estos cambios se hacen en `modales.html`.
* Busca el `id` correspondiente (ej: `id="modalConvenios"` o `id="modalSedes"`).
* Si añades un botón de convenio, asegúrate de que tenga la clase `class="btn-sector"` para que mantenga el diseño.

### 3. Arreglar Iconos
Usamos la librería **Lucide**. Para poner un icono nuevo:
1. Busca el nombre en [lucide.dev](https://lucide.dev/icons).
2. Usa el formato: `<i data-lucide="nombre-del-icono"></i>`.

---

## 🚀 Despliegue (GitHub Pages)
El proyecto está configurado para actualizarse automáticamente:
1. Subes los cambios a la rama `main`.
2. En 1-2 minutos, los cambios son visibles en la URL de GitHub Pages.
3. **Nota**: Si no ves los cambios, refresca el navegador del móvil deslizando hacia abajo para limpiar la caché.

---

## 📌 Notas de Mantenimiento (CLM)
* **Sectores Activos**: Transporte y Logística, Comercio, Hostelería y Limpieza.
* **Sedes**: Incluye las 5 provincias con especial detalle en la Sede Regional de Guadalajara.
* **Aviso Legal**: Se ha incluido un aviso en las calculadoras indicando que los resultados son orientativos.

---
*Desarrollado para mejorar la eficiencia de la acción sindical en Castilla-La Mancha.*
