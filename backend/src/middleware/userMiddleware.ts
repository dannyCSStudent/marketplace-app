import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Adjust the path as needed

interface ClerkClaims {
  email?: string;
  username?: string;
}

export const createOrUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const clerkUserId = req.auth.userId;
    const claims = req.auth.claims as ClerkClaims;
    
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      // Create new user
      user = new User({
        clerkUserId,
        email: claims.email || '',
        username: claims.username || claims.email?.split('@')[0] || '',
      });
    } else {
      // Update existing user
      if (claims.email) user.email = claims.email;
      if (claims.username) user.username = claims.username;
    }

    // Ensure required fields are set
    if (!user.email || !user.username) {
      return res.status(400).json({ error: 'Email and username are required' });
    }

    await user.save();

    req.user = user; // Attach user to request object for later use
    next();
  } catch (error) {
    console.error('Error in createOrUpdateUser middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};