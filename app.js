
const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const PINES = {
  distribuidor: "MACD2025",
  mayorista: "MACM2025",
  final: "MACF2025",
  licitacion: "MACL2025"
};

let tipoCliente = null;
let PIN = null;

function seleccionarCliente(tipo) {
  tipoCliente = tipo;
  PIN = prompt("🔐 Ingrese su PIN para acceder a precios personalizados:");
  if (PIN === PINES[tipo]) {
    cargarProductos();
  } else {
    alert("PIN incorrecto. Solicite su PIN autorizado.");
  }
}

function cargarProductos() {
  fetch(URL_CSV)
    .then(res => res.text())
    .then(csv => {
      const filas = csv.split("\n").slice(1); // omitir encabezado
      const contenedor = document.getElementById("contenedor-productos");
      contenedor.innerHTML = "";

      filas.forEach(fila => {
        const columnas = fila.split(",");
        const [codigo, producto, precioUSD, marca, categoria, urlQR, imagenURL, pinDistribuidor, pinMayorista, pinFinal, pinLicitacion] = columnas;

        let precio = null;
        if (PIN === PINES.distribuidor) precio = parseFloat(pinDistribuidor);
        else if (PIN === PINES.mayorista) precio = parseFloat(pinMayorista);
        else if (PIN === PINES.final) precio = parseFloat(pinFinal);
        else if (PIN === PINES.licitacion) precio = parseFloat(pinLicitacion);

        if (precio && imagenURL) {
          const productoHTML = \`
            <div class="producto">
              <img src="\${imagenURL}" alt="\${producto}" />
              <div class="info">
                <h2>\${producto}</h2>
                <p><strong>Código:</strong> \${codigo}</p>
                <p><strong>Marca:</strong> \${marca}</p>
                <p><strong>Categoría:</strong> \${categoria}</p>
                <p><strong>Precio:</strong> Bs \${precio.toFixed(2)}</p>
                <p class="nota">*Precio personalizado según tipo de cliente</p>
              </div>
              <img src="\${urlQR}" alt="QR" class="qr" />
            </div>
          \`;
          contenedor.innerHTML += productoHTML;
        }
      });
    })
    .catch(err => {
      document.getElementById("contenedor-productos").innerHTML = "<p style='color:red;'>❌ Error al cargar productos.</p>";
      console.error(err);
    });
}
