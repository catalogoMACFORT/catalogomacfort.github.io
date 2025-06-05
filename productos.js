// Configura tu link público de Google Sheets en formato CSV
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?gid=0&single=true&output=csv';

// Configura tipo de cambio editable desde hoja (manual en esta versión)
const tipoCambio = 16.33; // Puedes cambiarlo desde Google Sheets en una celda luego

// Mapeo de precios por tipo de cliente
const preciosColumnas = {
  distribuidor: 'Distribuidor',
  mayorista: 'Mayorista',
  final: 'Cliente Final',
  licitacion: 'Licitación'
};

async function cargarProductos() {
  try {
    const response = await fetch(CSV_URL);
    const data = await response.text();

    const filas = data.split('\n').map(row => row.split(','));
    const encabezados = filas.shift();
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    const tipoCliente = localStorage.getItem('cliente_registrado');
    const pin = localStorage.getItem('pin_cliente');

    const colPrecio = encabezados.findIndex(h => h.trim() === preciosColumnas[tipoCliente]);

    filas.forEach(fila => {
      const codigo = fila[0]?.trim();
      const producto = fila[1]?.trim();
      const imagen = fila[14] || 'https://via.placeholder.com/100';
      const qr = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}`;

      const precioRaw = parseFloat(fila[colPrecio]);
      const precio = isNaN(precioRaw) ? '🔒' : `Bs ${(precioRaw * tipoCambio).toFixed(2)}`;

      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <img src="${imagen}" alt="${producto}">
        <div>
          <h3>${producto}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p><strong>Precio:</strong> ${precio}</p>
          <p style="font-size:12px; color:#e67e22">Precio con PIN autorizado</p>
          <button onclick="solicitarAccesoProducto('${codigo}')">Solicitar vía WhatsApp</button>
        </div>
        <img class="qr" src="${qr}" alt="QR ${codigo}">
      `;
      contenedor.appendChild(card);
    });

  } catch (error) {
    document.getElementById('contenedor-productos').innerHTML = `<p style="color:red">❌ Error al cargar productos. Verifica el CSV o tu conexión.</p>`;
  }
}

cargarProductos();
