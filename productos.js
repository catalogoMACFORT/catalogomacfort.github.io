const googleSheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

// Valor predeterminado del tipo de cambio (se puede actualizar desde la hoja)
let tipoCambio = 1;

// Almacenar datos del catálogo
let productosData = [];

// Obtener datos CSV desde Google Sheets
fetch(googleSheetURL)
  .then((response) => response.text())
  .then((data) => {
    const filas = data.split("\n").map((row) => row.split(","));
    const headers = filas.shift();

    tipoCambio = parseFloat(headers[headers.length - 1]); // Última columna = tipo de cambio
    productosData = filas.map((fila) => {
      const item = {};
      headers.forEach((header, i) => {
        item[header.trim()] = fila[i]?.trim() || "";
      });
      return item;
    });

    mostrarProductos(productosData);
  })
  .catch((error) => console.error("Error al cargar datos:", error));

function mostrarProductos(data) {
  const contenedor = document.getElementById("productos-contenedor");
  contenedor.innerHTML = "";

  data.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    const nombre = producto["Nombre"] || "Producto sin nombre";
    const descripcion = producto["Descripción"] || "";
    const imagen = producto["Imagen"] || "https://via.placeholder.com/200x200?text=Imagen+no+disponible";

    div.innerHTML = `
      <img src="${imagen}" alt="${nombre}">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <button onclick="enviarWhatsApp('${nombre}', 'Distribuidor')">Cliente Distribuidor</button>
      <button onclick="enviarWhatsApp('${nombre}', 'Mayorista')">Cliente Mayorista</button>
      <button onclick="enviarWhatsApp('${nombre}', 'Final')">Cliente Final</button>
      <button onclick="enviarWhatsApp('${nombre}', 'Licitación')">Cliente en Licitaciones y Otros</button>
    `;

    contenedor.appendChild(div);
  });
}

function enviarWhatsApp(nombreProducto, tipoCliente) {
  const numero = "59168099278"; // Tu número de WhatsApp
  const mensaje = `Hola, estoy interesado en el producto: *${nombreProducto}* como *Cliente ${tipoCliente}*. 
¿Podrías proporcionarme el PIN para ver precios?\n\n🔍 También estoy dispuesto a registrar mis datos comerciales.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
