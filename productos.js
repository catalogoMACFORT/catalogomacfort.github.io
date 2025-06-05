const urlCsv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

const contenedor = document.getElementById('contenedor-productos');

async function cargarProductos() {
  try {
    const response = await fetch(urlCsv);
    const data = await response.text();

    const filas = data.trim().split('\n');
    const encabezados = filas[0].split(',');

    // Se omite fila 0 porque es encabezado
    const productos = filas.slice(1).map((fila) => {
      const columnas = fila.split(',');
      const producto = {};
      encabezados.forEach((enc, i) => {
        producto[enc.trim()] = columnas[i]?.trim();
      });
      return producto;
    });

    mostrarProductos(productos);
  } catch (error) {
    contenedor.innerHTML =
      '<p style="color:red;">❌ Error al cargar productos. Revisar el CSV o la estructura.</p>';
    console.error(error);
  }
}

function mostrarProductos(productos) {
  contenedor.innerHTML = '';
  productos.forEach((prod) => {
    // Aquí generamos QR dinámicamente
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(prod['Código'] + ' ' + prod['Producto'])}`;

    // Si quieres que los precios estén ocultos hasta el PIN, aquí puedes ocultarlos.
    const htmlProducto = `
      <article class="producto-card">
        <h3>${prod['Producto']}</h3>
        <p><b>Código:</b> ${prod['Código']}</p>
        <p class="precio">Precio: <span class="oculto">Solicita PIN para ver precio</span></p>
        <img src="${qrUrl}" alt="QR ${prod['Producto']}" />
      </article>
    `;
    contenedor.insertAdjacentHTML('beforeend', htmlProducto);
  });
}

cargarProductos();
