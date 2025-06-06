
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

fetch(CSV_URL)
  .then(res => res.text())
  .then(data => {
    const contenedor = document.getElementById("contenedor-productos");
    const filas = data.trim().split("\n").slice(1);

    filas.forEach(fila => {
      const columnas = fila.split(",");
      const [codigo, nombre, precioUSD, marca, procedencia, , , , , , , , , imagen, qr] = columnas;
      const precioBs = parseFloat(precioUSD) * 6.96;

      const tarjeta = `
        <div class="producto">
          <img src="${imagen || 'escalera_genérica.png'}" alt="${nombre}" />
          <h2>${nombre}</h2>
          <p><strong>Código:</strong> ${codigo}</p>
          <p><strong>Marca:</strong> ${marca}</p>
          <p><strong>Procedencia:</strong> ${procedencia}</p>
          <p><strong>Precio:</strong> Bs ${precioBs.toFixed(2)}</p>
          <p>*Precio personalizado según tipo de cliente</p>
          <img class="qr" src="${qr || 'qr_default.png'}" alt="QR"/>
        </div>`;
      contenedor.innerHTML += tarjeta;
    });
  })
  .catch(err => {
    document.getElementById("contenedor-productos").innerHTML = "<p>Error al cargar productos.</p>";
    console.error(err);
  });
