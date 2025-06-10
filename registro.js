document.getElementById('registro-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const tipo = this.tipo.value;
  const pin = this.pin.value;
  const claves = {
    distribuidor: "1111",
    mayorista: "2222",
    cliente: "3333",
    licitacion: "4444"
  };
  if (claves[tipo] && claves[tipo] === pin) {
    localStorage.setItem("clienteTipo", tipo);
    window.location.href = "productos.html";
  } else {
    alert("PIN incorrecto para el tipo seleccionado.");
  }
});