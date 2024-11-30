import { Company } from '../models/Company.js';
import { User } from '../models/User.js';
import { Memory } from '../models/Memory.js';
import { createError } from '../utils/error.js';

// Create new company
export const createCompany = async (req, res, next) => {
  try {
    const company = new Company({
      ...req.body,
      createdBy: req.user.id,
      admins: [req.user.id]
    });

    const savedCompany = await company.save();

    // Update user with company reference
    await User.findByIdAndUpdate(req.user.id, {
      companyId: savedCompany.id,
      role: 'admin'
    });

    res.status(201).json(savedCompany);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get company by ID
export const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('admins', 'name email')
      .populate('departments.head', 'name email');

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    // Check if user belongs to company
    if (company.id !== req.user.companyId) {
      return next(createError(403, 'Not authorized to view this company'));
    }

    res.json(company);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update company
export const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    // Check if user is admin
    if (!company.admins.includes(req.user.id)) {
      return next(createError(403, 'Not authorized to update company'));
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json(updatedCompany);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get company statistics
export const getCompanyStats = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    if (company.id !== req.user.companyId) {
      return next(createError(403, 'Not authorized to view company stats'));
    }

    // Get various statistics
    const [userStats, memoryStats, departmentStats] = await Promise.all([
      User.aggregate([
        { $match: { companyId: company.id } },
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            byDepartment: {
              $push: {
                department: '$department',
                count: 1
              }
            },
            activeThisMonth: {
              $sum: {
                $cond: [
                  { $gte: ['$lastActive', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      Memory.aggregate([
        { $match: { companyId: company.id } },
        {
          $group: {
            _id: null,
            totalMemories: { $sum: 1 },
            totalEngagement: {
              $sum: { $add: [{ $size: '$likes' }, { $size: '$comments' }] }
            },
            byType: {
              $push: {
                type: '$type',
                count: 1
              }
            }
          }
        }
      ]),
      Memory.aggregate([
        { $match: { companyId: company.id } },
        {
          $group: {
            _id: '$department',
            memories: { $sum: 1 },
            engagement: {
              $sum: { $add: [{ $size: '$likes' }, { $size: '$comments' }] }
            }
          }
        }
      ])
    ]);

    res.json({
      users: userStats[0] || { totalUsers: 0, byDepartment: [], activeThisMonth: 0 },
      memories: memoryStats[0] || { totalMemories: 0, totalEngagement: 0, byType: [] },
      departments: departmentStats || []
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get departments
export const getDepartments = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('departments.head', 'name email')
      .select('departments');

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    if (company.id !== req.user.companyId) {
      return next(createError(403, 'Not authorized to view departments'));
    }

    res.json(company.departments);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update department
export const updateDepartment = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    if (!company.admins.includes(req.user.id)) {
      return next(createError(403, 'Not authorized to update departments'));
    }

    const departmentIndex = company.departments.findIndex(
      (dept) => dept.id === req.params.deptId
    );

    if (departmentIndex === -1) {
      return next(createError(404, 'Department not found'));
    }

    company.departments[departmentIndex] = {
      ...company.departments[departmentIndex],
      ...req.body,
      updatedAt: new Date()
    };

    await company.save();

    res.json(company.departments[departmentIndex]);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get company members
export const getCompanyMembers = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(createError(404, 'Company not found'));
    }

    if (company.id !== req.user.companyId) {
      return next(createError(403, 'Not authorized to view company members'));
    }

    const members = await User.find({ companyId: company.id })
      .select('name email department role lastActive')
      .sort('name');

    res.json(members);
  } catch (error) {
    next(createError(400, error.message));
  }
};