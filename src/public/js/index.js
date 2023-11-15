import { io } from '../../app.js';

console.log('Cliente conectado');
const socket = io.connect(`http://localhost:8080`);

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const newProduct = { title: productName, price: productPrice };
  socket.emit('newProduct', newProduct);
});
