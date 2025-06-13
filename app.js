
document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(res => res.json())
        .then(data => mostrarProductos(data));
});

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = productos.map(prod => `
        <div class="producto">
            <h3>${prod.nombre}</h3>
            <p>Precio público: ${prod.precio_publico} Bs</p>
        </div>
    `).join('');
}
