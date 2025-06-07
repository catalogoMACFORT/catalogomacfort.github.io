const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitacion": "MACL2025"
};

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
    
    // Ocultar formulario y filtros
    document.getElementById("formularioSecreto").style.display = "none";
    document.querySelector(".filtros").style.display = "none";
    
    // Mostrar productos con precios (si tienes una función que lo hace)
    document.getElementById("listaProductos").classList.remove("oculto");
    cargarProductosConPrecios(tipoCliente); // Esta función debe existir para mostrar precios
  } else {
    alert("PIN incorrecto para el tipo de cliente seleccionado.");
  }
});
