const CONFIG_LEGAL = {
  "parametros_legales": {
    "smi_anual_2026": 17094.00,
    "umbral_salario_alto": 80000.00,
    "fecha_reforma_2012": "2012-02-12",
    "max_mensualidades_historico": 42
  },
  "extinciones": [
    {
      "id": "improcedente",
      "nombre": "1. DESPIDO IMPROCEDENTE",
      "dias_anio": 33,
      "tope_mensualidades": 24,
      "descripcion": "Cálculo 33 días/año (Tramo 45 días si es anterior a 2012)",
      "usa_doble_tramo": true
    },
    {
      "id": "voluntad_incumplimiento",
      "nombre": "2. EXTINCIÓN POR INCUMPLIMIENTO GRAVE DEL EMPRESARIO",
      "dias_anio": 33,
      "tope_mensualidades": 24,
      "descripcion": "Art. 50 ET. Misma indemnización que el despido improcedente",
      "usa_doble_tramo": true
    },
    {
      "id": "objetivo_procedente",
      "nombre": "3. DESPIDO OBJETIVO PROCEDENTE",
      "dias_anio": 20,
      "tope_mensualidades": 12,
      "descripcion": "Causas económicas, técnicas, organizativas o de producción",
      "usa_doble_tramo": false
    },
    {
      "id": "colectivo",
      "nombre": "4. DESPIDO COLECTIVO (ERE) PROCEDENTE",
      "dias_anio": 20,
      "tope_mensualidades": 12,
      "descripcion": "Acordado en proceso de despido colectivo",
      "usa_doble_tramo": false
    },
    {
      "id": "movilidad",
      "nombre": "5. MOVILIDAD GEOGRÁFICA",
      "dias_anio": 20,
      "tope_mensualidades": 12,
      "descripcion": "Extinción por traslado del centro de trabajo (Art. 40 ET)",
      "usa_doble_tramo": false
    },
    {
      "id": "modificacion_sustancial",
      "nombre": "6. MODIFICACIÓN SUSTANCIAL DE CONDICIONES",
      "dias_anio": 20,
      "tope_mensualidades": 9,
      "descripcion": "Extinción por cambios en jornada, horario o funciones (Art. 41 ET)",
      "usa_doble_tramo": false
    },
    {
      "id": "violencia_terrorismo",
      "nombre": "7. VÍCTIMAS VIOLENCIA DE GÉNERO / TERRORISMO",
      "dias_anio": 20,
      "tope_mensualidades": 12,
      "descripcion": "Extinción por protección integral (Art. 49.1.m ET)",
      "usa_doble_tramo": false
    },
    {
      "id": "temporal",
      "nombre": "8. FINALIZACIÓN CONTRATO TEMPORAL",
      "dias_anio": 12,
      "tope_mensualidades": 0,
      "limite_años_fraude": 3,
      "descripcion": "12 días por año trabajado. Sin tope máximo de mensualidades.",
      "usa_doble_tramo": false
    }
  ]
};
