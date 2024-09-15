import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { NotFoundError, BadRequestError } from '../utils/CustomError';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { username, bio, languages } = req.body;

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (languages) user.languages = languages;

    await user.save();

    res.json({ success: true, data: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(new BadRequestError('Error updating user profile'));
      }
    } else {
      next(new BadRequestError('An unknown error occurred'));
    }
  }
};