
document.addEventListener('DOMContentLoaded', () => {
  const tipoCliente = document.getElementById('tipoCliente');
  const formularioSecreto = document.getElementById('formularioSecreto');
  const formulario = document.getElementById('formularioDatos');
  const bienvenida = document.getElementById('bienvenida');

  const pinesValidos = {
    "Distribuidor": "MACD2025",
    "Mayorista": "MACMA2025",
    "ClienteFinal": "MACF2025",
    "Licitación": "MACL2025"
  };

  tipoCliente.addEventListener('change', () => {
    if (tipoCliente.value) {
      formularioSecreto.classList.remove('oculto');
    } else {
      formularioSecreto.classList.add('oculto');
    }
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const ciudad = document.getElementById('ciudad').value;
    const empresa = document.getElementById('empresa').value;
    const cargo = document.getElementById('cargo').value;
    const rubro = document.getElementById('rubro').value;
    const tipo = tipoCliente.value;

    const url = `https://wa.me/59168099278?text=Hola, soy ${nombre} de ${ciudad} (${empresa}), cargo: ${cargo}, rubro: ${rubro}. Solicito mi PIN para el catálogo como ${tipo}.`;
    window.open(url, '_blank');

    const pin = prompt(`Hola ${nombre}, por favor ingresa el PIN que recibiste por WhatsApp:`);

    if (pin === pinesValidos[tipo]) {
      formularioSecreto.classList.add('oculto');
      bienvenida.classList.remove('oculto');
      bienvenida.innerHTML = `<h2>Bienvenido, ${nombre} . Aquí verás los productos con sus precios para <strong>${tipo}</strong>.</h2>`;
    } else {
      alert("❌ PIN incorrecto para el tipo seleccionado.");
    }
  });
});
