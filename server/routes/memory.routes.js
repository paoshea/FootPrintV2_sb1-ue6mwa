import express from 'express';
import { validateToken } from '../middleware/auth.js';
import { 
  createMemory,
  getMemories,
  getMemoryById,
  updateMemory,
  deleteMemory,
  searchMemories,
  getMemoryStats
} from '../controllers/memory.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(validateToken);

// Memory routes
router.post('/', createMemory);
router.get('/', getMemories);
router.get('/search', searchMemories);
router.get('/stats', getMemoryStats);
router.get('/:id', getMemoryById);
router.put('/:id', updateMemory);
router.delete('/:id', deleteMemory);

export default router;