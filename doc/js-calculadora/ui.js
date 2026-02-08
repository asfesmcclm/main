const UI = {
    // 1. Diccionario de textos (Sin emojis)
    textos: {
        ayudaSalario: `
            <strong>INFO: ¿Qué cantidad debo poner?</strong><br>
            Indica el <strong>Salario Bruto</strong> (el total de tu nómina antes de impuestos).<br><br>
            <strong>INCLUYE:</strong> Sueldo base, pluses (antigüedad, nocturnidad) y tus <strong>pagas extras</strong>.<br>
            <strong>NO INCLUYA:</strong> Dietas, plus de transporte o gastos de herramientas.
        `,
        smiAviso: "AVISO: Salario inferior al SMI 2026. Si tu jornada es completa, consulta con UGT.",
        altoAviso: "INFO: Cantidad superior a la media. Verifica que los datos sean correctos.",
        
        exclusionIndemnizacion: `
            <strong>IMPORTANTE:</strong> No todas las extinciones de contrato generan derecho a indemnización. 
            <strong>No recibirás indemnización</strong> en los siguientes casos:
            <ul style="margin-top: 10px; padding-left: 20px;">
                <li>Baja voluntaria (dimisión del trabajador).</li>
                <li>Despido disciplinario declarado como procedente.</li>
                <li>No superar el periodo de prueba.</li>
                <li>Finalización de contratos de interinidad o de formación (según modalidad).</li>
            </ul>
        `,
        
        haciendaInfo: `
            Las <strong>indemnizaciones</strong> por despido obligatorio están exentas de IRPF hasta el límite de 180.000 €. 
            Sin embargo, las cantidades del <strong>finiquito</strong> (vacaciones no disfrutadas, parte proporcional de pagas extras y días trabajados) 
            tributan íntegramente como rendimientos del trabajo, igual que una nómina normal.
        `,
        
        ssInfo: `
            Las <strong>indemnizaciones</strong> legales no cotizan a la Seguridad Social. 
            Por el contrario, todos los conceptos incluidos en el <strong>finiquito</strong> sí están sujetos a cotización 
            (incluyendo la liquidación de vacaciones y pagas extraordinarias).
        `
    },

    // 2. Función para formatear dinero
    formatEuro: function(cantidad) {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cantidad);
    },

    // 3. Función para pintar la antigüedad (Corrige que no se vea)
    mostrarAntiguedad: function(datosAntiguedad) {
        const contenedor = document.getElementById('info_antiguedad');
        const valorTexto = document.getElementById('val_antiguedad');
        if (!datosAntiguedad || !contenedor || !valorTexto) return;

        valorTexto.innerHTML = `Antigüedad detectada: <strong>${datosAntiguedad.dias} días</strong> (${datosAntiguedad.anios.replace('.', ',')} años).`;
        contenedor.style.display = 'block';
    },

    // 4. Función para cerrar secciones (Corrige que la X no funcione)
    cerrarSeccion: function(idSeccion) {
        const elemento = document.getElementById(idSeccion);
        if (elemento) elemento.style.display = 'none';
    }
};
