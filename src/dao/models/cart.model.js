import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity:{type:Number, default: 0},
  }],
  
});

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
