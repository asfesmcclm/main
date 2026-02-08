const UI = {
    textos: {
        ayudaSalario: `<strong>💡 ¿Qué cantidad debo poner?</strong><br>Indica el Salario Bruto (el total antes de impuestos). Incluye pagas extras. No incluyas dietas o transporte.`,
        smiAviso: "⚠️ Salario inferior al SMI 2026. Revisa tu jornada.",
        altoAviso: "ℹ️ Cantidad superior a la media. Verifica los datos."
    },

    formatEuro: function(cant) {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cant);
    },

    // Esta función arregla el problema del botón "X" que mencionaste
    cerrarSeccion: function(idSeccion) {
        const elemento = document.getElementById(idSeccion);
        if (elemento) {
            elemento.style.display = 'none';
        }
    }
};
