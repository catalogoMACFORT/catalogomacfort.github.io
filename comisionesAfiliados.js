// comisionesAfiliados.js

// Configuración de niveles de afiliado
const nivelesAfiliado = [
  { nivel: "Bronce", desde: 0, hasta: 99, comision: 0.04 },
  { nivel: "Plata", desde: 100, hasta: 299, comision: 0.05 },
  { nivel: "Oro", desde: 300, hasta: 599, comision: 0.06 },
  { nivel: "Diamante", desde: 600, hasta: 999, comision: 0.07 },
  { nivel: "Élite", desde: 1000, hasta: Infinity, comision: 0.08 }
];

// Detectar nivel
function obtenerNivelAfiliado(ventasUSD) {
  return nivelesAfiliado.find(n => ventasUSD >= n.desde && ventasUSD <= n.hasta);
}

// Calcular comisión base
function calcularComision(ventasUSD) {
  const nivel = obtenerNivelAfiliado(ventasUSD);
  return {
    nivel: nivel.nivel,
    porcentaje: nivel.comision,
    comisionTotal: ventasUSD * nivel.comision
  };
}

// Bonificación adicional si no factura
function calcularBonificacionAdicional(usaFactura = true) {
  return usaFactura ? 0 : 0.01; // 1% si NO usa factura
}

// Cálculo total con bonificación
function calcularTotalConBonificacion(ventasUSD, usaFactura = true) {
  const base = calcularComision(ventasUSD);
  const bono = calcularBonificacionAdicional(usaFactura);
  return {
    nivel: base.nivel,
    comisionBase: base.comisionTotal,
    bono: ventasUSD * bono,
    totalGanancia: base.comisionTotal + (ventasUSD * bono)
  };
}

// Ejemplo de uso:
const ejemplo = calcularTotalConBonificacion(385, false);
console.log(`Nivel: ${ejemplo.nivel}, Comisión: ${ejemplo.comisionBase.toFixed(2)}, Bono: ${ejemplo.bono.toFixed(2)}, Total: ${ejemplo.totalGanancia.toFixed(2)}`);
