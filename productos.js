const contenedor = document.getElementById('contenedor-productos');
const urlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';
const tipoCambioManual = 16.33;

const pinCliente = {
  distribuidor: "PIN1234",
  mayorista: "PIN2345",
  final: "PIN3456",
  licitacion: "PIN4567"
};

const tipoActual = new URLSearchParams(window.location.search).get("tipo");
const pinIngresado = new URLSearchParams(window.location.search).get("pin");

const mostrarPrecio = () => pinIngresado === pinCliente[tipoActual];

fetch(urlCSV)
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n").slice(1);
    rows.forEach(row => {
      const cols = row.split(",");
      if (cols.length < 6) return;

      const codigo = cols[0].trim();
      const nombre = cols[1].trim();
      const precioUSD = parseFloat(cols[2]);
      const qrBase64 = cols[cols.length - 1].trim();

      const div = document.createElement('div');
      div.className = 'producto';

      const precioBs = (precioUSD * tipoCambioManual).toFixed(2);

      div.innerHTML = `
        <div class="detalle">
          <h3>${nombre}</h3>
          <p><strong>Código:</strong> ${codigo}</p>
          <p class="precio">${mostrarPrecio() ? `Precio: <span class='bs'>Bs ${precioBs}</span>` : `Precio con PIN autorizado`}</p>
        </div>
        <div class="qr">
          <img src="${qrBase64}" alt="QR">
        </div>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(error => {
    contenedor.innerHTML = `<p class="error">❌ Error al cargar productos. Revisa el enlace del CSV o la estructura.</p>`;
    console.error(error);
  });
