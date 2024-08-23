import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  nombre: { type: String, required: true },
  proveedor: { type: String, required: true },
  keyDepartment: { type: String, required: false, ref: 'Department' }, 
  price: { type: Number, required: false } 
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
