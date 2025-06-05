const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

async function cargarProductos() {
  const resp = await fetch(urlCSV);
  if (!resp.ok) {
    document.getElementById("productos-container").innerText = "Error al cargar productos.";
    return;
  }
  const data = await resp.text();
  mostrarProductos(parseCSV(data));
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines.shift().split(',');

  return lines.map(line => {
    const obj = {};
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); // maneja valores entre comillas
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i].replace(/(^"|"$)/g, '');
    });
    return obj;
  });
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <strong>${producto.Producto || 'Producto sin nombre'}</strong><br>
      Código: ${producto.Codigo || 'N/A'}<br>
      Precio: Bs <span class="precio">${producto.PrecioBaseBolivianos || '0.00'}</span><br>
      <img src="${producto.CodigoQR || ''}" alt="QR" style="width: 80px; float: right;" />
      <p class="nota-precio">Precio con PIN autorizado</p>
    `;

    contenedor.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
