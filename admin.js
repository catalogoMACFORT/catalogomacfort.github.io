
document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    { codigo: "MF-503", nombre: "Escalera 4x3", precio: 1034.76 },
    { codigo: "MF-504", nombre: "Escalera 4x4", precio: 1223.04 },
  ];
  const usuarios = [
    { usuario: "ronald", tipo: "distribuidor" },
    { usuario: "macfort", tipo: "mayorista" },
  ];

  const pList = document.getElementById("listaProductos");
  const uList = document.getElementById("listaUsuarios");

  productos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.codigo} - ${p.nombre}: ${p.precio} Bs`;
    pList.appendChild(li);
  });

  usuarios.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `👤 ${u.usuario} (${u.tipo})`;
    uList.appendChild(li);
  });
});

function cerrarSesion() {
  localStorage.clear();
  location.href = "login.html";
}
