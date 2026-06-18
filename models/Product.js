import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  state: { type: String, required: true, enum: ['andhra', 'telangana', 'karnataka', 'kerala', 'tamilnadu'] },
  stateName: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'Snacks' },
  nameJa: { type: String, default: '' },
  descriptionJa: { type: String, default: '' },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
