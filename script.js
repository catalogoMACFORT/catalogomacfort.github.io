
document.getElementById("formularioDatos").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const cargo = document.getElementById("cargo").value.trim();
  const rubro = document.getElementById("rubro").value.trim();
  const tipoCliente = document.getElementById("tipoCliente").value.trim();

  if (!tipoCliente) {
    alert("Por favor selecciona un tipo de cliente.");
    return;
  }

  const mensaje = `Hola, soy ${nombre},
Deseo solicitar el PIN de acceso.
WhatsApp: ${whatsapp}
Ciudad: ${ciudad}
Empresa: ${empresa}
Cargo: ${cargo}
Rubro: ${rubro}
Tipo de cliente: ${tipoCliente}`;
  const numeroWhatsApp = "59168099278";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.location.href = url;
});
