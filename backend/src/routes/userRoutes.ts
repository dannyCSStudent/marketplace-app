import express from 'express';
import { authenticateUser } from '../middleware/auth';
import { createOrUpdateUser } from '../middleware/userMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';
import { validateRequest } from '../middleware/validateRequest';
import { userSchema } from '../validation/schemas';

const router = express.Router();

router.get('/profile', authenticateUser, createOrUpdateUser, (req, res, next) => getProfile(req, res, next));
router.put('/profile', authenticateUser, createOrUpdateUser, validateRequest(userSchema), (req, res, next) => updateProfile(req, res, next));

export default router;

