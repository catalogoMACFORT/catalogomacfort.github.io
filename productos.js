const contenedor = document.getElementById("contenedor-productos");

const URL_CSV = "https://drive.google.com/uc?export=download&id=1-N1xCGe5TCG9kMsmYpGdms-TeaAh-jDI";

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const filas = data.trim().split("\n");
    const headers = filas[0].split(",");
    
    let html = "";
    for (let i = 1; i < filas.length; i++) {
      const celdas = filas[i].split(",");

      const codigo = celdas[0];
      const producto = celdas[1];
      const precioDistribuidor = celdas[6];
      const precioClienteFinal = celdas[7];
      const precioLicitación = celdas[9];
      const qrBase64 = celdas[10].replace(/"/g, '');

      html += `
        <div class="producto">
          <div class="info">
            <strong>${producto}</strong><br>
            Código: ${codigo}<br>
            Precio distribuidor: <span class="precio">Bs ${precioDistribuidor}</span><br>
            Precio final: <span class="precio">Bs ${precioClienteFinal}</span><br>
            Precio licitación: <span class="precio">Bs ${precioLicitación}</span><br>
          </div>
          <img class="qr" src="${qrBase64}" alt="QR ${codigo}">
        </div>
      `;
    }

    contenedor.innerHTML = html;
  })
  .catch(error => {
    contenedor.innerHTML = "❌ Error al cargar productos. Revisa el enlace del CSV o la estructura.";
    console.error("Error al cargar CSV:", error);
  });