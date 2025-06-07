
document.getElementById('tipoCliente').addEventListener('change', () => {
  document.getElementById('formularioSecreto').classList.remove('oculto');
});

document.getElementById('formularioDatos').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const ciudad = document.getElementById('ciudad').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const cargo = document.getElementById('cargo').value.trim();
  const rubro = document.getElementById('rubro').value.trim();
  const tipoCliente = document.getElementById('tipoCliente').value;

  if (!nombre || !whatsapp || !ciudad || !cargo || !rubro || !tipoCliente) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  const mensaje = `Hola, soy ${nombre}, soy ${cargo} en ${empresa || 'mi negocio'} ubicado en ${ciudad}. Me interesa ver precios como ${tipoCliente}. Mi rubro: ${rubro}. Mi número es: ${whatsapp}`;
  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  const pin = prompt(`Hola ${nombre}, por favor ingresa el PIN que recibiste por WhatsApp:`);

  const pinesValidos = {
    "Distribuidor": "MACD2025",
    "Mayorista": "MACMA2025",
    "ClienteFinal": "MACF2025",
    "Licitación": "MACL2025"
  };

  if (pin === pinesValidos[tipoCliente]) {
    document.getElementById('accesoProductos').classList.remove('oculto');
    document.getElementById('accesoProductos').innerHTML = `
      <h2>Bienvenido, ${nombre}</h2>
      <p>Aquí verás los productos con sus precios para <strong>${tipoCliente}</strong>.</p>
    `;
  } else {
    alert("❌ PIN incorrecto para el tipo seleccionado.");
  }
});
