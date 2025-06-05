// Archivo productos.js
const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

const tipoCambio = 16.33; // Actualizable desde Google Sheets próximamente

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const contenedor = document.getElementById('contenedor-productos');
    rows.forEach(row => {
      const columnas = row.split(',');

      const codigo = columnas[0];
      const nombre = columnas[1];
      const precioUSD = parseFloat(columnas[4]);

      if (!codigo || isNaN(precioUSD)) return;

      const precioBs = (precioUSD * tipoCambio).toFixed(2);

      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>Código:</strong> ${codigo}</p>
        <p><strong>Precio:</strong> <span class="precio">Bs ${precioBs}</span></p>
        <p class="aviso">Precio con PIN autorizado</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo} - ${nombre}" alt="QR">
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById('contenedor-productos').innerHTML = '<p>❌ Error al cargar productos.</p>';
  });
