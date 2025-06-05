const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const contenedor = document.getElementById('contenedor-productos');
const tipoCambio = 16.33; // Valor modificable directamente en Google Sheets o aquí si prefieres fijo

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const filas = data.split("\n").slice(1); // omite encabezado
    filas.forEach(fila => {
      const columnas = fila.split(",");
      const codigo = columnas[0]?.trim();
      const producto = columnas[1]?.trim();
      const baseUSD = parseFloat(columnas[2]);
      const img = columnas[13]?.trim();

      const precioBs = isNaN(baseUSD) ? "🔒 Consultar PIN" : `Bs ${(baseUSD * tipoCambio).toFixed(2)}`;
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-producto";
      tarjeta.innerHTML = `
        <div class="info">
          <h2>${producto}</h2>
          <p><strong>Código:</strong> ${codigo}</p>
          <p class="precio">${precioBs}</p>
          <p class="pin">Precio con PIN autorizado</p>
          <button onclick="solicitarAccesoProducto('${codigo}')">Solicitar Cotización</button>
        </div>
        <div class="imagen">
          <img src="${img || 'https://via.placeholder.com/100?text=IMG'}" alt="Producto">
          <img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}" alt="QR">
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  });
