import { Memory } from '../models/Memory.js';
import { createError } from '../utils/error.js';

// Create new memory
export const createMemory = async (req, res, next) => {
  try {
    const memory = new Memory({
      ...req.body,
      userId: req.user.id,
      companyId: req.user.companyId
    });

    const savedMemory = await memory.save();
    res.status(201).json(savedMemory);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get all memories with filtering and pagination
export const getMemories = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      visibility,
      department,
      startDate,
      endDate,
      tags
    } = req.query;

    const query = {
      companyId: req.user.companyId,
      $or: [
        { visibility: 'public' },
        { visibility: 'company' },
        { visibility: 'team', department: req.user.department },
        { visibility: 'private', userId: req.user.id }
      ]
    };

    if (type) query.type = type;
    if (department) query.department = department;
    if (tags) query.tags = { $all: tags.split(',') };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const memories = await Memory.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'name avatar');

    const total = await Memory.countDocuments(query);

    res.json({
      memories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get memory by ID
export const getMemoryById = async (req, res, next) => {
  try {
    const memory = await Memory.findById(req.params.id)
      .populate('userId', 'name avatar')
      .populate('comments.userId', 'name avatar');

    if (!memory) {
      return next(createError(404, 'Memory not found'));
    }

    // Check visibility permissions
    if (
      memory.visibility === 'private' && 
      memory.userId.toString() !== req.user.id
    ) {
      return next(createError(403, 'Not authorized to view this memory'));
    }

    res.json(memory);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update memory
export const updateMemory = async (req, res, next) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return next(createError(404, 'Memory not found'));
    }

    if (memory.userId.toString() !== req.user.id) {
      return next(createError(403, 'Not authorized to update this memory'));
    }

    // Create new version
    memory.versions.push({
      title: memory.title,
      content: memory.content,
      updatedBy: req.user.id,
      updatedAt: new Date(),
      changeDescription: req.body.changeDescription
    });

    // Update memory
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        version: memory.version + 1,
        versions: memory.versions
      },
      { new: true }
    );

    res.json(updatedMemory);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Delete memory
export const deleteMemory = async (req, res, next) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return next(createError(404, 'Memory not found'));
    }

    if (memory.userId.toString() !== req.user.id) {
      return next(createError(403, 'Not authorized to delete this memory'));
    }

    await memory.remove();
    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Search memories
export const searchMemories = async (req, res, next) => {
  try {
    const { q, type, department } = req.query;
    
    const query = {
      companyId: req.user.companyId,
      $text: { $search: q },
      $or: [
        { visibility: 'public' },
        { visibility: 'company' },
        { visibility: 'team', department: req.user.department },
        { visibility: 'private', userId: req.user.id }
      ]
    };

    if (type) query.type = type;
    if (department) query.department = department;

    const memories = await Memory.find(query)
      .sort({ score: { $meta: 'textScore' } })
      .populate('userId', 'name avatar');

    res.json(memories);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get memory statistics
export const getMemoryStats = async (req, res, next) => {
  try {
    const stats = await Memory.aggregate([
      {
        $match: {
          companyId: req.user.companyId,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      },
      {
        $group: {
          _id: null,
          totalMemories: { $sum: 1 },
          totalLikes: { $sum: { $size: '$likes' } },
          totalComments: { $sum: { $size: '$comments' } },
          avgImpact: { $avg: '$impact' },
          byType: {
            $push: {
              type: '$type',
              count: 1
            }
          }
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    next(createError(400, error.message));
  }
};