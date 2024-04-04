function finalizarCompra() {
    const purchaseButton = document.querySelector('.purchase-button');
    const cartId = purchaseButton.getAttribute('data-cart-id');

    if (confirm('¿Está seguro que desea finalizar la compra?')) {
        // Si el usuario confirma, redirige a la página de finalización de compra
        window.location.href = '/api/carts/' + cartId + '/purchase';
    }
}