
function exportarPDF() {
  const historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];
  if (historial.length === 0) return alert("No hay pedidos que exportar.");
  const ultimo = historial[historial.length - 1];
  const contenido = `Pedido #${historial.length}\nFecha: ${ultimo.fecha}\nTotal: ${ultimo.total} Bs`;

  const link = document.createElement("a");
  const blob = new Blob([contenido], { type: "application/pdf" });
  link.href = URL.createObjectURL(blob);
  link.download = "pedido_MACPRO.pdf";
  link.click();
}

function exportarWhatsApp() {
  const historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];
  if (historial.length === 0) return alert("No hay pedidos para enviar.");
  const ultimo = historial[historial.length - 1];
  const mensaje = encodeURIComponent(`Pedido MACPRO:\nFecha: ${ultimo.fecha}\nTotal: ${ultimo.total} Bs`);
  const numero = "59168099278"; // cambiar si se desea otro número
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank");
}
