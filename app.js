
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const precios = {
  mayorista: 0.80,
  distribuidor: 0.85,
  ferreteria: 0.90,
  particular: 1.00
};

const pins = {
  mayorista: "MAC001",
  distribuidor: "MAC002",
  ferreteria: "MAC003",
  particular: "MAC004"
};

let tipoClienteSeleccionado = null;

document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();
  const tipo = document.getElementById("tipoCliente").value;
  const pin = document.getElementById("pin").value;
  if (pins[tipo] && pins[tipo] === pin) {
    tipoClienteSeleccionado = tipo;
    localStorage.setItem("cliente_tipo", tipo);
    cargarCatalogo();
  } else {
    alert("PIN incorrecto para el tipo de cliente seleccionado.");
  }
});

async function cargarCatalogo() {
  const res = await fetch(csvUrl);
  const data = await res.text();
  const rows = data.split("\n").slice(1);
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  rows.forEach(row => {
    const cols = row.split(",");
    const codigo = cols[0];
    const desc = cols[1];
    const unidad = cols[2];
    const precioUSD = parseFloat(cols[3]);
    const precioBOB = Math.round(precioUSD * 7 * precios[tipoClienteSeleccionado]);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${codigo}</strong><p>${desc}</p><p>${unidad}</p><p><b>${precioBOB} Bs</b></p>`;
    contenedor.appendChild(card);
  });
}

// Autologin si ya se guardó en localStorage
window.onload = () => {
  const tipo = localStorage.getItem("cliente_tipo");
  if (tipo) {
    tipoClienteSeleccionado = tipo;
    cargarCatalogo();
  }
};
