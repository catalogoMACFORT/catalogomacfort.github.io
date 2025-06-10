
document.addEventListener("DOMContentLoaded", function () {
    const tipoCliente = document.getElementById("tipoCliente");
    const formularioExtra = document.getElementById("formularioExtra");

    const pinesValidos = {
        "Distribuidor": "MACD2025",
        "Mayorista": "MACMA2025",
        "ClienteFinal": "MACF2025",
        "Licitación": "MACL2025"
    };

    tipoCliente.addEventListener("change", function () {
        const cliente = tipoCliente.value;
        if (cliente && pinesValidos[cliente]) {
            formularioExtra.innerHTML = `
                <input type="text" placeholder="Nombre completo"><br>
                <input type="text" placeholder="WhatsApp (+591...)"><br>
                <input type="text" placeholder="Ciudad o región"><br>
                <input type="text" placeholder="Empresa"><br>
                <input type="text" placeholder="Cargo que ocupa"><br>
                <input type="text" placeholder="Rubro del negocio o empresa"><br>
                <button onclick="alert('PIN enviado por WhatsApp')">Solicitar PIN por WhatsApp</button><br><br>
                <input type="password" placeholder="Ingresa el PIN que recibiste"><br>
                <button onclick="mostrarCatalogo('${cliente}')">Ingresar</button>
            `;
        } else {
            formularioExtra.innerHTML = "";
        }
    });
});

function mostrarCatalogo(cliente) {
    document.body.innerHTML += `
        <h2>Bienvenido. Aquí verás los productos con precios para ${cliente}.</h2>
        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pubhtml?widget=true&amp;headers=false" width="100%" height="600"></iframe>
    `;
}
