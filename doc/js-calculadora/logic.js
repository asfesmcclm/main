/**
 * logic.js - Motor de Cálculo Universal UGT
 * Centraliza las matemáticas de antigüedad, tramos legales y topes.
 */

const MotorCalculo = {
    /**
     * Función principal: Procesa todas las extinciones del JSON
     */
    generarInformeCompleto: function(config, datos) {
        const { fInicio, fFin, sDia, sMes } = datos;
        const param = config.parametros_legales;
        const fechaReforma = new Date(param.fecha_reforma_2012);
        
        const anti = this.obtenerAntiguedadDetallada(fInicio, fFin);
        const antiguedadAnios = parseFloat(anti.anios);

        return config.extinciones.map(tipo => {
            let resultado = {
                nombre: tipo.nombre,
                descripcion: tipo.descripcion,
                importe: 0,
                alerta: null,
                formula_aplicada: ""
            };

            // CASO A: Cálculos con tramos históricos (45/33 días)
            if (tipo.usa_doble_tramo && fInicio < fechaReforma) {
                const calculoDoble = this.calcularDobleTramo(sDia, sMes, fInicio, fFin, fechaReforma, param.max_mensualidades_historico);
                resultado.importe = calculoDoble.importe;
                resultado.formula_aplicada = calculoDoble.formula;
            } 
            // CASO B: Cálculos lineales (20 o 12 días)
            else {
                let total = sDia * tipo.dias_anio * antiguedadAnios;
                let formula = `${tipo.dias_anio} días/año × ${antiguedadAnios.toFixed(2)} años`;

                if (tipo.tope_mensualidades > 0) {
                    const tope = sMes * tipo.tope_mensualidades;
                    if (total > tope) {
                        total = tope;
                        formula += ` (Topado a ${tipo.tope_mensualidades} mensualidades)`;
                    }
                }
                resultado.importe = total;
                resultado.formula_aplicada = formula;
            }

            // AJUSTE SOLICITADO: Alerta de fraude de ley con "Cirugía de Precisión"
            if (tipo.id === "temporal") {
                // Solo mostramos la alerta si está entre 2 y 10 años
                if (antiguedadAnios >= 2 && antiguedadAnios <= 10) {
                    resultado.alerta = `AVISO LEGAL: Un contrato temporal con más de 2 años podría estar en FRAUDE DE LEY.`;
                }
            }

            return resultado;
        });
    },

    /**
     * Calcula la antigüedad exacta
     */
    obtenerAntiguedadDetallada: function(fIn, fOut) {
        const diffMs = fOut - fIn;
        const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalAnios = (totalDias / 365.25).toFixed(2);
        
        return {
            dias: totalDias,
            anios: totalAnios
        };
    },

    /**
     * Lógica de tramos para contratos antiguos (reforma 2012)
     */
    calcularDobleTramo: function(sDia, sMes, fIn, fOut, fReforma, maxHist) {
        const diasT1 = Math.max(0, (fReforma - fIn) / (1000 * 60 * 60 * 24));
        const diasT2 = Math.max(0, (fOut - fReforma) / (1000 * 60 * 60 * 24));
        
        const indemT1 = sDia * 45 * (diasT1 / 365.25);
        const indemT2 = sDia * 33 * (diasT2 / 365.25);
        
        let total = indemT1 + indemT2;
        const tope24 = sMes * 24;
        const tope42 = sMes * 42;

        let formula = "Tramo 45 días + Tramo 33 días";

        if (indemT1 >= tope42) {
            total = tope42;
            formula = "Topado a 42 mensualidades (por antigüedad previa a 2012)";
        } else if (total > tope24) {
            total = Math.max(indemT1, tope24);
            formula += " (Aplicado tope de 24 mensualidades o devengo previo)";
        }
        
        return { importe: total, formula: formula };
    }
};
