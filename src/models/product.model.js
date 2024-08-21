import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  nombre: { type: String, required: true },
  proveedor: { type: String, required: true },
  keyDepartment: { type: String, required: true, ref: 'Department' }, 
  price: { type: Number, required: true } 
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
