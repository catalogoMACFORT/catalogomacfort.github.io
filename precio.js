
// Script para actualizar precios automáticamente en bolivianos
// Puedes vincularlo en productos.html o donde necesites

// Simulación de tipo de cambio actual (puedes reemplazarlo dinámicamente si usas API)
const tipoCambio = 17.49;

// Función para convertir y mostrar precios en Bs
function convertirPrecioUSDaBs() {
  const preciosUSD = document.querySelectorAll(".precio-usd");

  preciosUSD.forEach((el) => {
    const valorUSD = parseFloat(el.dataset.usd);
    const valorBs = (valorUSD * tipoCambio).toFixed(2);
    el.innerHTML = `Bs ${valorBs}`;
  });
}

// Ejecutar al cargar la página
window.onload = convertirPrecioUSDaBs;
