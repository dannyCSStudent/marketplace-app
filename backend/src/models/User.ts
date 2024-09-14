import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  languages: [String],
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);