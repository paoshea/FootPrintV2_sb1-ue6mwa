import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(createError(401, 'Authentication token required'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Invalid authentication token'));
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(createError(403, 'Admin access required'));
  }
  next();
};