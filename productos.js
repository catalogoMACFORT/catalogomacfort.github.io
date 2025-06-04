async function cargarProductos() {
  try {
    const response = await fetch("catálogo_macfort_2025.csv");
    const data = await response.text();
    const filas = data.split("\n").slice(1);

    let html = "";

    filas.forEach(fila => {
      const columnas = fila.split(",");
      if (columnas.length >= 4) {
        const codigo = columnas[0].trim();
        const producto = columnas[1].trim();
        const precioUSD = parseFloat(columnas[2]);
        const tipoCambio = 7.15;
        const precioBs = (precioUSD * tipoCambio).toFixed(2);
        const qr = columnas[3].trim();

        html += `
          <div class="producto">
            <div class="info">
              <strong>${producto}</strong><br>
              Código: ${codigo}<br>
              Precio en Bs: <span class="precio">Bs ${precioBs}</span><br>
              <span class="pin-alerta">Precio oficial sujeto a PIN autorizado</span>
            </div>
            <img class="qr" src="${qr}" alt="QR">
          </div>
        `;
      }
    });

    document.getElementById("productos").innerHTML = html;

  } catch (error) {
    document.getElementById("productos").innerHTML =
      "<p style='color:red;'>❌ Error al cargar productos. Revisa el enlace del CSV o la estructura.</p>";
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos);
