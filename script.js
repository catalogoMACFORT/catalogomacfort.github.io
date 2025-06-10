function solicitarPin() {
    const whatsapp = document.getElementById("whatsapp").value;
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipoCliente").value;
    const mensaje = `Hola, soy ${nombre}, necesito el PIN como cliente ${tipo}.`;
    const url = `https://wa.me/59161158355?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

function verificarPin() {
    const pin = document.getElementById("pin").value;
    const tipo = document.getElementById("tipoCliente").value;

    const pines = {
        "Distribuidor": "MACD2025",
        "Mayorista": "MACMA2025",
        "ClienteFinal": "MACF2025",
        "Licitación": "MACL2025"
    };

    if (pin === pines[tipo]) {
        document.getElementById("catalogo").style.display = "block";
        document.getElementById("formulario-acceso").style.display = "none";
        cargarProductos();
    } else {
        alert("PIN incorrecto. Solicítalo por WhatsApp.");
    }
}

function cargarProductos() {
    const productos = [
        { codigo: "MF-503", descripcion: "Escalera", unidad: "1u", precio: "650 Bs" },
        { codigo: "MF-504", descripcion: "Escalera", unidad: "1u", precio: "768 Bs" },
        { codigo: "MF-505", descripcion: "Escalera", unidad: "1u", precio: "884 Bs" }
    ];

    let html = "";
    productos.forEach(p => {
        html += `<div class="tarjeta">
            <h3>${p.descripcion}</h3>
            <p><strong>Código:</strong> ${p.codigo}</p>
            <p><strong>Unidad:</strong> ${p.unidad}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
        </div>`;
    });

    document.getElementById("productos").innerHTML = html;
}
