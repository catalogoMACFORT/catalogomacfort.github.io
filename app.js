
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

let tipoCliente = '';
let preciosColumnas = {
    distribuidor: "Precio Distribuidor",
    mayorista: "Precio Mayorista",
    cliente_final: "Precio Final",
    licitacion: "Precio Licitación"
};

function solicitarPIN() {
    tipoCliente = document.getElementById("tipoCliente").value;
    if (!tipoCliente) {
        alert("Seleccione un tipo de cliente");
        return;
    }
    window.open("https://wa.me/59168099278?text=Hola,%20solicito%20mi%20PIN%20MACFORT%20para%20cliente%20" + tipoCliente, "_blank");
    document.getElementById("ingresoPIN").style.display = "block";
}

function verificarPIN() {
    const pinIngresado = document.getElementById("pin").value;
    if (pinIngresado === "MACFORT2025") {
        document.getElementById("catalogo").style.display = "block";
        cargarCatalogo();
    } else {
        alert("PIN incorrecto. Solicítalo por WhatsApp.");
    }
}

async function cargarCatalogo() {
    const response = await fetch(CSV_URL);
    const data = await response.text();
    const filas = data.split("\n");
    const headers = filas[0].split(",");
    const productos = filas.slice(1).map(fila => fila.split(","));

    const contenedor = document.getElementById("productosContainer");
    contenedor.innerHTML = "";

    productos.forEach(prod => {
        const codigo = prod[0];
        const descripcion = prod[1];
        const unidad = prod[2];
        const precio = prod[headers.indexOf(preciosColumnas[tipoCliente])];

        const card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
            <h4>${codigo}</h4>
            <p>${descripcion}</p>
            <p><strong>Unidad:</strong> ${unidad}</p>
            <p><strong>Precio:</strong> Bs ${precio}</p>
        `;
        contenedor.appendChild(card);
    });
}
