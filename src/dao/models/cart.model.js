import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, default: 0 },
});

const Cart = mongoose.model('Cart', productSchema);

export default Cart;
