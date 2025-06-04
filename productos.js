const tipoCambio = 7.15;

fetch('catalogo_macfort_2025.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n').slice(1);
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    rows.forEach(row => {
      const columnas = row.split(',');

      const codigo = columnas[0].trim();
      const nombre = columnas[1].trim();
      const precioUSD = parseFloat(columnas[2]);
      const precioBS = (precioUSD * tipoCambio).toFixed(2);
      const qr = columnas[3]?.trim() || '';

      const html = `
        <div class="producto">
          <div class="info">
            <strong>${nombre}</strong><br>
            Código: ${codigo}<br>
            Precio: <span class="precio">Bs ${precioBS}</span><br>
            <span class="pin-alerta">Precio con PIN autorizado</span>
          </div>
          <img class="qr" src="${qr}" alt="QR">
        </div>
      `;

      contenedor.innerHTML += html;
    });
  })
  .catch(error => {
    document.getElementById('productos').innerHTML = '❌ Error al cargar productos.';
    console.error('Error al cargar el CSV:', error);
  });
