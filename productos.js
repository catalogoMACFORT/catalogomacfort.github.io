document.addEventListener("DOMContentLoaded", () => {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const productos = csvToArray(data);
      mostrarProductos(productos);
    })
    .catch(error => {
      document.querySelector("#contenedor-productos").innerHTML = "<p style='color:red;'>❌ Error al cargar productos. Revisa el enlace del CSV o la estructura.</p>";
      console.error("Error al cargar el catálogo:", error);
    });
});

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  return rows
    .map(row => {
      const values = row.split(delimiter);
      const item = {};
      headers.forEach((header, index) => {
        item[header.trim()] = values[index] ? values[index].trim() : "";
      });
      return item;
    })
    .filter(item => item.Código && item["Producto"]);
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const precioBase = parseFloat(producto["Precio Base (usd)"]);
    const tipoCambio = 16.33; // editable dinámicamente si deseas vincular a Google Sheets o usar fetch
    const precioBs = (precioBase * tipoCambio).toFixed(2);

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    const imagenURL = `https://api.dicebear.com/7.x/icons/svg?seed=${producto.Código || "producto"}`; // Imagen temporal por código

    tarjeta.innerHTML = `
      <img src="${imagenURL}" alt="QR" class="qr-imagen">
      <div class="info">
        <h3>${producto.Producto}</h3>
        <p><strong>Código:</strong> ${producto.Código}</p>
        <p><strong>Procedencia:</strong> ${producto.Procedencia}</p>
        <p><strong>Marca:</strong> ${producto.Marca}</p>
        <p class="precio">Precio: <span class="ocultar-precio">🔒 Precio con PIN autorizado</span><span class="mostrar-precio" style="display:none;">Bs ${precioBs}</span></p>
        <button onclick="mostrarPrecio('${producto.Código}')">🔑 Ingresar PIN</button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function mostrarPrecio(codigo) {
  const pin = prompt("Introduce el PIN de acceso:");
  const pinDistribuidor = "DISTRIB123";
  const pinMayorista = "MAYOR123";
  const pinFinal = "FINAL123";
  const pinLicitacion = "LICIT123";

  if (
    pin === pinDistribuidor ||
    pin === pinMayorista ||
    pin === pinFinal ||
    pin === pinLicitacion
  ) {
    const tarjetas = document.querySelectorAll(".tarjeta-producto");
    tarjetas.forEach(tarjeta => {
      if (tarjeta.innerHTML.includes(codigo)) {
        tarjeta.querySelector(".ocultar-precio").style.display = "none";
        tarjeta.querySelector(".mostrar-precio").style.display = "inline";
      }
    });
  } else {
    alert("PIN inválido.");
  }
}
