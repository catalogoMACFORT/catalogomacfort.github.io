
document.addEventListener("DOMContentLoaded", () => {
  fetch("productos.json")
    .then(res => res.json())
    .then(productos => mostrarCarrito(productos));
});

function mostrarCarrito(productos) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tipo = localStorage.getItem("tipoUsuario") || "cliente";
  const contenedor = document.getElementById("listaCarrito");
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    document.getElementById("total").innerText = "";
    return;
  }

  contenedor.innerHTML = carrito.map((i, idx) => {
    let p = productos[i];
    let precio = p.precio_final;
    if (tipo === "distribuidor") precio = p.precio_distribuidor;
    if (tipo === "mayorista") precio = p.precio_mayorista;
    total += precio;
    return `
      <div class="producto">
        <h4>${p.nombre}</h4>
        <p>Precio (${tipo}): ${precio} Bs</p>
        <button onclick="eliminarDelCarrito(${idx})">Eliminar</button>
      </div>
    `;
  }).join("");

  document.getElementById("total").innerText = `Total: ${total.toFixed(2)} Bs`;
}

function eliminarDelCarrito(idx) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(idx, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}

function finalizarPedido() {
  alert("¡Pedido finalizado! (simulado)");
  localStorage.removeItem("carrito");
  location.href = "index.html";
}

function cerrarSesion() {
  localStorage.clear();
  location.href = "login.html";
}

function finalizarPedido() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) return;

  const historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];
  const fecha = new Date().toLocaleString();
  const totalTexto = document.getElementById("total").innerText;
  const total = totalTexto.replace("Total: ", "").replace(" Bs", "");
  historial.push({ fecha, total });
  localStorage.setItem("historialPedidos", JSON.stringify(historial));
  localStorage.removeItem("carrito");
  alert("¡Pedido guardado exitosamente!");
  location.href = "index.html";
}
