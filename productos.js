// productos.js

const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv"; const tipoCambio = 16.33; // Editable desde Google Sheet si lo conectas dinámicamente const tipoCliente = "final"; // Este valor cambiará según el PIN

fetch(urlCSV) .then(res => res.text()) .then(data => { const productos = parseCSV(data); renderizarProductos(productos); }) .catch(err => { document.getElementById("contenedor-productos").innerHTML = "<p>Error al cargar productos. Revisa el enlace CSV.</p>"; console.error(err); });

function parseCSV(data) { const filas = data.split("\n").slice(1); return filas.map(linea => { const [codigo, nombre, baseUSD, , , , , , , , , , , , , qrBase64] = linea.split(","); const precio = parseFloat(baseUSD) * tipoCambio; return { codigo: codigo.trim(), nombre: nombre.trim(), precio: isNaN(precio) ? 0 : precio.toFixed(2), qr: qrBase64.includes("data:image") ? qrBase64 : https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}, }; }); }

function renderizarProductos(productos) { const contenedor = document.getElementById("contenedor-productos"); contenedor.innerHTML = "";

productos.forEach(prod => { const div = document.createElement("div"); div.className = "tarjeta-producto";

div.innerHTML = `
  <div class="contenido-producto">
    <h3>${prod.nombre}</h3>
    <p><strong>Código:</strong> ${prod.codigo}</p>
    <p class="precio">Precio: ${tipoCliente === 'final' ? `Bs ${prod.precio}` : `<span class='pin-requerido'>Precio con PIN autorizado</span>`}</p>
  </div>
  <div class="qr-contenedor">
    <img src="${prod.qr}" alt="QR">
  </div>
`;
contenedor.appendChild(div);

}); }

                                                                                    
