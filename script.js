
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    const productos = [
        { codigo: 'MF-503', nombre: 'Escalera Multipropósito 4x3', precio: 'Bs. 1200' },
        { codigo: 'MF-504', nombre: 'Escalera Multipropósito 4x4', precio: 'Bs. 1350' },
        { codigo: 'MF-505', nombre: 'Escalera Multipropósito 4x5', precio: 'Bs. 1500' },
        { codigo: 'MF-506', nombre: 'Escalera Multipropósito 4x6', precio: 'Bs. 1650' }
    ];
    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<strong>${p.codigo}</strong><br>${p.nombre}<br><em>${p.precio}</em>`;
        container.appendChild(card);
    });
});
