import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, default: 0 },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
