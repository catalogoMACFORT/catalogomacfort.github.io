const hoja = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const tipoCambio = 16.33;

fetch(hoja)
  .then(response => response.text())
  .then(csv => {
    const filas = csv.split("\n").slice(1);
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";
    filas.forEach(linea => {
      const columnas = linea.split(",");
      const codigo = columnas[0];
      const nombre = columnas[1];
      const precioUSD = parseFloat(columnas[4]);
      const precio = isNaN(precioUSD) ? "Precio con PIN autorizado" : `Bs ${(precioUSD * tipoCambio).toFixed(2)}`;
      const qr = columnas[11] || "";

      const productoHTML = `
        <div class="producto">
          <h3>${nombre}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p><strong>Precio:</strong> <span class="precio">${precio}</span></p>
          <img src="${qr}" alt="QR">
          <p class="pin-alerta">Precio con PIN autorizado</p>
        </div>
      `;
      contenedor.innerHTML += productoHTML;
    });
  })
  .catch(error => {
    document.getElementById("contenedor-productos").innerText = "❌ Error al cargar productos. Verifica el enlace CSV.";
  });
