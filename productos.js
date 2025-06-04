const hojaPublicadaURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv';

const tipoCambioCelda = 'Tipo de Cambio'; // Nombre de columna exacto en Google Sheet

const contenedor = document.getElementById("contenedor-productos");

fetch(hojaPublicadaURL)
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").map(f => f.split(","));
    const encabezados = filas[0];
    const productos = filas.slice(1).map(fila => {
      const item = {};
      encabezados.forEach((clave, i) => item[clave.trim()] = fila[i]);
      return item;
    });

    const tipoCambioFila = productos.find(p => p["Código"] === tipoCambioCelda);
    const tipoCambio = tipoCambioFila ? parseFloat(tipoCambioFila["Precio Base USD"]) : 7.15;

    productos.filter(p => p["Código"] !== tipoCambioCelda).forEach(prod => {
      const div = document.createElement("div");
      div.className = "producto";

      const img = document.createElement("img");
      img.src = prod["Imagen"] || "https://via.placeholder.com/100";
      img.alt = prod["Producto"];
      div.appendChild(img);

      const info = document.createElement("div");
      info.className = "info";

      const nombre = document.createElement("strong");
      nombre.innerText = prod["Producto"];
      info.appendChild(nombre);

      info.innerHTML += `<br>Código: ${prod["Código"]}`;
      
      const precioFinal = (parseFloat(prod["Precio Base USD"]) * tipoCambio).toFixed(2);
      info.innerHTML += `<br><span class="precio oculto" id="precio-${prod["Código"]}">Bs ${precioFinal}</span>`;
      info.innerHTML += `<br><span class="pin-alerta">Precio con PIN autorizado</span>`;
      div.appendChild(info);

      const qr = document.createElement("img");
      qr.className = "qr";
      qr.alt = "QR";
      qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${prod["Código"]}%20${prod["Producto"]}%20MACFORT`;
      div.appendChild(qr);

      contenedor.appendChild(div);
    });
  });

// Mostrar precios con PIN correcto
const urlParams = new URLSearchParams(window.location.search);
const pin = urlParams.get('pin');

// Lista de PIN válidos (simulados)
const pines = {
  distribuidor: "D123",
  mayorista: "M123",
  final: "F123",
  licitacion: "L123"
};

if (Object.values(pines).includes(pin)) {
  document.querySelectorAll(".precio").forEach(p => p.classList.remove("oculto"));
  document.querySelectorAll(".pin-alerta").forEach(p => p.remove());
}
