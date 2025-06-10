const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitación": "MACL2025"
};

function mostrarFormulario() {
  document.getElementById("datosFormulario").classList.remove("oculto");
  document.getElementById("ingresoPIN").classList.add("oculto");
  document.getElementById("productos").classList.add("oculto");
}

function solicitarPIN() {
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const tipoCliente = document.getElementById("tipoCliente").value;

  if (!nombre || !whatsapp || !tipoCliente) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const pin = pinesValidos[tipoCliente];
  const mensaje = `Hola, soy ${nombre}, solicito el acceso al catálogo como ${tipoCliente}. Mi PIN es: ${pin}`;
  const enlace = `https://wa.me/591${whatsapp}?text=${encodeURIComponent(mensaje)}`;

  window.open(enlace, '_blank');

  document.getElementById("ingresoPIN").classList.remove("oculto");
}

function verificarPIN() {
  const tipoCliente = document.getElementById("tipoCliente").value;
  const pinIngresado = document.getElementById("pin").value;

  if (pinIngresado === pinesValidos[tipoCliente]) {
    mostrarProductos(tipoCliente);
  } else {
    alert("PIN incorrecto. Verifica el código que recibiste.");
  }
}

function mostrarProductos(tipoCliente) {
  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv")
    .then(response => response.text())
    .then(csv => {
      const filas = csv.trim().split("\n").slice(1);
      const html = filas.map(fila => {
        const celdas = fila.split(",");
        return `<tr>${celdas.map(c => `<td>${c}</td>`).join("")}</tr>`;
      });

      const tabla = `
        <h2>Bienvenido. Aquí verás los productos con precios para ${tipoCliente}.</h2>
        <table border="1" cellpadding="5" style="margin:auto;">
          <thead>
            <tr><th>Código</th><th>Producto</th><th>Precio Bs</th><th>Procedencia</th><th>Marca</th><th>Precio Ideal</th></tr>
          </thead>
          <tbody>${html.join("")}</tbody>
        </table>`;

      const contenedor = document.getElementById("productos");
      contenedor.innerHTML = tabla;
      contenedor.classList.remove("oculto");
    })
    .catch(() => alert("Error al cargar productos."));
}
