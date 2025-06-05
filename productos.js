const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-XXXXX/pub?output=csv';

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const filas = data.split('\n').slice(1);
    const contenedor = document.getElementById('contenedor-productos');
    filas.forEach(fila => {
      const columnas = fila.split(',');
      const codigo = columnas[0];
      const nombre = columnas[1];
      const precio = parseFloat(columnas[5]).toFixed(2); // Ajusta el índice a tu columna de precio base
      const imagen = columnas[13]; // si tienes una columna de imagen
      const qr = columnas[14]; // si tienes una columna con el QR
      
      const html = `
        <div class="producto">
          <h2>${nombre}</h2>
          <p><strong>Código:</strong> ${codigo}</p>
          <p><strong>Precio:</strong> Bs ${precio}</p>
          <img src="${qr}" alt="QR" width="80">
          <button onclick="solicitarAccesoProducto('${codigo}')">Solicitar PIN</button>
        </div>
      `;
      contenedor.innerHTML += html;
    });
  });
