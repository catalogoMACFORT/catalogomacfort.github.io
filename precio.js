fetch("https://opensheet.vercel.app/1-7kNpYY-OjmPYSZnVAu5j9K4t8Q5pLal/Sheet1")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    data.forEach(producto => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <h3>${producto["Producto"]} (${producto["Código"]})</h3>
        <p><strong>Procedencia:</strong> ${producto["Procedencia"]}</p>
        <p><strong>Marca:</strong> ${producto["Marca"]}</p>
        <p><strong>Precio Base + IVA:</strong> Bs ${producto["Precio Base (cio + IVA)"]}</p>
        <p><strong>Distribuidor:</strong> Bs ${producto["Distribuidor"]}</p>
        <p><strong>Mayorista:</strong> Bs ${producto["Mayorista"]}</p>
        <p><strong>Cliente Final:</strong> Bs ${producto["Cliente Finl"]}</p>
        <p><strong>Licitación:</strong> Bs ${producto["Licitación"]}</p>
        <img src="${producto["Código QR"]}" alt="QR" style="width: 100px; margin-top: 10px;">
        <hr>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error al cargar datos:", error);
    document.getElementById("lista-productos").innerHTML = "<p>Error al cargar los productos.</p>";
  });
