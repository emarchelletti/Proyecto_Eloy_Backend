const socket = io();

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const newProduct = { title: productName, price: productPrice };
  socket.emit('newProduct', newProduct);
});
