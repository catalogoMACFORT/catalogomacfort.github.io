// productos.js FINAL para catalogomacfort.github.io mejorado const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv'; const contenedor = document.getElementById('contenedor-productos'); const tipoCambio = 16.33;

let tipoCliente = localStorage.getItem('tipo_cliente') || ''; let pinCliente = localStorage.getItem('pin_cliente') || ''; let categoriaSeleccionada = localStorage.getItem('categoria_filtro') || ''; let textoBusqueda = localStorage.getItem('busqueda') || '';

const PINES = { distribuidor: 'MACD2025', mayorista: 'MACM2025', final: 'MACF2025', licitacion: 'MACL2025' };

async function cargarProductos() { try { const res = await fetch(CSV_URL); const data = await res.text(); const filas = data.split("\n").slice(1); const categorias = new Set(); contenedor.innerHTML = '';

filas.forEach(fila => {
  const columnas = fila.split(',');
  const [codigo, nombre, precioUSD, marca, categoria, urlQR, imagenURL, pinDist, pinMay, pinFinal, pinLici] = columnas;
  
  if (!nombre || !codigo) return;

  categorias.add(categoria);

  // Filtros aplicados
  if (categoriaSeleccionada && categoria !== categoriaSeleccionada) return;
  if (textoBusqueda && !nombre.toLowerCase().includes(textoBusqueda.toLowerCase())) return;

  let precio = null;
  if (pinCliente === PINES.distribuidor) precio = parseFloat(pinDist);
  else if (pinCliente === PINES.mayorista) precio = parseFloat(pinMay);
  else if (pinCliente === PINES.final) precio = parseFloat(pinFinal);
  else if (pinCliente === PINES.licitacion) precio = parseFloat(pinLici);

  const div = document.createElement('div');
  div.className = 'producto';

  const precioMostrar = precio ? `Bs ${precio.toFixed(2)} / USD ${(precio / tipoCambio).toFixed(2)}` : '🔒 Requiere PIN';

  div.innerHTML = `
    <img src="${imagenURL || 'https://via.placeholder.com/100'}" alt="${nombre}">
    <div class="info">
      <h2>${nombre}</h2>
      <p><strong>Código:</strong> ${codigo}</p>
      <p><strong>Precio:</strong> ${precioMostrar}</p>
      <p><strong>Marca:</strong> ${marca || 'No especificada'}</p>
      <p><strong>Categoría:</strong> ${categoria || 'General'}</p>
      ${!

        
