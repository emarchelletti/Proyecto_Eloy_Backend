const socket = io();

// El uso de DOMContentLoaded asegura que el código JavaScript se ejecute solo cuando el DOM esté listo para ser interactuado.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const deleteBtn = document.getElementById('deleteProductBtn');
    const productList = document.getElementById('productList');

    // Escuchar el evento de envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productCode = document.getElementById('productCode').value;
        const productPrice = document.getElementById('productPrice').value;
        const productStock = document.getElementById('productStock').value;
        const productCategory = document.getElementById('productCategory').value;

        // Enviar los datos al servidor a través del socket
        socket.emit('newProduct', {
            title: productName,
            description: productDescription,
            code: productCode,
            price: productPrice,
            stock: productStock,
            category: productCategory
        });
    });

    // Escuchar evento para eliminar producto
    deleteBtn.addEventListener('click', () => {
        socket.emit('deleteProduct', 'Se elimino un producto');
    });

    // Escuchar actualizaciones de productos desde el servidor
    socket.on('updateProducts', (products) => {
        // Actualizar la lista de productos en la interfaz con la nueva información
        productList.innerHTML = products.map(product => `<li>${product.title} - Precio: $${product.price}</li>`).join('');
    });
});
