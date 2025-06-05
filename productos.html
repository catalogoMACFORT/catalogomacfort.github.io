const URL_GOOGLE_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const contenedor = document.getElementById('contenedor-productos');

// Simular PIN ingresado manualmente (tú lo actualizarás dinámicamente según cliente)
const tipoCliente = localStorage.getItem('cliente_tipo') || '';
const PINES = {
  distribuidor: "12345",
  mayorista: "23456",
  final: "34567",
  licitacion: "45678"
};

// Usar tipo de cambio editable desde Google Sheets o por defecto
let tipoCambio = 16.33;

fetch(URL_GOOGLE_SHEET)
  .then(response => response.text())
  .then(csv => {
    const filas = csv.split('\n').slice(1);
    filas.forEach(linea => {
      const datos = linea.split(',');

      const codigo = datos[0];
      const nombre = datos[1];
      const precioUSD = parseFloat(datos[4]);
      const qr = datos[10];

      // Mostrar precios solo si se tiene PIN correcto
      let precioVisible = 'Precio con PIN autorizado';
      let mostrarPrecio = false;

      const pinActual = localStorage.getItem('pin_ingresado');

      if (pinActual) {
        if (pinActual === PINES[tipoCliente]) {
          const precioBs = (precioUSD * tipoCambio).toFixed(2);
          precioVisible = `Precio: Bs ${precioBs}`;
          mostrarPrecio = true;
        } else {
          precioVisible = 'PIN incorrecto';
        }
      }

      contenedor.innerHTML += `
        <div class="producto">
          <div class="info">
            <strong>${nombre}</strong><br>
            Código: ${codigo}<br>
            ${mostrarPrecio ? `<span class="precio">${precioVisible}</span>` : `<span class="pin-alerta">${precioVisible}</span>`}
          </div>
          <img src="${qr}" alt="QR">
        </div>
      `;
    });
  });
