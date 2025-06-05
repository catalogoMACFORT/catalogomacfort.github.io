const tipoCambio = 16.33; // Puedes cambiar este valor desde Google Sheets más adelante si se conecta

async function cargarProductos() {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv');
    const data = await response.text();
    const filas = data.trim().split('\n').slice(1); // saltar encabezado
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    filas.forEach(fila => {
      const columnas = fila.split(',');
      const [codigo, producto, precioUSD, , , , , , , , , , imagenBase64] = columnas;
      const pin = localStorage.getItem('pin_cliente');
      const tipo = localStorage.getItem('cliente_registrado') || 'no definido';

      let precioFinal = precioUSD ? (parseFloat(precioUSD) * tipoCambio).toFixed(2) : '0.00';
      let precioVisible = pin ? `Bs ${precioFinal}` : '<em>Precio con PIN autorizado</em>';

      const tarjeta = document.createElement('div');
      tarjeta.className = 'producto';
      tarjeta.innerHTML = `
        <img src="${imagenBase64 || 'https://via.placeholder.com/100'}" alt="QR">
        <div class="info">
          <strong>${producto}</strong><br>
          Código: ${codigo}<br>
          Precio: <span class="precio">${precioVisible}</span><br>
          <button onclick="solicitarAccesoProducto('${codigo}')">Ver más / Contactar</button>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    document.getElementById("contenedor-productos").innerHTML = '<p style="color:red;">❌ Error al cargar productos. Revisa el enlace del CSV o la estructura.</p>';
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos);
