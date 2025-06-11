// Configuración de comisiones por niveles (de 4% hasta 8%)
const nivelesAfiliado = [
  { nivel: "Bronce", desde: 0, hasta: 99, comision: 0.04 },
  { nivel: "Plata", desde: 100, hasta: 299, comision: 0.05 },
  { nivel: "Oro", desde: 300, hasta: 599, comision: 0.06 },
  { nivel: "Diamante", desde: 600, hasta: 999, comision: 0.07 },
  { nivel: "Élite", desde: 1000, hasta: Infinity, comision: 0.08 }
];

// Función para obtener el nivel del afiliado según sus ventas en USD
function obtenerNivelAfiliado(ventasUSD) {
  return nivelesAfiliado.find(n => ventasUSD >= n.desde && ventasUSD <= n.hasta);
}

// Función para calcular la comisión total en base a sus ventas
function calcularComision(ventasUSD) {
  const nivel = obtenerNivelAfiliado(ventasUSD);
  return {
    nivel: nivel.nivel,
    porcentaje: nivel.comision,
    comisionTotal: ventasUSD * nivel.comision
  };
}

// Ejemplo de simulación
const ventasAfiliado = 385; // ejemplo en dólares
const resultado = calcularComision(ventasAfiliado);
console.log(`Nivel: ${resultado.nivel}, Comisión: ${resultado.porcentaje * 100}%, Total: $${resultado.comisionTotal.toFixed(2)}`);
