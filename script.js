
document.addEventListener("DOMContentLoaded", function () {
  const tipoCliente = document.getElementById("tipoCliente");
  const formularioSecreto = document.getElementById("formularioSecreto");
  const formularioDatos = document.getElementById("formularioDatos");
  const pinSection = document.getElementById("pinSection");
  const inputPin = document.getElementById("inputPin");
  const verificarPin = document.getElementById("verificarPin");
  const listaProductos = document.getElementById("listaProductos");

  let clienteSeleccionado = "";

  tipoCliente.addEventListener("change", function () {
    if (this.value) {
      clienteSeleccionado = this.value;
      formularioSecreto.classList.remove("oculto");
    } else {
      formularioSecreto.classList.add("oculto");
    }
  });

  formularioDatos.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const ciudad = document.getElementById("ciudad").value;
    const empresa = document.getElementById("empresa").value;
    const cargo = document.getElementById("cargo").value;
    const rubro = document.getElementById("rubro").value;

    const mensaje = \`Hola, soy \${nombre}.\nCategoría: \${clienteSeleccionado}\nWhatsApp: \${whatsapp}\nCiudad: \${ciudad}\nEmpresa: \${empresa}\nCargo: \${cargo}\nRubro: \${rubro}\nSolicito el PIN de acceso al catálogo.\`;

    const url = \`https://wa.me/59168099278?text=\${encodeURIComponent(mensaje)}\`;
    window.open(url, "_blank");

    formularioSecreto.classList.add("oculto");
    pinSection.classList.remove("oculto");
  });

  verificarPin.addEventListener("click", function () {
    const pinesValidos = {
      Distribuidor: "MAC2025D",
      Mayorista: "MAC2025M",
      ClienteFinal: "MAC2025C",
      Licitacion: "MAC2025L"
    };

    const pinIngresado = inputPin.value.trim().toUpperCase();
    if (pinIngresado === pinesValidos[clienteSeleccionado]) {
      pinSection.classList.add("oculto");
      listaProductos.classList.remove("oculto");
    } else {
      alert("PIN incorrecto. Por favor, solicita el PIN correcto por WhatsApp.");
    }
  });
});
