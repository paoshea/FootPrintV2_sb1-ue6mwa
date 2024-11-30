import express from 'express';
import { validateToken } from '../middleware/auth.js';
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
  searchTags,
  getTagStats,
  getTagSuggestions
} from '../controllers/tag.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(validateToken);

// Tag routes
router.post('/', createTag);
router.get('/', getTags);
router.get('/search', searchTags);
router.get('/stats', getTagStats);
router.get('/suggestions', getTagSuggestions);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;