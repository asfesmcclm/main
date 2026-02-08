/**
 * logic.js - Motor de Cálculo Universal UGT
 * Centraliza las matemáticas de antigüedad, tramos legales y topes.
 */

const MotorCalculo = {
    /**
     * Función principal: Procesa todas las extinciones del JSON
     * @param {Object} config - Datos de CONFIG_LEGAL
     * @param {Object} datos - {fInicio, fFin, sDia, sMes}
     */
    generarInformeCompleto: function(config, datos) {
        const { fInicio, fFin, sDia, sMes } = datos;
        const param = config.parametros_legales;
        const fechaReforma = new Date(param.fecha_reforma_2012);
        
        // Calculamos la antigüedad base para el bucle
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

            // CASO A: Cálculos con tramos históricos (45/33)
            if (tipo.usa_doble_tramo && fInicio < fechaReforma) {
                const calculoDoble = this.calcularDobleTramo(sDia, sMes, fInicio, fFin, fechaReforma, param.max_mensualidades_historico);
                resultado.importe = calculoDoble.importe;
                resultado.formula_aplicada = calculoDoble.formula_aplicada;
            } 
            // CASO B: Cálculos lineales (20 días, 12 días, etc.)
            else {
                let bruto = sDia * tipo.dias_anio * antiguedadAnios;
                let topeFinal = tipo.tope_mensualidades > 0 ? (sMes * tipo.tope_mensualidades) : Infinity;

                if (bruto > topeFinal) {
                    resultado.importe = this.redondear(topeFinal);
                    resultado.formula_aplicada = `Tope legal alcanzado (${tipo.tope_mensualidades} mensualidades)`;
                } else {
                    resultado.importe = this.redondear(bruto);
                    resultado.formula_aplicada = `${tipo.dias_anio} días por año trabajado`;
                }

                // Alerta de fraude para contratos temporales excesivos
                if (tipo.id === "temporal" && antiguedadAnios > tipo.limite_años_fraude) {
                    resultado.alerta = `⚠️ Posible FRAUDE DE LEY: Supera los ${tipo.limite_años_fraude} años de temporalidad.`;
                }
            }
            return resultado;
        });
    },

    /**
     * Calcula los días y años de antigüedad (Para la UI y para cálculos)
     */
    obtenerAntiguedadDetallada: function(fIn, fOut) {
        const diffMs = fOut - fIn;
        const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        // Usamos 365.25 para promediar bisiestos y ser más precisos legalmente
        const totalAnios = (totalDias / 365.25).toFixed(2);
        
        return {
            dias: totalDias,
            anios: totalAnios
        };
    },

    /**
     * Lógica de tramos para contratos anteriores a la reforma de 2012
     */
    calcularDobleTramo: function(sDia, sMes, fIn, fOut, fReforma, maxHist) {
        const diasT1 = (fReforma - fIn) / (1000 * 60 * 60 * 24);
        const diasT2 = (fOut - fReforma) / (1000 * 60 * 60 * 24);
        
        const indemT1 = sDia * 45 * (diasT1 / 365.25);
        const indemT2 = sDia * 33 * (diasT2 / 365.25);
        
        const total = indemT1 + indemT2;
        const tope24 = sMes * 24;
        
        // Si el primer tramo ya supera los 24 meses, el tope se estira hasta los 42
        const topeAplicable = (indemT1 > tope24) ? (sMes * maxHist) : tope24;

        return {
            importe: this.redondear(Math.min(total, topeAplicable)),
            formula_aplicada: `Tramo mixto 45/33 días. Tope: ${indemT1 > tope24 ? maxHist : 24} meses.`
        };
    },

    /**
     * Redondeo estándar a 2 decimales para evitar ruido de céntimos
     */
    redondear: function(num) {
        return Math.round(num * 100) / 100;
    }
};
