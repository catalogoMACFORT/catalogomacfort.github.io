
document.getElementById("formularioDatos").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const ciudad = document.getElementById("ciudad").value;
  const empresa = document.getElementById("empresa").value || "No especificada";
  const cargo = document.getElementById("cargo").value;
  const rubro = document.getElementById("rubro").value;
  const tipoCliente = document.getElementById("tipoCliente").value;

  const mensaje = `📥 *Solicitud de PIN para catálogo*:

👤 *Nombre:* ${nombre}
📱 *WhatsApp:* ${whatsapp}
🏙️ *Ciudad:* ${ciudad}
🏢 *Empresa:* ${empresa}
🧑‍💼 *Cargo:* ${cargo}
💼 *Rubro:* ${rubro}
📌 *Tipo de Cliente:* ${tipoCliente}

Por favor, envíame el PIN para acceder al catálogo con precios.`;

  window.open(`https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`);
  document.getElementById("ingresarPin").classList.remove("oculto");
});

function validarPin() {
  const pinCorrecto = "1234"; // Cambiar este PIN real por una validación segura
  const pinIngresado = document.getElementById("pinIngresado").value;

  if (pinIngresado === pinCorrecto) {
    alert("✅ Acceso concedido. Los precios están desbloqueados.");
    // Activar visibilidad de precios aquí
  } else {
    alert("❌ PIN incorrecto. Solicita uno válido.");
  }
}
