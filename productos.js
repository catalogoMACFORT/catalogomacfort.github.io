// productos.js
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const tipoCambio = 7.15; // Simulado, puedes actualizarlo con una API si deseas

async function cargarProductos() {
  try {
    const respuesta = await fetch(googleSheetUrl);
    const datos = await respuesta.text();
    const filas = datos.trim().split("\n").slice(1);

    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    filas.forEach(fila => {
      const columnas = fila.split(",");

      const codigo = columnas[0].trim();
      const nombre = columnas[1].trim();
      const precioUSD = parseFloat(columnas[2]);
      const procedencia = columnas[3].trim();
      const marca = columnas[4].trim();
      const imagenQR = columnas[5].trim();

      const precioBs = (precioUSD * tipoCambio).toFixed(2);

      const productoHTML = `
        <div class="producto">
          <h3>${nombre}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p><strong>Procedencia:</strong> ${procedencia}</p>
          <p><strong>Marca:</strong> ${marca}</p>
          <p><strong>Precio en Bs:</strong> <span class="precio">Bs ${precioBs}</span></p>
          <p class="pin-alerta">Precio oficial sujeto a PIN autorizado</p>
          <img src="${imagenQR}" alt="QR" class="qr">
        </div>
      `;
      contenedor.innerHTML += productoHTML;
    });

  } catch (error) {
    document.getElementById("contenedor-productos").innerHTML = `
      <p style="color: red
