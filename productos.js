const contenedor = document.getElementById("contenedor-productos");
const hojaCSV = "catálogo_macfort_2025.csv";

fetch(hojaCSV)
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").slice(1);
    filas.forEach(fila => {
      const columnas = fila.split(",");

      const codigo = columnas[0]?.trim();
      const nombre = columnas[1]?.trim();
      const precioBase = parseFloat(columnas[5]) || 0;
      const imagenURL = columnas[12]?.trim() || `https://via.placeholder.com/150?text=${nombre.replace(/ /g, "+")}`;
      const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codigo}%20${nombre}%20MACFORT`;

      const producto = document.createElement("div");
      producto.classList.add("producto");

      producto.innerHTML = `
        <img src="${imagenURL}" alt="${nombre}" class="imagen-producto">
        <div class="info">
          <strong>${nombre}</strong><br>
          Código: ${codigo}<br>
          <span class="precio oculto" id="precio-${codigo}">Precio: 🔒 PIN requerido</span><br>
          <button onclick="solicitarAccesoProducto('${codigo}')">Ver precio</button>
        </div>
        <img src="${qrURL}" alt="QR ${codigo}" class="qr">
      `;

      contenedor.appendChild(producto);
    });
  });
