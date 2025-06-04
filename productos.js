const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const tipoCambio = 16.33; // Puedes cambiar este valor directamente en tu hoja si lo automatizas desde ahí

function cargarProductos() {
  fetch(CSV_URL)
    .then(response => response.text())
    .then(data => {
      const filas = data.split("\n").slice(1);
      const contenedor = document.getElementById("contenedor-productos");
      contenedor.innerHTML = "";

      filas.forEach(fila => {
        const columnas = fila.split(",");
        if (columnas.length < 6) return;

        const codigo = columnas[0]?.trim();
        const nombre = columnas[1]?.trim();
        const precioUSD = parseFloat(columnas[4]?.trim().replace(/"/g, ""));
        const qrData = columnas[5]?.trim();

        if (!codigo || !nombre || isNaN(precioUSD)) return;

        const precioBs = (precioUSD * tipoCambio).toFixed(2);

        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <div class="info">
            <strong>${nombre}</strong><br>
            Código: ${codigo}<br>
            Precio: <span class="precio">Bs ${precioBs}</span><br>
            <span class="pin-alerta">Precio con PIN autorizado</span>
          </div>
          <img class="qr" src="${qrData}" alt="QR">
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      document.getElementById("contenedor-productos").innerHTML = "❌ Error al cargar productos. Revisa el enlace CSV o estructura.";
      console.error("Error cargando productos:", error);
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
