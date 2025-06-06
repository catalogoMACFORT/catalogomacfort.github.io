
const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const pins = {
  "1234": "Distribuidor",
  "5678": "Mayorista",
  "9999": "Cliente Final",
  "0000": "Licitación"
};

function verificarPIN() {
  const pin = document.getElementById("pinInput").value;
  if (pins[pin]) {
    document.getElementById("login").style.display = "none";
    document.getElementById("contenido").style.display = "block";
    cargarCatalogo(pin);
  } else {
    alert("PIN incorrecto");
  }
}

function cargarCatalogo(pin) {
  fetch(URL_CSV)
    .then(response => response.text())
    .then(data => {
      const filas = data.trim().split("\n").map(linea => linea.split(","));
      const tabla = document.getElementById("catalogo");
      const headers = filas[0];
      const tipoCliente = pins[pin];

      let html = "<tr>";
      headers.forEach(header => html += `<th>${header}</th>`);
      html += "</tr>";

      for (let i = 1; i < filas.length; i++) {
        html += "<tr>";
        filas[i].forEach(columna => html += `<td>${columna}</td>`);
        html += "</tr>";
      }

      tabla.innerHTML = html;
    });
}
