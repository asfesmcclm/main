/**
 * ui.js - Gestión de la Interfaz y Mensajes de Usuario
 * Este archivo centraliza los textos y las funciones visuales.
 */

const UI = {
    // 1. DICCIONARIO DE TEXTOS
    // Centralizamos aquí las redacciones para editarlas fácilmente sin tocar código.
    textos: {
        ayudaSalario: `
            <strong>💡 ¿Qué cantidad debo poner?</strong><br>
            Indica el <strong>Salario Bruto</strong> (el total de tu nómina antes de impuestos).<br><br>
            <strong>✅ Incluye:</strong> Sueldo base, pluses (antigüedad, nocturnidad) y tus <strong>pagas extras</strong>.<br>
            <strong>❌ No incluyas:</strong> Dietas, plus de transporte o gastos de herramientas.
        `,
        smiAviso: "⚠️ Salario inferior al SMI 2026. Si tu jornada es completa, consulta con UGT.",
        altoAviso: "ℹ️ Cantidad superior a la media. Verifica que los datos sean correctos."
    },

    /**
     * Formatea números a moneda europea (€)
     */
    formatEuro: function(cantidad) {
        return new Intl.NumberFormat('es-ES', { 
            style: 'currency', 
            currency: 'EUR',
            minimumFractionDigits: 2 
        }).format(cantidad);
    },

    /**
     * Muestra la antigüedad calculada por el motor
     * @param {Object} datosAntiguedad - Objeto con {dias, anios} que viene de logic.js
     */
    mostrarAntiguedad: function(datosAntiguedad) {
        const contenedor = document.getElementById('info_antiguedad');
        const valorTexto = document.getElementById('val_antiguedad');
        
        if (!datosAntiguedad || !contenedor || !valorTexto) {
            if (contenedor) contenedor.style.display = 'none';
            return;
        }

        // Renderiza el mensaje exacto solicitado
        valorTexto.innerHTML = `Tu antigüedad en la empresa ha sido de <strong>${datosAntiguedad.dias} días</strong>, (${datosAntiguedad.anios.replace('.', ',')} años).`;
        
        // Hace visible el bloque
        contenedor.style.display = 'block';
    },

    /**
     * Gestión de cierre de secciones (Hacienda / Seguridad Social / Info)
     * Arregla el problema del botón "X" que no funcionaba.
     * @param {string} idSeccion - El ID del elemento a ocultar
     */
    cerrarSeccion: function(idSeccion) {
        const elemento = document.getElementById(idSeccion);
        if (elemento) {
            elemento.style.display = 'none';
        }
    }
};
