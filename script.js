// Bonificación adicional por venta sin factura (interno, se agrega al nivel actual)
function calcularBonificacionAdicional(usaFactura) {
  return usaFactura ? 0 : 0.01; // 1% adicional si no usa factura
}

// Ejemplo combinado
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

// Simulación
const resultadoFinal = calcularTotalConBonificacion(385, false);
console.log(`Nivel: ${resultadoFinal.nivel}, Comisión Base: $${resultadoFinal.comisionBase.toFixed(2)}, Bono: $${resultadoFinal.bono.toFixed(2)}, Total: $${resultadoFinal.totalGanancia.toFixed(2)}`);
