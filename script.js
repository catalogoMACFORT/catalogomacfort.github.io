const productosEjemplo = [
  { codigo: "MF-503", descripcion: "Escalera Multipropósito 4x3", precio: 650.37, categoria: "Escaleras" },
  { codigo: "MF-504", descripcion: "Escalera Multipropósito 4x4", precio: 768.71, categoria: "Escaleras" },
  { codigo: "MF-505", descripcion: "Escalera Multipropósito 4x5", precio: 884.89, categoria: "Escaleras" },
  { codigo: "MF-506", descripcion: "Escalera Multipropósito 4x6", precio: 1001.08, categoria: "Escaleras" }
];

const carrito = [];
const cantidades = { unidad: 1, paquete: 12, caja: 240 };

function cargarCatalogo() {
  const contenedor = document.getElementById("productos");
  const filtro = document.getElementById("filtroCategoria");

  // Llenar filtro con categorías únicas
  const categorias = ["Todos", ...new Set(productosEjemplo.map(p => p.categoria))];
  categorias.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.innerText = cat;
    filtro.appendChild(opt);
  });

  filtro.addEventListener("change", () => renderizarCatalogo(filtro.value));
  renderizarCatalogo("Todos");
}

function renderizarCatalogo(categoria) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productosEjemplo
    .filter(p => categoria === "Todos" || p.categoria === categoria)
    .forEach(producto => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <h3>${producto.codigo}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>Precio Base Bs. ${producto.precio.toFixed(2)}</strong></p>
        <label>Selecciona presentación:</label>
        <select class="presentacion">
          <option value="unidad">Unidad</option>
          <option value="paquete">Paquete</option>
          <option value="caja">Caja</option>
        </select>
        <input type="number" min="1" value="1" class="cantidad" />
        <button onclick="agregarAlCarrito('${producto.codigo}')">Añadir</button>
      `;
      contenedor.appendChild(div);
    });
}

function agregarAlCarrito(codigo) {
  const productos = document.querySelectorAll(".producto");
  productos.forEach(div => {
    if (div.querySelector("h3").innerText === codigo) {
      const presentacion = div.querySelector(".presentacion").value;
      const cantidad = parseInt(div.querySelector(".cantidad").value);
      const item = productosEjemplo.find(p => p.codigo === codigo);
      const multiplicador = cantidades[presentacion];
      const total = item.precio * cantidad * multiplicador;

      carrito.push({ codigo, descripcion: item.descripcion, total });
    }
  });
  actualizarCarrito();
}

function actualizarCarrito() {
  const total = carrito.reduce((sum, p) => sum + p.total, 0);
  document.getElementById("total").innerText = `Total: Bs. ${total.toFixed(2)}`;
}

window.onload = cargarCatalogo;
