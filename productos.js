
document.addEventListener("DOMContentLoaded", función () {
  constante URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

  obtener(URL_CSV)
    .then(respuesta => respuesta.texto())
    .then(csv => {
      const líneas = csv.trim().split("\n").map(línea => línea.split(),","));
      const tipoCambio = parseFloat(lines[0][0]); // Asumimos que el tipo de cambio está en A1
      const contenedor = document.getElementById("contenedor-productos");
      para (sea i = 1; i < lines.length; i++) {
        const fila = lineas[i];
        si (!fila[0]) continúa;
        código const = fila[0].trim();
        const producto = fila[1]?.trim() || "";
        const precioUSD = parseFloat(fila[2]);
        const procedencia = fila[3]?.trim() || "";
        const marca = fila[4]?.trim() || "";
        const qr = fila[5]?.trim() || "";

        const precioBs = (precioUSD * tipoCambio).toFixed(2);
        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        tarjeta.innerHTML = `
          <strong>${producto}</strong><br>
          Código: ${codigo}<br>
          Precio: <span class="precio">Bs ${precioBs}</span><br>
          <span class="pin-alerta">Precio con PIN autorizado</span>
          <img class="qr" src="${qr}" alt="QR">
        `;
        contenedor.appendChild(tarjeta);
      }
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      const contenedor = document.getElementById("contenedor-productos");
      contenedor.innerHTML = "<p>â Œ Error al cargar productos. Revisa el CSV o el enlace público.</p>";
    });
});
