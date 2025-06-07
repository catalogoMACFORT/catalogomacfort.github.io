
const pinesValidos = {
  "Distribuidor":"MACD2025",
  "Mayorista":"MACMA2025",
  "ClienteFinal":"MACF2025",
  "Licitación":"MACL2025"
};

document.getElementById('tipoCliente').addEventListener('change', function () {
  const formulario = document.getElementById('formularioAcceso');
  formulario.classList.remove('oculto');
});

function solicitarPin() {
  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const tipoCliente = document.getElementById('tipoCliente').value;

  if (!nombre || !whatsapp || !tipoCliente) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const pin = prompt(`Hola ${nombre} , por favor ingresa el PIN que recibiste por WhatsApp:`);

  if (pin === pinesValidos[tipoCliente]) {
    document.getElementById('formularioAcceso').classList.add('oculto');
    const bienvenida = document.getElementById('bienvenida');
    bienvenida.innerHTML = `<h2>Bienvenido, ${nombre}. Aquí verás los productos con sus precios para <strong>${tipoCliente}</strong>.</h2>`;
    bienvenida.classList.remove('oculto');
  } else {
    alert('PIN incorrecto para el tipo seleccionado.');
  }
}
