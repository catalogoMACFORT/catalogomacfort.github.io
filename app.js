
function solicitarPin() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    if (!nombre || !telefono) {
        alert("Por favor, llena tus datos.");
        return;
    }
    const tipo = document.getElementById('tipo-cliente').value;
    const mensaje = `Hola, soy ${nombre}. Quiero solicitar el PIN para el catálogo MACFORT 2025 como ${tipo}.`;
    window.open(`https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`, '_blank');
    document.getElementById('ingreso-pin').classList.remove('oculto');
}

function validarPin() {
    const pin = document.getElementById('pin').value;
    if (pin === "1234") {
        alert("PIN correcto. Accediendo al catálogo...");
        document.getElementById('productos').classList.remove('oculto');
    } else {
        alert("PIN incorrecto.");
    }
}

document.getElementById('tipo-cliente').addEventListener('change', function () {
    if (this.value !== "") {
        document.getElementById('registro-datos').classList.remove('oculto');
    } else {
        document.getElementById('registro-datos').classList.add('oculto');
        document.getElementById('ingreso-pin').classList.add('oculto');
        document.getElementById('productos').classList.add('oculto');
    }
});
