import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  languages: [String],
  bio: String,
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);