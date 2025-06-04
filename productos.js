const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?gid=0&single=true&output=csv";
const tipoCambio = 16.33; // Puedes cambiarlo directamente desde Google Sheets si deseas automatizar más adelante

const preciosPIN = {
  'distribuidor': 9,
  'mayorista': 8,
  'final': 7,
  'licitacion': 10
};

function obtenerPINDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('pin');
}

function detectarTipoCliente(pin) {
  const claves = {
    'DISTRIBUIDOR123': 'distribuidor',
    'MAYORISTA456': 'mayorista',
    'FINAL789': 'final',
    'LICITA000': 'licitacion'
  };
  return claves[pin] || null;
}

function cargarProductos() {
  fetch(urlCSV)
    .then(res => res.text())
    .then(data => {
      const filas = data.trim().split("\n").slice(1);
      const pin = obtenerPINDesdeURL();
      const tipoCliente = detectarTipoCliente(pin);

      const contenedor = document.getElementById("contenedor-productos");
      contenedor.innerHTML = "";

      filas.forEach(linea => {
        const columnas = linea.split(",");

        const codigo = columnas[0];
        const producto = columnas[1];
        const precioBase = parseFloat(columnas[4]);
        const urlQR = columnas[11];
        const precioCliente = tipoCliente ? (precioBase * tipoCambio).toFixed(2) : null;

        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        tarjeta.innerHTML = `
          <h3>${producto}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          ${tipoCliente ? `<p class="precio">Precio: Bs ${precioCliente}</p>` : `<p class="precio bloqueado">Precio con PIN autorizado</p>`}
          <img class="qr" src="${urlQR}" alt="QR ${codigo}">
        `;
        contenedor.appendChild(tarjeta);
      });
    })
    .catch(err => {
      document.getElementById("contenedor-productos").innerHTML = "<p>❌ Error al cargar productos. Revisa el enlace del CSV.</p>";
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
