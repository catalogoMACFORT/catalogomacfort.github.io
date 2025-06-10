const tipoCliente = localStorage.getItem("clienteTipo");
const preciosIndex = {
  distribuidor: 2,
  mayorista: 3,
  cliente: 4,
  licitacion: 5
};

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSAMPLEID/pub?output=csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.split("\n").map(r => r.split(","));
    const contenedor = document.getElementById("productos");
    rows.slice(1).forEach(prod => {
      const div = document.createElement("div");
      div.className = "producto";
      const precio = tipoCliente ? prod[preciosIndex[tipoCliente]] : "Registrarse para ver";
      div.innerHTML = `<h3>${prod[0]}</h3><p>${prod[1]}</p><strong>Precio: ${precio} Bs</strong>`;
      contenedor.appendChild(div);
    });
  });