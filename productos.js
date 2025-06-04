const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

const TIPO_CAMBIO = 16.33; // Tipo de cambio actualizado manualmente

async function cargarProductos() {
  try {
    const response = await fetch(CSV_URL);
    const data = await response.text();

    const filas = data.trim().split('\n').slice(1);
    const productos = filas.map(fila => {
      const columnas = fila.split(',');
      return {
        codigo: columnas[0],
        nombre: columnas[1],
        precioUSD: parseFloat(columnas[4]),
        qrBase64: columnas[10]
      };
    });

    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
      const precioBS = (producto.precioUSD * TIPO_CAMBIO).toFixed(2);

      const card = document.createElement('div');
      card.className = 'producto';

      card.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p><strong>Código:</strong> ${producto.codigo}</p>
        <p><strong>Precio:</strong> <span class="protegido">Bs ${precioBS}</span></p>
        <p class="pin-msg">Precio con PIN autorizado</p>
        <img src="${producto.qrBase64}" alt="QR" class="qr">
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    document.getElementById('contenedor-productos').innerHTML = '<p class="error">❌ Error al cargar productos. Verifica el enlace CSV o la estructura.</p>';
    console.error('Error cargando CSV:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarProductos);
