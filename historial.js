
document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario") || "Invitado";
  const tipo = localStorage.getItem("tipoUsuario") || "cliente";

  document.getElementById("infoUsuario").innerHTML = `
    <p>👤 Usuario: <strong>${usuario}</strong></p>
    <p>🔑 Tipo de cuenta: <strong>${tipo}</strong></p>
  `;

  const historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];
  const contenedor = document.getElementById("historialPedidos");

  if (historial.length === 0) {
    contenedor.innerHTML = "<p>No tienes pedidos realizados aún.</p>";
    return;
  }

  contenedor.innerHTML = historial.map((pedido, index) => `
    <div class="producto">
      <h4>Pedido #${index + 1}</h4>
      <p>${pedido.total} Bs - ${pedido.fecha}</p>
    </div>
  `).join("");
});

function cerrarSesion() {
  localStorage.clear();
  location.href = "login.html";
}
