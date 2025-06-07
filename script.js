const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitación": "MACL2025"
};

document.addEventListener("DOMContentLoaded", () => {
  const tipoCliente = document.getElementById("tipoCliente");
  const formulario = document.getElementById("formularioSecreto");

  tipoCliente.addEventListener("change", () => {
    if (tipoCliente.value) {
      formulario.classList.remove("oculto");
    } else {
      formulario.classList.add("oculto");
    }
  });
});
