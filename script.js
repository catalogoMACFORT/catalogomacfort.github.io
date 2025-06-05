const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

// PINES por tipo de cliente
const PINES = {
  distribuidor: "MACD2025",
  mayorista: "MACM2025",
  final: "MACF2025",
  licitacion: "MACL2025"
};

// Solicita PIN
const PIN = prompt("🔐 Ingrese su PIN para acceder a precios personalizados:");

// Elemento contenedor
const contenedor = document.getElementById("contenedor-productos");

// Obtener CSV
fetch(URL_CSV)
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").slice(1);
    contenedor.innerHTML = "";

    filas.forEach(fila => {
      const columnas = fila.split(",");
      const [
        codigo, producto, precioUSD, marca, procedencia, urlQR, imagenURL,
        precioDistribuidor, precioMayorista, precioFinal, precioLicitacion
      ] = columnas;

      let precio = null;

      if (PIN === PINES.distribuidor) precio = parseFloat(precioDistribuidor);
      else if (PIN === PINES.mayorista) precio = parseFloat(precioMayorista);
      else if (PIN === PINES.final) precio = parseFloat(precioFinal);
      else if (PIN === PINES.licitacion) precio = parseFloat(precioLicitacion);

      if (precio) {
        contenedor.innerHTML += `
          <div class="producto">
            <img src="${imagenURL}" alt="${producto}">
            <div class="info">
              <h2>${producto}</h2>
              <p><strong>Código:</strong> ${codigo}</p>
              <p><strong>Marca:</strong> ${marca}</p>
              <p><strong>Procedencia:</strong> ${procedencia}</p>
              <p><strong>Precio:</strong> Bs ${precio.toFixed(2)}</p>
              <p class="nota">*Precio personalizado según tipo de cliente</p>
            </div>
            <img src="${urlQR}" alt="QR" class="qr">
          </div>
        `;
      }
    });

    if (contenedor.innerHTML === "") {
      contenedor.innerHTML = `<p>No se encontraron productos para este PIN.</p>`;
    }
  })
  .catch(err => {
    contenedor.innerHTML = `<p>❌ Error al cargar los productos.</p>`;
    console.error(err);
  });
