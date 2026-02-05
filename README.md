# 🚩 Herramientas Laborales - FeSMC UGT Castilla-La Mancha

Aplicación web optimizada para dispositivos móviles diseñada para facilitar el acceso a información laboral, convenios y trámites oficiales para delegados y afiliados de la región.

## 📱 Descripción del Proyecto
Esta herramienta centraliza los recursos más consultados en la acción sindical diaria. Utiliza una arquitectura modular para ser rápida, ligera y fácil de mantener.

---

## 📂 Organización y Rutas de Archivos

| Archivo / Carpeta | Función | ¿Cuándo editarlo? |
| :--- | :--- | :--- |
| `index.html` | Estructura principal | Para cambiar los botones del menú de inicio. |
| `script.js` | El "Cerebro" | Para cambiar la lógica de apertura o carga de datos. |
| `style.css` | Diseño y Colores | Para ajustar tamaños, márgenes o el color rojo (#e30613). |
| `modales.html` | Ventanas emergentes | Para actualizar Convenios, Sedes o Calculadoras. |
| `tramites.json` | Base de Datos | Para añadir/quitar enlaces de Hacienda o Seguridad Social. |
| **📁 doc/** | Documentación externa | Carpeta para guías largas (ej: CUME). |
| `doc/cume.html` | Guía CUME | Para actualizar la normativa sobre cuidado de menores. |

---

## 🛠️ Guía de Mantenimiento Rápido

### 1. Gestión de Trámites Dinámicos (`tramites.json`)
Los botones de **Seguridad Social** y **Hacienda** leen este archivo.
* **Formato**: Cada bloque `{...}` es un trámite. 
* **Importante**: Todos los bloques llevan coma al final exceptuando el último. 
* Si el modal no abre, lo primero es revisar que el JSON no tenga errores de sintaxis (comas mal puestas).

### 2. Edición de Modales (`modales.html`)
El contenido de los botones "fijos" está aquí.
* **Convenios**: Hemos dejado solo los sectores regionales (Transporte, Comercio, Hostelería y Limpieza).
* **Sedes**: Están organizadas por provincias con botones desplegables.
* **Modelos**: El enlace al CUME apunta a `doc/cume.html`.

### 3. Iconos (Lucide)
Usamos la librería de iconos Lucide. 
* Formato: `<i data-lucide="nombre-del-icono"></i>`
* Los iconos se cargan mediante el script al final del `index.html`.

---

## 🚀 Despliegue y Caché
La web se sirve a través de **GitHub Pages**. 
1. Al subir cambios a la rama `main`, la web se actualiza en 1-2 minutos.
2. **Si no ves los cambios**: El navegador del móvil suele guardar la versión vieja. Desliza hacia abajo para forzar la actualización o abre la web en modo incógnito.

---

## 📌 Notas para el futuro
- Los archivos en la carpeta `doc/` son independientes para evitar que el modal principal sea demasiado pesado.
- El botón **VOLVER** de los trámites dinámicos se genera automáticamente por el script, no hace falta añadirlo manualmente en el HTML.

---
*Organizado por y para los trabajadores. FeSMC UGT CLM.*
