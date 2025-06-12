let productos = [];
let tipoCambio = 16.3;

async function cargarProductos() {
  const res = await fetch('productos.json');
  productos = await res.json();
  mostrarProductos(productos);
  cargarCategorias(productos);
}

function mostrarProductos(lista) {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';
  lista.forEach(p => {
    const precioBs = (p.precioUSD * tipoCambio).toFixed(2);
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <h3>${p.codigo}</h3>
      <p>${p.nombre}</p>
      <p><strong>Precio Base Bs. ${precioBs}</strong></p>
      <label>Selecciona presentación:</label>
      <select onchange="calcularTotal(this, ${precioBs})">
        <option value="1">Unidad</option>
        <option value="12">Paquete (x12)</option>
        <option value="240">Caja (x240)</option>
      </select>
      <input type="number" value="1" min="1" onchange="calcularTotal(this.previousElementSibling, ${precioBs})">
      <p class="total">Total: Bs. ${precioBs}</p>
    `;
    catalogo.appendChild(div);
  });
}

function calcularTotal(select, precioBase) {
  const cantidad = parseInt(select.nextElementSibling.value) || 1;
  const multiplicador = parseInt(select.value);
  const total = (precioBase * cantidad * multiplicador).toFixed(2);
  select.parentElement.querySelector('.total').innerText = `Total: Bs. ${total}`;
  document.getElementById('total').innerText = `Total: Bs. ${total}`;
}

function cargarCategorias(lista) {
  const select = document.getElementById('filtroCategoria');
  const categorias = [...new Set(lista.map(p => p.categoria))];
  categorias.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.textContent = c;
    select.appendChild(option);
  });
}

function filtrarCategoria(categoria) {
  if (categoria === "Todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

cargarProductos();
