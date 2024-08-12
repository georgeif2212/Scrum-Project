import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  nombre: { type: String, required: true },
  proveedor: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);