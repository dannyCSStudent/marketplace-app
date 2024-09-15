import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const clerkAuth = ClerkExpressRequireAuth();

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  clerkAuth(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  });
};