
const pinesValidos = {
  Distribuidor: "MACD2025",
  Mayorista: "MACMA2025",
  ClienteFinal: "MACF2025",
  Licitación: "MACL2025",
};

function mostrarFormulario() {
  document.getElementById("formulario").classList.remove("oculto");
  document.getElementById("seccionPIN").classList.add("oculto");
  document.getElementById("accesoProductos").classList.add("oculto");
}

function solicitarPin() {
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const tipo = document.getElementById("tipoCliente").value;
  if (!nombre || !whatsapp || !tipo) return alert("Completa todos los datos.");

  const mensaje = `Hola, soy ${nombre} y deseo acceder como ${tipo}. Mi número es: ${whatsapp}`;
  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  document.getElementById("seccionPIN").classList.remove("oculto");
}

function verificarPIN() {
  const tipo = document.getElementById("tipoCliente").value;
  const pinIngresado = document.getElementById("pin").value;
  const pinEsperado = pinesValidos[tipo];

  if (pinIngresado === pinEsperado) {
    document.getElementById("mensajeBienvenida").innerText = `Bienvenido. Aquí verás los productos con precios para ${tipo}.`;
    document.getElementById("productosFrame").src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pubhtml?widget=true&amp;headers=false";
    document.getElementById("accesoProductos").classList.remove("oculto");
  } else {
    alert("PIN incorrecto. Solicita nuevamente por WhatsApp.");
  }
}
