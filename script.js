
document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        { nombre: "Escalera Extensible 2x10", precio: 2200 },
        { nombre: "Escalera Extensible 2x12", precio: 2500 }
    ];

    const lista = document.getElementById("lista-productos");
    productos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - ${p.precio} Bs`;
        lista.appendChild(li);
    });
});
