// Configuración general
const URL_GOOGLE_SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';
const TIPO_CAMBIO = 16.33; // valor actual editable desde Google Sheets en el futuro

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedor-productos');

  try {
    const respuesta = await fetch(URL_GOOGLE_SHEET);
    const texto = await respuesta.text();
    const filas = texto.split('\n').slice(1);

    filas.forEach(fila => {
      const columnas = fila.split(',');
      const codigo = columnas[0]?.trim();
      const producto = columnas[1]?.trim();
      const precioUSD = parseFloat(columnas[4]) || 0;

      if (!codigo || !producto || !precioUSD) return;

      const precioBs = (precioUSD * TIPO_CAMBIO).toFixed(2);
      const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(codigo + ' ' + producto + ' MACFORT')}`;
      const imagenAuto = `https://via.placeholder.com/120x120.png?text=${encodeURIComponent(producto)}`;

      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <img class="producto-img" src="${imagenAuto}" alt="${producto}">
        <div class="producto-info">
          <h3>${producto}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p class="precio">Precio: <span>Bs ${precioBs}</span></p>
          <p class="pin-alerta">Precio con PIN autorizado</p>
        </div>
        <img class="qr" src="${urlQR}" alt="QR">
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    contenedor.innerHTML = '<p style="color:red;">❌ Error al cargar productos. Verifica tu conexión o el enlace CSV.</p>';
    console.error('Error al cargar productos:', error);
  }
});
