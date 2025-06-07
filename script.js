
const pinesValidos = {
  Distribuidor: "MACD2025",
  Mayorista: "MACMA2025",
  ClienteFinal: "MACF2025",
  Licitación: "MACL2025"
};

function mostrarFormulario() {
  document.getElementById('formulario').classList.remove('oculto');
}

function solicitarPIN() {
  const tipo = document.getElementById("tipoCliente").value;
  const nombre = document.getElementById("nombre").value;
  const numero = document.getElementById("WhatsApp").value;
  const link = `https://wa.me/59168099278?text=Hola,%20soy%20${nombre},%20solicito%20el%20PIN%20como%20${tipo}`;
  window.open(link, "_blank");
  document.getElementById("ingresoPIN").classList.remove("oculto");
}

function verificarPIN() {
  const tipo = document.getElementById("tipoCliente").value;
  const pin = document.getElementById("pinIngresado").value;
  const correcto = pinesValidos[tipo];
  if (pin === correcto) {
    document.getElementById("mensajeBienvenida").classList.remove("oculto");
    document.getElementById("mensajeBienvenida").innerHTML =
      `Bienvenido, aquí verás los productos con precios para ${tipo}`;
  } else {
    alert("PIN incorrecto");
  }
}
