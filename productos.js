const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const tipoCambio = 16.33; // Puedes actualizar este valor manualmente si no se usa desde Google Sheets

fetch(URL_CSV)
  .then(res => res.text())
  .then(text => {
    const rows = text.split("\n").slice(1);
    const contenedor = document.getElementById("contenedor-productos");

    rows.forEach(row => {
      const cols = row.split(",");
      const codigo = cols[0]?.trim();
      const nombre = cols[1]?.trim();
      const precioUSD = parseFloat(cols[4]) || 0;
      const imagenQR = cols[10]?.trim();

      if (!codigo || !nombre) return;

      const precioBs = (precioUSD * tipoCambio).toFixed(2);
      const tarjeta = document.createElement("div");
      tarjeta.className = "producto";

      tarjeta.innerHTML = `
        <div class="info">
          <h3>${nombre}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p class="precio">Precio: <span class="oculto">Bs ${precioBs}</span></p>
          <p class="pin-info">Precio con PIN autorizado</p>
        </div>
        <div class="qr">
          <img src="${imagenQR}" alt="QR del producto">
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });
  });
