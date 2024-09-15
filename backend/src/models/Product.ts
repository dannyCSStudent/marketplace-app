import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  categories: [String],
  condition: { type: String, required: true },
  images: [String],
  videoUrl: String,
  isLocalPickup: { type: Boolean, default: false },
  isShippable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
});

export default mongoose.model('Product', productSchema);