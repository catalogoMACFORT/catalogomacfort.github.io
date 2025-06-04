const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';
const tipoCambio = 16.33; // Puedes actualizar esto directamente desde Sheets más adelante.

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const filas = data.split('\n').slice(1); // Ignorar encabezado
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    filas.forEach(linea => {
      const columnas = linea.split(',');

      const codigo = columnas[0]?.trim();
      const nombre = columnas[1]?.trim();
      const precioBase = parseFloat(columnas[4]);
      const imagenQR = columnas[11];

      if (!codigo || !nombre || isNaN(precioBase)) return;

      const precioBs = (precioBase * tipoCambio).toFixed(2);

      const card = document.createElement('div');
      card.className = 'producto';

      card.innerHTML = `
        <div class="info">
          <strong>${nombre}</strong><br>
          Código: ${codigo}<br>
          <span class="precio">Precio: <b>Bs ${precioBs}</b></span><br>
          <span class="pin-alerta">Precio con PIN autorizado</span>
        </div>
        <img class="qr" src="${imagenQR}" alt="QR">
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('contenedor-productos').innerHTML = '❌ Error al cargar productos.';
    console.error('Error al cargar CSV:', error);
  });
