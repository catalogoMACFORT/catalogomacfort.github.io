const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';
const contenedor = document.getElementById('contenedor-productos');
const tipoCambio = 16.33; // Cambiar manualmente según necesidad
const pinCorrecto = {
  distribuidor: "1234",
  mayorista: "5678",
  final: "0000",
  licitacion: "9999"
};

let pinIngresado = null;
let tipoCliente = null;

async function cargarProductos() {
  try {
    const respuesta = await fetch(CSV_URL);
    const datos = await respuesta.text();
    const filas = datos.split("\n").slice(1);

    filas.forEach(fila => {
      const columnas = fila.split(",");
      const [codigo, nombre, precioUSD, , , , , , , , , , , imagen, qr] = columnas;

      if (!codigo || !nombre || !precioUSD) return;

      const div = document.createElement("div");
      div.className = "producto";

      const precioBs = (parseFloat(precioUSD) * tipoCambio).toFixed(2);
      const mostrarPrecio = pinIngresado ? `Bs ${precioBs}` : '🔒 Precio con PIN autorizado';
      const clasePrecio = pinIngresado ? 'visible' : 'oculto';

      div.innerHTML = `
        <img src="${imagen || 'https://via.placeholder.com/100'}" alt="${nombre}">
        <div class="info">
          <strong>${nombre}</strong><br>
          Código: ${codigo}<br>
          <span class="precio ${clasePrecio}">Precio: ${mostrarPrecio}</span><br>
          <span class="pin-alerta">${!pinIngresado ? 'Solicite su PIN para acceder al precio' : ''}</span>
        </div>
        <img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(nombre)}" alt="QR">
      `;

      contenedor.appendChild(div);
    });

  } catch (error) {
    contenedor.innerHTML = "<p style='color:red;'>❌ Error al cargar productos. Verifica el enlace del CSV.</p>";
  }
}

// Almacenar tipo de cliente y solicitar PIN
window.enviarWhatsapp = function(tipo) {
  tipoCliente = tipo;
  const pin = prompt(`Ingresa el PIN de acceso para cliente ${tipo.toUpperCase()}:`);
  if (pin === pinCorrecto[tipo]) {
    pinIngresado = true;
    contenedor.innerHTML = '';
    cargarProductos();
  } else {
    alert("PIN incorrecto. Solicite su PIN autorizado por WhatsApp.");
    pinIngresado = false;
  }
};

document.addEventListener("DOMContentLoaded", cargarProductos);
