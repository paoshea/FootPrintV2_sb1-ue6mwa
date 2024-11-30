import express from 'express';
import { validateToken, requireAdmin } from '../middleware/auth.js';
import {
  createCompany,
  getCompanyById,
  updateCompany,
  getCompanyStats,
  getDepartments,
  updateDepartment,
  getCompanyMembers
} from '../controllers/company.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(validateToken);

// Company routes
router.post('/', requireAdmin, createCompany);
router.get('/:id', getCompanyById);
router.put('/:id', requireAdmin, updateCompany);
router.get('/:id/stats', getCompanyStats);
router.get('/:id/departments', getDepartments);
router.put('/:id/departments/:deptId', requireAdmin, updateDepartment);
router.get('/:id/members', getCompanyMembers);

export default router;