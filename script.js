const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const tipoCambio = 16.3;
const cantidades = { unidad: 1, paquete: 12, caja: 240 };

async function cargarCatalogo() {
  const res = await fetch(urlCSV);
  const text = await res.text();
  const lineas = text.split("\n");
  const columnas = lineas[0].split(",");

  const categorias = new Set();

  for (let i = 1; i < lineas.length; i++) {
    const fila = lineas[i].split(",");
    if (fila.length < 4) continue;
    const codigo = fila[0];
    const descripcion = fila[1];
    const precioUSD = parseFloat(fila[2]);
    const categoria = fila[3].trim();
    categorias.add(categoria);

    const precioBs = (precioUSD * tipoCambio).toFixed(2);

    const card = document.createElement("div");
    card.className = "producto";
    card.dataset.categoria = categoria;
    card.innerHTML = `
      <h3>${codigo}</h3>
      <p>${descripcion}</p>
      <p class="precio">Precio Base Bs. ${precioBs}</p>
      <label>Selecciona presentación:</label><br>
      <select onchange="actualizarTotal(this)">
        <option value="unidad">Unidad</option>
        <option value="paquete">Paquete (x12)</option>
        <option value="caja">Caja (x240)</option>
      </select>
      <input type="number" value="1" min="1" onchange="actualizarTotal(this)">
      <div class="total">Total: Bs. ${precioBs}</div>
    `;
    document.getElementById("catalogo").appendChild(card);
  }

  actualizarFiltroCategorias(Array.from(categorias));
}

function actualizarFiltroCategorias(categorias) {
  const select = document.getElementById("filtro");
  categorias.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

function actualizarTotal(elemento) {
  const contenedor = elemento.closest(".producto");
  const tipo = contenedor.querySelector("select").value;
  const cantidad = parseInt(contenedor.querySelector("input").value) || 1;
  const precioTexto = contenedor.querySelector(".precio").innerText;
  const precioBase = parseFloat(precioTexto.replace(/[^0-9.]/g, ""));
  const multiplicador = cantidades[tipo] || 1;
  const total = (precioBase * cantidad * multiplicador).toFixed(2);
  contenedor.querySelector(".total").innerText = `Total: Bs. ${total}`;
}

function filtrarCategoria() {
  const categoria = document.getElementById("filtro").value;
  const productos = document.querySelectorAll(".producto");
  productos.forEach(p => {
    p.style.display = (categoria === "Todos" || p.dataset.categoria === categoria) ? "block" : "none";
  });
}

cargarCatalogo();
