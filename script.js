document.addEventListener("DOMContentLoaded", function () {
  const tipoCliente = document.getElementById("tipoCliente");
  const formularioSecreto = document.getElementById("formularioSecreto");
  const formulario = document.getElementById("formularioDatos");

  tipoCliente.addEventListener("change", () => {
    if (tipoCliente.value !== "") {
      formularioSecreto.classList.remove("oculto");
    } else {
      formularioSecreto.classList.add("oculto");
    }
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const ciudad = document.getElementById("ciudad").value;
    const empresa = document.getElementById("empresa").value;
    const cargo = document.getElementById("cargo").value;
    const rubro = document.getElementById("rubro").value;
    const cliente = tipoCliente.value;

    const mensaje = `Hola, deseo solicitar mi PIN de acceso al catálogo:\n
👤 Nombre: ${nombre}
📞 WhatsApp: ${whatsapp}
🏙️ Ciudad/Región: ${ciudad}
🏢 Empresa: ${empresa}
💼 Cargo: ${cargo}
📂 Rubro: ${rubro}
🧾 Tipo de cliente: ${cliente}`;

    const numero = "59168099278"; // Cambia esto si es otro número
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
});
