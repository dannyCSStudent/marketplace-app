import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { authenticateUser } from './middleware/auth';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use Clerk middleware without passing the publishableKey here
app.use(ClerkExpressWithAuth());

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Protected route example
app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.auth.userId });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
