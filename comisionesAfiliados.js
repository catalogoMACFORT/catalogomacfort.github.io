
const niveles = {
    "Bronce": 0.04,
    "Plata": 0.05,
    "Oro": 0.06,
    "Diamante": 0.07,
    "Élite": 0.08
};

function calcularComision(monto, nivel) {
    return monto * (niveles[nivel] || 0);
}
