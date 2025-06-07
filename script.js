
document.getElementById("tipoCliente").addEventListener("change", function () {
  document.getElementById("formularioSecreto").classList.remove("oculto");
});

document.getElementById("formularioDatos").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const ciudad = document.getElementById("ciudad").value;
  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const rubro = document.getElementById("rubro").value;
  const tipoCliente = document.getElementById("tipoCliente").value;

  const mensaje = `Hola, soy ${nombre} y deseo solicitar el PIN.\n
🔸 Tipo de Cliente: ${tipoCliente}
👤 Nombre: ${nombre}
📞 WhatsApp: ${whatsapp}
🏢 Empresa: ${empresa}
📍 Ciudad: ${ciudad}
🧰 Rubro: ${rubro}
🎯 Cargo: ${cargo}`;

  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  document.getElementById("formularioSecreto").classList.add("oculto");
  document.getElementById("accesoPin").classList.remove("oculto");
});

function verificarPIN() {
  const pinesValidos = {
    "Distribuidor": "MACD2025",
    "Mayorista": "MACMA2025",
    "ClienteFinal": "MACF2025",
    "Licitación": "MACL2025"
  };
  const tipoCliente = document.getElementById("tipoCliente").value;
  const pinIngresado = document.getElementById("pin").value;

  if (pinIngresado === pinesValidos[tipoCliente]) {
    const nombre = document.getElementById("nombre").value;
    document.getElementById("accesoPin").classList.add("oculto");
    document.getElementById("mensajeBienvenida").classList.remove("oculto");
    document.getElementById("mensajeBienvenida").innerHTML =
      `<h3>Bienvenido, ${nombre}. Aquí verás los productos con sus precios para <strong>${tipoCliente}</strong>.</h3>`;
  } else {
    alert("❌ PIN incorrecto para el tipo seleccionado.");
  }
}
