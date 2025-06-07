
const pinesValidos = {
  "Distribuidor": "MACD2025",
  "Mayorista": "MACMA2025",
  "ClienteFinal": "MACF2025",
  "Licitación": "MACL2025"
};

document.getElementById("tipoCliente").addEventListener("change", () => {
  document.getElementById("formularioAcceso").classList.remove("oculto");
});

function SolicitarPIN() {
  const nombre = document.getElementById("nombre").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const ciudad = document.getElementById("ciudad").value;
  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const rubro = document.getElementById("rubro").value;
  const tipoCliente = document.getElementById("tipoCliente").value;

  if (!nombre || !whatsapp || !ciudad || !cargo || !rubro || !tipoCliente) {
    alert("Por favor, completa todos los campos requeridos.");
    return;
  }

  const mensaje = `Hola, soy ${nombre} (${cargo} de ${empresa || 'independiente'}), ciudad: ${ciudad}, rubro: ${rubro}. Solicito el PIN para ${tipoCliente}.`;
  const url = `https://wa.me/59168099278?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  const pin = prompt(`Hola ${nombre}, por favor ingresa el PIN que recibiste por WhatsApp:`);

  if (pin === pinesValidos[tipoCliente]) {
    document.getElementById("formularioAcceso").classList.add("oculto");
    document.getElementById("productos").classList.remove("oculto");
    document.getElementById("saludoCliente").textContent = `Bienvenido, ${nombre}. Aquí verás los productos con sus precios para ${tipoCliente}.`;
    cargarProductos(tipoCliente);
  } else {
    alert("❌ PIN incorrecto para el tipo seleccionado.");
  }
}

async function cargarProductos(tipo) {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";
  const res = await fetch(url);
  const data = await res.text();
  const rows = data.split("\n").slice(1);
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  rows.forEach(row => {
    const cols = row.split(",");
    const codigo = cols[0];
    const producto = cols[1];
    const precio = tipo === "Distribuidor" ? cols[6] : tipo === "Mayorista" ? cols[7] : tipo === "ClienteFinal" ? cols[8] : cols[9];
    const div = document.createElement("div");
    div.innerHTML = `<strong>${codigo}</strong>: ${producto} – <b>${precio} Bs</b>`;
    lista.appendChild(div);
  });
}
