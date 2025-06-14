
// Simulación de carga de productos por tipo de cliente
const tipoCliente = 'mayorista'; // solo ejemplo
const productos = [
  { nombre: 'Escalera 2x10', precioUnidad: 2200, paquete: 1, caja: 1 },
  { nombre: 'Grampa acero', precioUnidad: 5, paquete: 12, caja: 240 },
];
document.getElementById('root').innerHTML = productos.map(p => (
  `<div><h2>${p.nombre}</h2><p>Precio unidad: ${p.precioUnidad} Bs</p></div>`
)).join('');
