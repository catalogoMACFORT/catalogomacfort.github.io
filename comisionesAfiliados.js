// Configuración de niveles de afiliados y comisiones
const nivelesAfiliado = [
  { nivel: "Bronce", desde: 0, hasta: 99, comision: 0.04 },
  { nivel: "Plata", desde: 100, hasta: 299, comision: 0.05 },
  { nivel: "Oro", desde: 300, hasta: 599, comision: 0.06 },
  { nivel: "Diamante", desde: 600, hasta: 999, comision: 0.07 },
  { nivel: "Élite", desde: 1000, hasta: Infinity, comision: 0.08 }
];

// Obtener nivel según las ventas
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

// Bonificación por venta sin factura
function calcularBonificacionAdicional(usaFactura = true) {
  return usaFactura ? 0 : 0.01;
}

// Resultado completo con bonificación
function calcularTotalConBonificacion(ventasUSD, usaFactura = true) {
  const base = calcularComision(ventasUSD);
  const bono = calcularBonificacionAdicional(usaFactura);
  const bonoValor = ventasUSD * bono;

  return {
    nivel: base.nivel,
    comisionBase: base.comisionTotal,
    bono: bonoValor,
    totalGanancia: base.comisionTotal + bonoValor
  };
}

// Beneficios por nivel (para mostrar en perfil o panel)
const beneficiosPorNivel = [
  {
    nivel: "Bronce",
    rangoUSD: "$0 - $99",
    beneficios: ["Comisión del 4%", "Acceso al catálogo básico"]
  },
  {
    nivel: "Plata",
    rangoUSD: "$100 - $299",
    beneficios: ["Comisión del 5%", "Acceso a promociones", "Certificado digital"]
  },
  {
    nivel: "Oro",
    rangoUSD: "$300 - $599",
    beneficios: ["Comisión del 6%", "Logo de afiliado Oro", "Soporte personalizado"]
  },
  {
    nivel: "Diamante",
    rangoUSD: "$600 - $999",
    beneficios: ["Comisión del 7%", "Premios físicos", "Prioridad en eventos"]
  },
  {
    nivel: "Élite",
    rangoUSD: "$1000 o más",
    beneficios: ["Comisión del 8%", "Bonos VIP", "Recomendado en la app"]
  }
];

// Simulación de prueba (puedes eliminar esto en producción)
const ventasEjemplo = 385;
const resultado = calcularTotalConBonificacion(ventasEjemplo, false);
console.log(`Nivel: ${resultado.nivel}`);
console.log(`Comisión Base: $${resultado.comisionBase.toFixed(2)}`);
console.log(`Bono sin factura: $${resultado.bono.toFixed(2)}`);
console.log(`Total Ganancia: $${resultado.totalGanancia.toFixed(2)}`);
