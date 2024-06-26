import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description:{type:String},
  price: { type: Number, required: true },
  stock: { type: Number, default: 0, required: true },
  category: { type: String, index: true },
  thumbnail:{type:String},
  visible: { type: Boolean, default: true},
  owner: {
    type: String, default: "admin",
},
});

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('Product', productSchema);

export default productModel;
