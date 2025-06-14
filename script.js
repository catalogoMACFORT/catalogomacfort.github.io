
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const subCategory = document.getElementById('subCategory').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const productList = document.getElementById('productList');
    const productCard = document.createElement('div');
    productCard.innerHTML = `
        <h3>${productName}</h3>
        <p><strong>Categoría:</strong> ${category}</p>
        <p><strong>Subcategoría:</strong> ${subCategory}</p>
        <p><strong>Precio:</strong> Bs ${price}</p>
        <p><strong>Descripción:</strong> ${description}</p>
        <hr>
    `;
    productList.appendChild(productCard);
});
