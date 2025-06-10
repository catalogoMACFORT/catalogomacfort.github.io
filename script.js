const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitación": "MACL2025"
};

function mostrarFormulario() {
  document.getElementById('formularioAcceso').classList.remove('oculto');
  document.getElementById('contenidoProductos').classList.add('oculto');
}

function solicitarPIN() {
  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const tipoCliente = document.getElementById('tipoCliente').value;
  if (!nombre || !whatsapp || !tipoCliente) {
    alert("Completa todos los campos antes de solicitar el PIN.");
    return;
  }
  const mensaje = `Hola, soy ${nombre}, quiero solicitar el PIN como cliente ${tipoCliente}.`;
  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function verificarPIN() {
  const tipoCliente = document.getElementById('tipoCliente').value;
  const pinIngresado = document.getElementById('pin').value;
  const pinCorrecto = pinesValidos[tipoCliente];

  if (pinIngresado === pinCorrecto) {
    document.getElementById('formularioAcceso').classList.add('oculto');
    document.getElementById('contenidoProductos').classList.remove('oculto');
    document.getElementById('bienvenida').textContent = `Bienvenido. Aquí verás los productos con precios para ${tipoCliente}.`;
    cargarProductos();
  } else {
    alert("PIN incorrecto. Verifica o solicita uno nuevo.");
  }
}

function cargarProductos() {
  const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
  fetch(urlCSV)
    .then(res => res.text())
    .then(data => {
      const filas = data.split("\n");
      let tablaHTML = "<table border='1'><tr>";
      const encabezados = filas[0].split(",");
      encabezados.forEach(col => tablaHTML += `<th>${col.trim()}</th>`);
      tablaHTML += "</tr>";

      for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].split(",");
        tablaHTML += "<tr>";
        celdas.forEach(celda => tablaHTML += `<td>${celda.trim()}</td>`);
        tablaHTML += "</tr>";
      }

      tablaHTML += "</table>";
      document.getElementById("tablaProductos").innerHTML = tablaHTML;
    });
}
