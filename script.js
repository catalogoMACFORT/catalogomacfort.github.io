const productos = [
  { codigo: "MF-503", descripcion: "Escalera Multipropósito 4x3", precio: 650.37, categoria: "Escaleras" },
  { codigo: "MF-504", descripcion: "Escalera Multipropósito 4x4", precio: 768.71, categoria: "Escaleras" },
  { codigo: "MF-505", descripcion: "Escalera Multipropósito 4x5", precio: 884.89, categoria: "Escaleras" },
  { codigo: "MF-506", descripcion: "Escalera Multipropósito 4x6", precio: 1001.08, categoria: "Escaleras" }
];

let totalCarrito = 0;

function mostrarProductos(filtro = "Todos") {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  const categorias = new Set(["Todos"]);
  productos.forEach(p => categorias.add(p.categoria));

  const filtroSelect = document.getElementById("filtroCategoria");
  filtroSelect.innerHTML = "";
  categorias.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.text = cat;
    filtroSelect.appendChild(opt);
  });
  filtroSelect.value = filtro;

  const filtrados = filtro === "Todos" ? productos : productos.filter(p => p.categoria === filtro);

  filtrados.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${producto.codigo}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>Precio Base Bs. ${producto.precio.toFixed(2)}</strong></p>
      <label>Selecciona presentación:</label>
      <select onchange="actualizarTotal(this, ${producto.precio})">
        <option value="1">Unidad</option>
        <option value="12">Paquete (x12)</option>
        <option value="240">Caja (x240)</option>
      </select>
      <input type="number" value="1" min="1" onchange="actualizarTotal(this.previousElementSibling, ${producto.precio})">
      <div class="total">Total: Bs. ${producto.precio.toFixed(2)}</div>
    `;
    contenedor.appendChild(div);
  });
}

function actualizarTotal(selectElem, precioBase) {
  const contenedor = selectElem.closest(".producto");
  const cantidad = parseInt(selectElem.nextElementSibling.value) || 1;
  const multip = parseInt(selectElem.value);
  const total = cantidad * multip * precioBase;
  contenedor.querySelector(".total").innerText = `Total: Bs. ${total.toFixed(2)}`;

  actualizarCarrito();
}

function actualizarCarrito() {
  const totales = document.querySelectorAll(".total");
  let suma = 0;
  totales.forEach(t => {
    const valor = parseFloat(t.innerText.replace(/[^\d.]/g, ""));
    if (!isNaN(valor)) suma += valor;
  });
  document.getElementById("totalCarrito").innerText = `Total: Bs. ${suma.toFixed(2)}`;
}

function filtrarCategoria(categoria) {
  mostrarProductos(categoria);
}

window.onload = () => {
  mostrarProductos();
};
