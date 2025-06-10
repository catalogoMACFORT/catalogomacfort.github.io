
document.getElementById('clienteTipo').addEventListener('change', function() {
  let cliente = this.value;
  if(cliente) {
    window.location.href = "https://wa.me/59168099278?text=Solicito%20PIN%20para%20" + cliente;
  }
});
