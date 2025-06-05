// URL CSV publicado de Google Sheets (con permisos públicos)
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

// Tipo de cambio editable (se puede actualizar manualmente aquí o hacer fetch a API externa)
let tipoCambio = 16.33;

// Contenedor donde se mostrarán los productos
const contenedorProductos = document.getElementById('contenedor-productos');

// Función para generar QR dinámico usando api.qrserver.com
function generarQR(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data)}`;
}

// Función para formatear precios con 2 decimales y separadores de miles
function formatearPrecio(num) {
  return num.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Función para cargar y procesar CSV
async function cargarProductos() {
  try {
    const response = await fetch(csvUrl);
    const data = await response.text();
    const filas = data.split('\n').slice(1); // Ignorar encabezado
    contenedorProductos.innerHTML = ''; // Limpiar contenedor

    filas.forEach(fila => {
      if(!fila.trim()) return;
      const columnas = fila.split(',');

      const codigo = columnas[0].trim();
      const nombre = columnas[1].trim();
      const precioUSD = parseFloat(columnas[2]);
      const imagenUrl = columnas[3] || 'https://via.placeholder.com/100'; // URL imagen o placeholder
      const categoria = columnas[4] || 'General';

      if (isNaN(precioUSD)) return; // Saltear filas inválidas

      const precioBs = precioUSD * tipoCambio;

      const productoHTML = `
        <div class="producto-card">
          <img src="${imagenUrl}" alt="${nombre}" />
          <div class="info-producto">
            <strong>${nombre}</strong><br />
            Código: ${codigo}<br />
            Categoría: ${categoria}<br />
            Precio: Bs ${formatearPrecio(precioBs)}<br />
            <small>Precio con PIN autorizado</small>
          </div>
          <img class="qr" src="${generarQR(codigo + ' ' + nombre)}" alt="QR Código ${codigo}" />
        </div>
      `;

      contenedorProductos.insertAdjacentHTML('beforeend', productoHTML);
    });
  } catch (error) {
    contenedorProductos.innerHTML = `<p style="color:red;">Error al cargar productos: ${error.message}</p>`;
  }
}

window.onload = cargarProductos;
