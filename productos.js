
document.addEventListener("DOMContentLoaded", función () {
  const contenedor = document.getElementById("contenedor-productos");

  obtener("https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv")
    .then((res) => res.text())
    .then((datos) => {
      const filas = data.split("\n").slice(1);
      filas.forEach((fila) => {
        const columnas = fila.split(",");

        const código = columnas[0]?.trim();
        const nombre = columnas[1]?.trim();
        const precioUSD = parseFloat(columnas[2]) || 0;
        const qr = columnas[13]?.trim();
        const tipoCambio = 16.33;
        const precioBs = (precioUSD * tipoCambio).toFixed(2);

        if (codigo && nombre && precioBs) {
          const card = document.createElement("div");
          tarjeta.className = "tarjeta";
          tarjeta.innerHTML = `
            <h3>{nombre}</h3>
            <p><strong>Código:</strong> {codigo}</p>
            <p><strong>Precio:</strong> <span class="precio">Bs {precioBs}</span></p>
            <img src="{qr}" alt="QR" class="qr">
            <p class="nota">Precio con PIN autorizado</p>
          `;
          contenedor.appendChild(tarjeta);
        }
      });
    })
    .catch((err) => {
      contenedor.innerHTML = '<p style="color: red;">â Œ Error al cargar productos. Revise el enlace del CSV o su estructura.</p>';
      consola.error(err);
    });
});
