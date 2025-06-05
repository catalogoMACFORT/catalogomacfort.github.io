const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

// Asignación de PIN por tipo de cliente
const PINES = {
  distribuidor: "MACD2025",
  mayorista: "MACM2025",
  final: "MACF2025",
  licitacion: "MACL2025"
};

const PIN = prompt("🔐 Ingrese su PIN para acceder a precios personalizados:");

fetch(URL_CSV)
  .then(res => res.text())
  .then(csv => {
    const filas = csv.split("\n").slice(1); // omitir encabezado
    const contenedor = document.getElementById("contenedor-productos");

    filas.forEach(fila => {
      const columnas = fila.split(",");
      const [codigo, producto, precioUSD, marca, categoria, urlQR, imagenURL, pinDistribuidor, pinMayorista, pinFinal, pinLicitacion] = columnas;

      let precio = null;

      if (PIN === PINES.distribuidor) precio = parseFloat(pinDistribuidor);
      else if (PIN === PINES.mayorista) precio = parseFloat(pinMayorista);
      else if (PIN === PINES.final) precio = parseFloat(pinFinal);
      else if (PIN === PINES.licitacion) precio = parseFloat(pinLicitacion);

      if (precio) {
        contenedor.innerHTML += `
          <div class="producto">
            <img src="${imagenURL}" alt="${producto}">
            <div class="info">
              <h2>${producto}</h2>
              <p><strong>Código:</strong> ${codigo}</p>
              <p><strong>Precio:</strong> Bs ${precio.toFixed(2)}</p>
              <p class="nota">Precio visible solo con PIN autorizado</p>
            </div>
            <img src="${urlQR}" alt="QR" class="qr">
          </div>
        `;
      }
    });
  });
