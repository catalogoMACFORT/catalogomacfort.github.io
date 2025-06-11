const tipoCambio = 16.3;
const cantidades = { unidad: 1, paquete: 12, caja: 240 };
const preciosPorTipo = ["publico", "mayorista", "distribuidor"];

async function cargarProductos() {
  const res = await fetch("productos.json");
  const productos = await res.json();
  const contenedor = document.getElementById("catalogo");

  productos.forEach((item) => {
    const div = document.createElement("div");
    div.className = "producto";
    const precioBs = (item.precioUSD * tipoCambio).toFixed(2);

    div.innerHTML = `
      <h3>${item.codigo}</h3>
      <p>${item.descripcion}</p>
      <p><strong>Precio Base Bs.</strong> ${precioBs}</p>
      <label>Selecciona presentación:</label><br/>
      <select onchange="actualizarTotal(this)">
        <option value="unidad">Unidad</option>
        <option value="paquete">Paquete (x12)</option>
        <option value="caja">Caja (x240)</option>
      </select>
      <input type="number" value="1" min="1" onchange="actualizarTotal(this)" />
      <div class="total">Total: Bs. ${precioBs}</div>
    `;
    contenedor.appendChild(div);
  });
}

function actualizarTotal(elemento) {
  const contenedor = elemento.closest(".producto");
  const tipo = contenedor.querySelector("select").value;
  const cantidad = parseInt(contenedor.querySelector("input").value);
  const precioBase = parseFloat(contenedor.querySelector("strong").nextSibling.textContent.trim());
  const mult = cantidades[tipo] || 1;
  const total = (precioBase * cantidad * mult).toFixed(2);
  contenedor.querySelector(".total").innerText = `Total: Bs. ${total}`;
}

cargarProductos();
