import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {type: 'string'},
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity:{type:Number, default: 1},
  }],
  
});

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
