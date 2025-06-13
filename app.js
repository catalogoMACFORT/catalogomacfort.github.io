
document.addEventListener('DOMContentLoaded', () => {
  fetch('productos.json')
    .then(res => res.json())
    .then(data => mostrarProductos(data));
});

function mostrarProductos(productos) {
  const tipo = localStorage.getItem("tipoUsuario") || "cliente";
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = productos.map(prod => {
    let precio = prod.precio_final;
    if (tipo === "distribuidor") precio = prod.precio_distribuidor;
    if (tipo === "mayorista") precio = prod.precio_mayorista;
    return `
      <div class="producto">
        <h3>${prod.nombre}</h3>
        <p>Precio (${tipo}): ${precio} Bs</p>
      </div>
    `;
  }).join('');
}
