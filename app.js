
document.addEventListener('DOMContentLoaded', () => {
  fetch('productos.json')
    .then(res => res.json())
    .then(data => mostrarProductos(data));
  mostrarCarrito();
});

function mostrarProductos(productos) {
  const tipo = localStorage.getItem("tipoUsuario") || "cliente";
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = productos.map((prod, index) => {
    let precio = prod.precio_final;
    if (tipo === "distribuidor") precio = prod.precio_distribuidor;
    if (tipo === "mayorista") precio = prod.precio_mayorista;
    return `
      <div class="producto">
        <h3>${prod.nombre}</h3>
        <p>Precio (${tipo}): ${precio} Bs</p>
        <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
      </div>
    `;
  }).join('');
}

function agregarAlCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(index);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  document.getElementById("carrito").innerText = `🛒 Carrito (${carrito.length})`;
}
