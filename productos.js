const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const tipoCambio = 16.33;

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-productos");
  const tipo = localStorage.getItem('cliente_registrado') || '';
  const pin = localStorage.getItem('pin_cliente') || '';

  try {
    const response = await fetch(urlCSV);
    const data = await response.text();
    const filas = data.split("\n").slice(1);
    filas.forEach(fila => {
      const columnas = fila.split(",");
      if (columnas.length < 4) return;

      const [codigo, producto, , , , precioBase, , , , , , , , imagen, qrData] = columnas;

      const precio = tipo && pin ? `Bs ${(parseFloat(precioBase) * tipoCambio).toFixed(2)}` : "Precio con PIN autorizado";
      const qr = qrData ? `<img src="${qrData}" alt="QR">` : `<img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}" alt="QR">`;

      contenedor.innerHTML += `
        <div class="producto">
          <h3>${producto}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p class="precio"><strong>Precio:</strong> <span style="color:green">${precio}</span></p>
          ${qr}
          ${!pin ? `<button onclick="solicitarAccesoProducto('${codigo}')">Solicitar Acceso</button>` : ""}
        </div>
      `;
    });
  } catch (error) {
    contenedor.innerHTML = `<p style="color:red">❌ Error al cargar productos. Verifica el enlace del CSV.</p>`;
    console.error("Error cargando CSV:", error);
  }
});
