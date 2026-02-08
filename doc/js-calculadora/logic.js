const MotorCalculo = {
    generarInformeCompleto: function(config, datos) {
        const { fInicio, fFin, sDia, sMes } = datos;
        const param = config.parametros_legales;
        const fechaReforma = new Date(param.fecha_reforma_2012);
        const antiguedadAnios = (fFin - fInicio) / (1000 * 60 * 60 * 24 * 365.25);

        return config.extinciones.map(tipo => {
            let resultado = {
                nombre: tipo.nombre,
                descripcion: tipo.descripcion,
                importe: 0,
                alerta: null,
                formula_aplicada: ""
            };

            if (tipo.usa_doble_tramo && fInicio < fechaReforma) {
                const calculoDoble = this.calcularDobleTramo(sDia, sMes, fInicio, fFin, fechaReforma, param.max_mensualidades_historico);
                resultado.importe = calculoDoble.importe;
                resultado.formula_aplicada = calculoDoble.formula_aplicada;
            } else {
                let bruto = sDia * tipo.dias_anio * antiguedadAnios;
                let topeFinal = tipo.tope_mensualidades > 0 ? (sMes * tipo.tope_mensualidades) : Infinity;

                if (bruto > topeFinal) {
                    resultado.importe = this.redondear(topeFinal);
                    resultado.formula_aplicada = `Tope legal alcanzado (${tipo.tope_mensualidades} mensualidades)`;
                } else {
                    resultado.importe = this.redondear(bruto);
                    resultado.formula_aplicada = `${tipo.dias_anio} días por año trabajado`;
                }

                if (tipo.id === "temporal" && antiguedadAnios > tipo.limite_años_fraude) {
                    resultado.alerta = `⚠️ Posible FRAUDE DE LEY: Supera los ${tipo.limite_años_fraude} años.`;
                }
            }
            return resultado;
        });
    },

    calcularDobleTramo: function(sDia, sMes, fIn, fOut, fReforma, maxHist) {
        const diasT1 = (fReforma - fIn) / (1000 * 60 * 60 * 24);
        const diasT2 = (fOut - fReforma) / (1000 * 60 * 60 * 24);
        const indemT1 = sDia * 45 * (diasT1 / 365.25);
        const indemT2 = sDia * 33 * (diasT2 / 365.25);
        const total = indemT1 + indemT2;
        const tope24 = sMes * 24;
        const topeAplicable = (indemT1 > tope24) ? (sMes * maxHist) : tope24;
        return {
            importe: this.redondear(Math.min(total, topeAplicable)),
            formula_aplicada: `Tramo mixto 45/33 días. Tope aplicado: ${indemT1 > tope24 ? maxHist : 24} meses.`
        };
    },

    redondear: function(num) { return Math.round(num * 100) / 100; }
};
