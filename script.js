document.getElementById('formularioDatos').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const ciudad = document.getElementById('ciudad').value;
  const empresa = document.getElementById('empresa').value;
  const cargo = document.getElementById('cargo').value;
  const rubro = document.getElementById('rubro').value;
  const tipoCliente = document.getElementById('tipoCliente').value;

  const mensaje = `Hola, soy ${nombre}.\nSoy del tipo de cliente: ${tipoCliente}.\nCiudad: ${ciudad}.\nEmpresa: ${empresa}.\nCargo: ${cargo}.\nRubro: ${rubro}.\nMi número de WhatsApp: ${whatsapp}.\nSolicito el PIN para acceder al catálogo.`;

  const numeroAdmin = '59168099278';
  const url = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, '_blank');
});
