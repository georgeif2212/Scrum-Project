import mongoose, { Schema } from 'mongoose';

const departmentSchema = new Schema({
  name: { type: String, required: true },
  keyDepartment: { type: String, required: true },
  personInCharge: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', departmentSchema);