const productos = [
  { codigo: "MF-503", descripcion: "Escalera Multipropósito 4x3", precio: 650.37 },
  { codigo: "MF-504", descripcion: "Escalera Multipropósito 4x4", precio: 768.71 },
  { codigo: "MF-505", descripcion: "Escalera Multipropósito 4x5", precio: 884.89 },
  { codigo: "MF-506", descripcion: "Escalera Multipropósito 4x6", precio: 1001.08 }
];

const catalogo = document.getElementById("catalogo");
const totalCarrito = document.getElementById("totalCarrito");
let total = 0;

productos.forEach(prod => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <h3>${prod.codigo}</h3>
    <p>${prod.descripcion}</p>
    <p><strong>Precio Base Bs. ${prod.precio.toFixed(2)}</strong></p>
    <label>Selecciona presentación:</label>
    <select class="presentacion">
      <option value="1">Unidad</option>
      <option value="12">Paquete (x12)</option>
      <option value="240">Caja (x240)</option>
    </select>
    <input type="number" class="cantidad" min="1" value="1" />
    <button onclick="agregarCarrito(${prod.precio}, this)">Agregar al carrito</button>
  `;
  catalogo.appendChild(div);
});

function agregarCarrito(precioBase, boton) {
  const contenedor = boton.parentElement;
  const select = contenedor.querySelector(".presentacion");
  const cantidad = contenedor.querySelector(".cantidad").value;
  const factor = parseInt(select.value);
  const subtotal = precioBase * factor * parseInt(cantidad);
  total += subtotal;
  totalCarrito.innerText = `Bs. ${total.toFixed(2)}`;
}
