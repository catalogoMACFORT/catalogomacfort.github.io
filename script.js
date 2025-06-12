const tipoCambio = 16.3;

const productos = [
  { codigo: "MF-503", nombre: "Escalera Multipropósito 4x3", precioUSD: 39.90, categoria: "Escaleras" },
  { codigo: "MF-504", nombre: "Escalera Multipropósito 4x4", precioUSD: 47.15, categoria: "Escaleras" },
  { codigo: "MF-505", nombre: "Escalera Multipropósito 4x5", precioUSD: 54.30, categoria: "Escaleras" },
  { codigo: "MF-506", nombre: "Escalera Multipropósito 4x6", precioUSD: 61.45, categoria: "Escaleras" }
];

const carrito = [];

function cargarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const precioBs = (p.precioUSD * tipoCambio).toFixed(2);

    const item = document.createElement("div");
    item.className = "producto";
    item.innerHTML = `
      <h3>${p.codigo}</h3>
      <p>${p.nombre}</p>
      <p><strong>Precio Base Bs. ${precioBs}</strong></p>
      <label>Selecciona presentación:</label>
      <select id="tipo-${p.codigo}">
        <option value="1">Unidad</option>
        <option value="12">Paquete (x12)</option>
        <option value="240">Caja (x240)</option>
      </select>
      <input id="cantidad-${p.codigo}" type="number" min="1" value="1">
      <button onclick="agregarCarrito('${p.codigo}')">Añadir al carrito</button>
    `;
    contenedor.appendChild(item);
  });
}

function agregarCarrito(codigo) {
  const producto = productos.find(p => p.codigo === codigo);
  const tipo = parseInt(document.getElementById(`tipo-${codigo}`).value);
  const cantidad = parseInt(document.getElementById(`cantidad-${codigo}`).value);
  const total = tipo * cantidad * producto.precioUSD * tipoCambio;

  carrito.push({ ...producto, tipo, cantidad, total });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("itemsCarrito");
  const total = carrito.reduce((s, p) => s + p.total, 0);
  document.getElementById("total").innerText = `Total: Bs. ${total.toFixed(2)}`;
  
  lista.innerHTML = "";
  carrito.forEach(p => {
    lista.innerHTML += `<li>${p.nombre} x${p.cantidad} (${p.tipo}) → Bs. ${p.total.toFixed(2)}</li>`;
  });
}

window.onload = cargarProductos;
