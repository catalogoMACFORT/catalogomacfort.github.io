const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitación": "MACL2025"
};

document.getElementById("tipoCliente").addEventListener("change", function () {
  const tipo = this.value;
  if (tipo) {
    document.getElementById("formularioSecreto").classList.remove("oculto");
  } else {
    document.getElementById("formularioSecreto").classList.add("oculto");
  }
});

document.getElementById("formularioDatos").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipoCliente = document.getElementById("tipoCliente").value;
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const ciudad = document.getElementById("ciudad").value;
  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const rubro = document.getElementById("rubro").value;

  const pin = prompt(`Hola ${nombre}, por favor ingresa el PIN que recibiste por WhatsApp:`);

  if (pin === pinesValidos[tipoCliente]) {
    alert("¡Acceso concedido!");
    document.getElementById("formularioSecreto").classList.add("oculto");
    document.querySelector(".filtros").classList.add("oculto");
    document.getElementById("listaProductos").classList.remove("oculto");

    document.getElementById("listaProductos").innerHTML = `<p>Bienvenido, ${nombre}. Aquí verás los productos con sus precios para <strong>${tipoCliente}</strong>.</p>`;
    // Aquí puedes agregar llamada para cargar productos reales
  } else {
    alert("PIN incorrecto para el tipo seleccionado.");
  }
});
