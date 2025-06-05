const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

fetch(CSV_URL)
  .then(res => res.text())
  .then(data => {
    const contenedor = document.getElementById("contenedor-productos");
    const filas = data.trim().split("\n").slice(1);

    filas.forEach(fila => {
      const columnas = fila.split(",");
      const [codigo, nombre, precioUSD, marca, procedencia, , , , , , , , , imagen, qr] = columnas;

      const tarjeta = `
        <div class="producto">
          <img class="producto-img" src="${imagen || 'https://via.placeholder.com/100'}" alt="${nombre}">
          <div class="producto-info">
            <h2>${nombre}</h2>
            <p><strong>Código:</strong> ${codigo}</p>
            <p><strong>Marca:</strong> ${marca}</p>
            <p><strong>Procedencia:</strong> ${procedencia}</p>
            <p><strong>Precio:</strong> Bs ${parseFloat(precioUSD).toFixed(2)}</p>
            <p class="nota">*Precio personalizado según tipo de cliente</p>
          </div>
          <img class="qr" src="${qr || 'https://via.placeholder.com/100'}" alt="QR">
        </div>
      `;

      contenedor.innerHTML += tarjeta;
    });
  })
  .catch(error => {
    console.error('Error al cargar el CSV:', error);
    document.getElementById("contenedor-productos").innerHTML = "<p>Error al cargar los productos.</p>";
  });
