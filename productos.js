const tipoCambio = 16.33; // tipo de cambio que puedes actualizar manualmente
const productos = [
  {
    nombre: "Escalera Multipropósito Reforzada 4x3",
    codigo: "MF-503",
    precioUSD: 39.9,
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Escalera Multipropósito Reforzada 4x4",
    codigo: "MF-504",
    precioUSD: 47.16,
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Escalera Multipropósito Reforzada 4x5",
    codigo: "MF-505",
    precioUSD: 54.288,
    imagen: "https://via.placeholder.com/100",
  },
  {
    nombre: "Escalera Multipropósito Reforzada 4x6",
    codigo: "MF-506",
    precioUSD: 61.416,
    imagen: "https://via.placeholder.com/100",
  },
];

const contenedor = document.getElementById("contenedor-productos");

productos.forEach(prod => {
  const precioBs = (prod.precioUSD * tipoCambio).toFixed(2);

  const card = document.createElement("div");
  card.className = "producto";
  card.innerHTML = `
    <div class="info">
      <h3>${prod.nombre}</h3>
      <p><strong>Código:</strong> ${prod.codigo}</p>
      <p><strong>Precio:</strong> <span class="oculto">Bs ${precioBs}</span></p>
      <p class="pin-alerta">Precio con PIN autorizado</p>
    </div>
    <img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(prod.codigo + ' ' + prod.nombre)}" alt="QR">
  `;
  contenedor.appendChild(card);
});
