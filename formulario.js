
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("formulario-cliente");
  const form = document.getElementById("cliente-form");

  if (!localStorage.getItem("clienteNombre")) {
    modal.style.display = "flex";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("clienteNombre", document.getElementById("nombre").value);
    localStorage.setItem("clienteNegocio", document.getElementById("negocio").value);
    localStorage.setItem("clienteWhatsApp", document.getElementById("whatsapp").value);
    localStorage.setItem("clienteTipo", document.getElementById("tipo-cliente").value);
    modal.style.display = "none";
  });
});
