
const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

const PINES = {
    distribuidor: "MACD2025",
    mayorista: "MACM2025",
    final: "MACF2025",
    licitacion: "MACL2025"
};

let tipoSeleccionado = null;

function seleccionarCliente(tipo) {
    const pin = prompt("🔐 Ingrese su PIN para acceder a precios personalizados:");
    if (pin === PINES[tipo]) {
        tipoSeleccionado = tipo;
        cargarProductos();
    } else {
        alert("PIN incorrecto o no autorizado.");
    }
}

function cargarProductos() {
    fetch(URL_CSV)
        .then(res => res.text())
        .then(csv => {
            const filas = csv.split("\n").slice(1);
            const contenedor = document.getElementById("contenedor-productos");
            contenedor.innerHTML = "";

            filas.forEach(fila => {
                const columnas = fila.split(",");
                const [codigo, producto, , marca, procedencia, urlQR, imagenURL, pinDistribuidor, pinMayorista, pinFinal, pinLicitacion] = columnas;
                let precio = "";

                if (tipoSeleccionado === "distribuidor") precio = pinDistribuidor;
                if (tipoSeleccionado === "mayorista") precio = pinMayorista;
                if (tipoSeleccionado === "final") precio = pinFinal;
                if (tipoSeleccionado === "licitacion") precio = pinLicitacion;

                const card = `
                    <div class="producto">
                        <img src="${imagenURL}" alt="${producto}" />
                        <div class="info">
                            <h2>${producto}</h2>
                            <p><strong>Código:</strong> ${codigo}</p>
                            <p><strong>Marca:</strong> ${marca}</p>
                            <p><strong>Procedencia:</strong> ${procedencia}</p>
                            <p><strong>Precio:</strong> Bs ${parseFloat(precio).toFixed(2)}</p>
                            <p class="nota">*Precio personalizado según tipo de cliente</p>
                        </div>
                        <img src="${urlQR}" class="qr" alt="QR" />
                    </div>
                `;
                contenedor.innerHTML += card;
            });
        });
}
