const URL_GOOGLE_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const tipoCambio = 16.33; // Este valor se actualizará automáticamente si se conecta a una celda especial en Google Sheets.

async function cargarProductos() {
  const respuesta = await fetch(URL_GOOGLE_SHEET);
  const datos = await respuesta.text();
  const filas = datos.split("\n").slice(1); // Ignora cabecera
  const contenedor = document.getElementById("contenedor-productos");

  filas.forEach(fila => {
    const columnas = fila.split(",");
    if (columnas.length >= 6) {
      const codigo = columnas[0];
      const producto = columnas[1];
      const precioUSD = parseFloat(columnas[2]);
      const precioBs = (precioUSD * tipoCambio).toFixed(2);
      const qr = columnas[5];

      const tarjeta = document.createElement("div");
      tarjeta.className = "producto";

      tarjeta.innerHTML = `
        <h3>${producto}</h3>
        <p><strong>Código:</strong> ${codigo}</p>
        <p><strong>Precio:</strong> 🔒 <em>Precio con PIN autorizado</em></p>
        <img src="${qr}" alt="QR" class="qr">
      `;

      contenedor.appendChild(tarjeta);
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
