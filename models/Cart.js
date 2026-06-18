import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  weight: { type: String, required: true, default: '250g' },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  nameJa: { type: String, default: '' },
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
