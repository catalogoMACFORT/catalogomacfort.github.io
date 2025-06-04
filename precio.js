const NUMERO_WHATSAPP = "59168099278"; // Tu número real

fetch("https://opensheet.vercel.app/1-7kNpYY-OjmPYSZnVAu5j9K4t8Q5pLal/Sheet1")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    data.forEach((producto, index) => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <input type="checkbox" id="producto-${index}" data-nombre="${producto["Producto"]}" data-codigo="${producto["Código"]}">
        <label for="producto-${index}">
          <strong>${producto["Producto"]} (${producto["Código"]})</strong> - Bs ${producto["Precio Base (cio + IVA)"]}
        </label>
        <br>
      `;
      contenedor.appendChild(div);
    });
  });

function enviarWhatsApp() {
  const seleccionados = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  const tipoCliente = document.getElementById("categoriaCliente").value;

  if (seleccionados.length === 0) {
    alert("Por favor selecciona al menos un producto.");
    return;
  }

  if (!tipoCliente) {
    alert("Por favor selecciona tu tipo de cliente.");
    return;
  }

