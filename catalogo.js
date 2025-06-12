const productos = [
  {
    codigo: "MF-001",
    nombre: "Escalera Aluminio 2x10",
    precios: {
      publico: 2500,
      mayorista: 2300,
      distribuidor: 2200,
      afiliado: 2100
    }
  },
  {
    codigo: "MF-002",
    nombre: "Malla Electrosoldada",
    precios: {
      publico: 580,
      mayorista: 550,
      distribuidor: 520,
      afiliado: 500
    }
  }
];

const carrito = [];
const tipoClienteSelect = document.getElementById("tipoCliente");
const productosDiv = document.getElementById("productos");
const carritoUl = document.getElementById("carrito");
const totalFinalDiv = document.getElementById("totalFinal");

function renderProductos() {
  productosDiv.innerHTML = "";
  const tipo = tipoClienteSelect.value;

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Precio (${tipo}): Bs ${p.precios[tipo]}<br>
      <button onclick="agregarCarrito('${p.codigo}')">Agregar</button>
    `;
    productosDiv.appendChild(div);
  });
}

function agregarCarrito(codigo) {
  const tipo = tipoClienteSelect.value;
  const producto = productos.find(p => p.codigo === codigo);
  carrito.push({ nombre: producto.nombre, precio: producto.precios[tipo] });
  renderCarrito();
}

function renderCarrito() {
  carritoUl.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - Bs ${item.precio}`;
    carritoUl.appendChild(li);
    total += item.precio;
  });

  // Descuento si es sin factura
  const sinFactura = confirm("¿La venta es sin factura?");
  const descuento = sinFactura ? 0.01 : 0;
  const totalConDescuento = total * (1 - descuento);

  totalFinalDiv.innerHTML = `
    <strong>Total:</strong> Bs ${total.toFixed(2)}<br>
    ${sinFactura ? `<strong>Descuento por venta sin factura:</strong> 1%<br>` : ""}
    <strong>Total Final:</strong> Bs ${totalConDescuento.toFixed(2)}
  `;
}

// Inicial
tipoClienteSelect.addEventListener("change", renderProductos);
renderProductos();
