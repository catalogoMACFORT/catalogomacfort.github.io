document.addEventListener("DOMContentLoaded", () => {
  fetch("productos.json")
    .then((res) => res.json())
    .then((data) => {
      const contenedor = document.getElementById("productos");
      contenedor.innerHTML = data.map(p =>
        `<article><h2>${p.nombre}</h2><p>Precio: ${p.precio} Bs</p></article>`
      ).join('');
    });
});
