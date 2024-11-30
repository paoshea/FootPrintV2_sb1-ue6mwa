import express from 'express';
import { validateToken, requireAdmin } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  getUserStats,
  updateUserSettings,
  getUserAchievements
} from '../controllers/user.controller.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.use(validateToken);
router.get('/me', getCurrentUser);
router.put('/me', updateUser);
router.get('/me/stats', getUserStats);
router.put('/me/settings', updateUserSettings);
router.get('/me/achievements', getUserAchievements);

export default router;