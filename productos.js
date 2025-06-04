const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?gid=0&single=true&output=csv';
const tipoCambio = 16.33; // Puedes actualizar este valor manualmente en Google Sheets

const container = document.getElementById('contenedor-productos');

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const filas = data.trim().split('\n').slice(1);
    filas.forEach(linea => {
      const columnas = linea.split(',');

      const codigo = columnas[0].trim();
      const producto = columnas[1].trim();
      const precioUSD = parseFloat(columnas[4]) || 0;
      const precioBS = (precioUSD * tipoCambio).toFixed(2);
      const imagen = columnas[12] || `https://via.placeholder.com/100?text=${codigo}`;
      const qr = columnas[13] || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}`;

      const item = document.createElement('div');
      item.className = 'producto';
      item.innerHTML = `
        <div class="info">
          <strong>${producto}</strong><br>
          Código: ${codigo}<br>
          <span class="precio">Precio: <span style="color: green">Bs ${precioBS}</span></span><br>
          <span class="pin-alerta">Precio con PIN autorizado</span>
        </div>
        <img class="qr" src="${qr}" alt="QR">
      `;
      container.appendChild(item);
    });
  })
  .catch(err => {
    container.innerHTML = '<p style="color:red;">❌ Error al cargar productos. Revisa el CSV o el formato de publicación.</p>';
    console.error(err);
  });
