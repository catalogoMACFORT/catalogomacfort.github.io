const productos = [
  { codigo: "MF-503", descripcion: "Escalera Multipropósito 4x3", precioUSD: 39.9, categoria: "Escaleras" },
  { codigo: "MF-504", descripcion: "Escalera Multipropósito 4x4", precioUSD: 47.2, categoria: "Escaleras" },
  { codigo: "MF-505", descripcion: "Escalera Multipropósito 4x5", precioUSD: 54.3, categoria: "Escaleras" },
  { codigo: "MF-506", descripcion: "Escalera Multipropósito 4x6", precioUSD: 61.4, categoria: "Escaleras" }
];

const tipoCambio = 16.3;
const cantidades = {
  unidad: 1,
  paquete: 12,
  caja: 240
};

function cargarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  const categoriaSet = new Set(["Todos"]);

  productos.forEach(prod => {
    categoriaSet.add(prod.categoria);

    const precioBs = (prod.precioUSD * tipoCambio).toFixed(2);
    const contenedor = document.createElement("div");
    contenedor.className = "producto";
    contenedor.innerHTML = `
      <h3>${prod.codigo}</h3>
      <p>${prod.descripcion}</p>
      <p class="precio">Precio Base Bs. ${precioBs}</p>
      <label>Selecciona presentación:</label>
      <select onchange="actualizarTotal(this)">
        <option value="unidad">Unidad</option>
        <option value="paquete">Paquete (x12)</option>
        <option value="caja">Caja (x240)</option>
      </select>
      <input type="number" min="1" value="1" onchange="actualizarTotal(this)" />
      <div class="total">Total: Bs. ${precioBs}</div>
    `;
    catalogo.appendChild(contenedor);
  });

  const filtro = document.getElementById("filtroCategoria");
  filtro.innerHTML = "";
  categoriaSet.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtro.appendChild(option);
  });
}

function actualizarTotal(elemento) {
  const contenedor = elemento.closest(".producto");
  const select = contenedor.querySelector("select").value;
  const cantidad = parseInt(contenedor.querySelector("input").value) || 1;
  const precioBs = parseFloat(contenedor.querySelector(".precio").textContent.replace(/[^0-9.]/g, ''));
  const total = (precioBs * cantidades[select] * cantidad).toFixed(2);
  contenedor.querySelector(".total").innerText = `Total: Bs. ${total}`;
}

function filtrarCategoria() {
  const seleccion = document.getElementById("filtroCategoria").value;
  if (seleccion === "Todos") {
    cargarCatalogo();
  } else {
    const filtrados = productos.filter(p => p.categoria === seleccion);
    mostrarFiltrados(filtrados);
  }
}

function mostrarFiltrados(lista) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";
  lista.forEach(prod => {
    const precioBs = (prod.precioUSD * tipoCambio).toFixed(2);
    const contenedor = document.createElement("div");
    contenedor.className = "producto";
    contenedor.innerHTML = `
      <h3>${prod.codigo}</h3>
      <p>${prod.descripcion}</p>
      <p class="precio">Precio Base Bs. ${precioBs}</p>
      <label>Selecciona presentación:</label>
      <select onchange="actualizarTotal(this)">
        <option value="unidad">Unidad</option>
        <option value="paquete">Paquete (x12)</option>
        <option value="caja">Caja (x240)</option>
      </select>
      <input type="number" min="1" value="1" onchange="actualizarTotal(this)" />
      <div class="total">Total: Bs. ${precioBs}</div>
    `;
    catalogo.appendChild(contenedor);
  });
}

window.onload = cargarCatalogo;
