document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");
  const tipoCambio = 16.33; // Puedes cambiar este valor manualmente o leerlo desde Google Sheets si se automatiza

  fetch("catálogo_macfort_2025.csv")
    .then(response => response.text())
    .then(data => {
      const filas = data.split("\n").slice(1); // Salta el encabezado
      filas.forEach(fila => {
        const columnas = fila.split(",");

        const codigo = columnas[0]?.trim();
        const producto = columnas[1]?.trim();
        const precioUSD = parseFloat(columnas[4]);
        const precioBS = isNaN(precioUSD) ? "N/D" : (precioUSD * tipoCambio).toFixed(2);
        const qr = columnas[columnas.length - 1]?.trim(); // Última columna

        if (!codigo || !producto || isNaN(precioUSD)) return;

        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <img src="https://via.placeholder.com/100" alt="Producto ${producto}">
          <div class="info">
            <strong>${producto}</strong><br>
            Código: ${codigo}<br>
            Precio: <span class="precio">Bs ${precioBS}</span><br>
            <span class="pin-alerta">Precio con PIN autorizado</span>
          </div>
          <img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}%20${producto}%20MACFORT" alt="QR">
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      contenedor.innerHTML = "<p style='color: red;'>❌ Error al cargar productos. Verifica el CSV.</p>";
      console.error("Error al cargar CSV:", error);
    });
});
