
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productoForm");
  const lista = document.getElementById("productosLista");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);

    if (!codigo || !nombre || isNaN(precio)) return;

    const productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    const index = productos.findIndex(p => p.codigo === codigo);
    if (index >= 0) {
      productos[index] = { codigo, nombre, precio };
    } else {
      productos.push({ codigo, nombre, precio });
    }

    localStorage.setItem("adminProductos", JSON.stringify(productos));
    form.reset();
    mostrarProductos();
  });

  mostrarProductos();

  function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    lista.innerHTML = productos.map((p, i) => `
      <li>
        ${p.codigo} - ${p.nombre}: ${p.precio} Bs
        <button onclick="editar(${i})">✏️</button>
        <button onclick="eliminar(${i})">🗑️</button>
      </li>
    `).join("");
  }

  window.editar = function (index) {
    const productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    const p = productos[index];
    document.getElementById("codigo").value = p.codigo;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("precio").value = p.precio;
  }

  window.eliminar = function (index) {
    const productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    productos.splice(index, 1);
    localStorage.setItem("adminProductos", JSON.stringify(productos));
    mostrarProductos();
  }

  window.cerrarSesion = function () {
    localStorage.clear();
    location.href = "login.html";
  }
});
