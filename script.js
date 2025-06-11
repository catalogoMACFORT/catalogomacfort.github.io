const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
const tipoCambio = 16.3;
const cantidades = { unidad: 1, paquete: 12, caja: 240 };

async function cargarCatalogo() {
  const response = await fetch(url);
  const texto = await response.text();
  const filas = texto.trim().split("\n").slice(1);

  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  filas.forEach(linea => {
    const [codigo, descripcion, precioUSD] = linea.split(",");
    const precioBase = (parseFloat(precioUSD) * tipoCambio).toFixed(2);

    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <h2>${codigo}</h2>
      <p>${descripcion}</p>
      <p><strong>Precio Base Bs. ${precioBase}</strong></p>
      <label>Selecciona presentación:</label>
      <select onchange="actualizarTotal(this)">
        <option value="unidad">Unidad</option>
        <option value="paquete">Paquete (x12)</option>
        <option value="caja">Caja (x240)</option>
      </select>
      <input type="number" value="1" min="1" onchange="actualizarTotal(this)">
      <div class="total">Total: Bs. ${precioBase}</div>
    `;
    catalogo.appendChild(card);
  });
}

function actualizarTotal(elemento) {
  const contenedor = elemento.closest(".producto");
  const tipo = contenedor.querySelector("select").value;
  const cantidad = parseInt(contenedor.querySelector("input").value) || 1;
  const textoPrecio = contenedor.querySelector("strong").innerText;
  const precioBase = parseFloat(textoPrecio.replace(/[^0-9.]/g, ""));
  const total = (precioBase * cantidades[tipo] * cantidad).toFixed(2);
  contenedor.querySelector(".total").innerText = `Total: Bs. ${total}`;
}

function filtrarCategoria(valor) {
  // Opcional: aún no implementado, placeholder
  alert("Funcionalidad en desarrollo");
}

cargarCatalogo();
