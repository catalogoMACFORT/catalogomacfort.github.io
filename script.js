const tipoClienteSelect = document.getElementById('tipoCliente');
const formularioSecreto = document.getElementById('formularioSecreto');
const formularioDatos = document.getElementById('formularioDatos');
const listaProductos = document.getElementById('listaProductos');

let tipoClienteSeleccionado = '';
let datosCompletados = false;

// Mostrar formulario al seleccionar tipo de cliente
tipoClienteSelect.addEventListener('change', () => {
  tipoClienteSeleccionado = tipoClienteSelect.value;
  if (tipoClienteSeleccionado) {
    formularioSecreto.classList.remove('oculto');
  } else {
    formularioSecreto.classList.add('oculto');
    listaProductos.innerHTML = '';
  }
});

// Enviar datos por WhatsApp
formularioDatos.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const ciudad = document.getElementById('ciudad').value;
  const empresa = document.getElementById('empresa').value;
  const cargo = document.getElementById('cargo').value;
  const rubro = document.getElementById('rubro').value;

  const mensaje = `Hola, soy ${nombre}, deseo solicitar mi PIN para ver los precios del catálogo.\n\n📍Ciudad: ${ciudad}\n🏢 Empresa: ${empresa}\n💼 Cargo: ${cargo}\n🏷️ Rubro: ${rubro}\n👥 Tipo de Cliente: ${tipoClienteSeleccionado}`;

  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  datosCompletados = true;
  window.open(url, '_blank');

  // Mostrar campo para ingresar PIN
  setTimeout(() => {
    const pin = prompt("Ingrese el PIN de acceso:");
    validarPin(pin);
  }, 3000);
});

// Validar PIN
function validarPin(pin) {
  const pinesValidos = {
    Distribuidor: "MAC123",
    Mayorista: "MAC456",
    ClienteFinal: "MAC789",
    Licitacion: "MAC999"
  };

  if (pin === pinesValidos[tipoClienteSeleccionado]) {
    obtenerDatos();
  } else {
    alert("PIN incorrecto. Por favor, solicite el PIN válido por WhatsApp.");
  }
}

// Cargar productos desde Google Sheets
function obtenerDatos() {
  fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv')
    .then(response => response.text())
    .then(data => {
      const filas = data.split('\n').slice(1);
      listaProductos.innerHTML = '';

      filas.forEach(fila => {
        const columnas = fila.split(',');
        const codigo = columnas[0];
        const producto = columnas[1];
        const procedencia = columnas[2];
        const marca = columnas[3];
        const precioDistribuidor = columnas[5];
        const precioMayorista = columnas[6];
        const precioFinal = columnas[7];
        const precioLicitacion = columnas[8];

        let precio = '';
        if (tipoClienteSeleccionado === "Distribuidor") precio = precioDistribuidor;
        if (tipoClienteSeleccionado === "Mayorista") precio = precioMayorista;
        if (tipoClienteSeleccionado === "ClienteFinal") precio = precioFinal;
        if (tipoClienteSeleccionado === "Licitacion") precio = precioLicitacion;

        const itemHTML = `
          <div class="item-producto">
            <h3>${producto}</h3>
            <p><strong>Código:</strong> ${codigo}</p>
            <p><strong>Marca:</strong> ${marca}</p>
            <p><strong>Procedencia:</strong> ${procedencia}</p>
            <p><strong>Precio (${tipoClienteSeleccionado}):</strong> Bs ${parseFloat(precio).toFixed(2)}</p>
          </div>
        `;
        listaProductos.innerHTML += itemHTML;
      });
    })
    .catch(error => {
      listaProductos.innerHTML = "<p>Error al cargar productos.</p>";
    });
}
