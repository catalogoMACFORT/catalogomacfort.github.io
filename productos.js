document.addEventListener("DOMContentLoaded", function () {
  Papa.parse("catálogo_macfort_2025.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const productos = results.data;
      const contenedor = document.getElementById("lista-productos");
      if (!contenedor) return;

      contenedor.innerHTML = "";

      productos.forEach((item) => {
        if (!item.Código || !item.Producto) return;

        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <img src="https://via.placeholder.com/100" alt="${item.Producto}">
          <div class="info">
            <strong>${item.Producto}</strong><br>
            Código: ${item.Código}<br>
            Procedencia: ${item.Procedencia}<br>
            Marca: ${item.Marca}<br>
            Unidad: ${item.Unidad}<br>
            Precio Base: $${item["Precio Base (USD)"]}<br>
            <span class="precio">Bs ${item["Distribuidor (con IVA)"]}</span>
          </div>
          <img class="qr" src="${item["Código QR"]}" alt="QR">
        `;
        contenedor.appendChild(div);
      });
    },
    error: function (err) {
      console.error("Error al leer el CSV:", err);
    },
  });
});
