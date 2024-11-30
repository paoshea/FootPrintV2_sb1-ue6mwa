import { Tag } from '../models/Tag.js';
import { Memory } from '../models/Memory.js';
import { createError } from '../utils/error.js';

// Create new tag
export const createTag = async (req, res, next) => {
  try {
    const tag = new Tag({
      ...req.body,
      companyId: req.user.companyId,
      createdBy: req.user.id
    });

    const savedTag = await tag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    if (error.code === 11000) {
      return next(createError(400, 'Tag already exists'));
    }
    next(createError(400, error.message));
  }
};

// Get all tags with filtering
export const getTags = async (req, res, next) => {
  try {
    const { category, sort = 'usageCount' } = req.query;

    const query = { companyId: req.user.companyId };
    if (category) query.category = category;

    const sortOptions = {
      usageCount: { usageCount: -1 },
      name: { name: 1 },
      recent: { createdAt: -1 }
    };

    const tags = await Tag.find(query)
      .sort(sortOptions[sort] || sortOptions.usageCount);

    res.json(tags);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get tag by ID
export const getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return next(createError(404, 'Tag not found'));
    }

    if (tag.companyId.toString() !== req.user.companyId) {
      return next(createError(403, 'Not authorized to view this tag'));
    }

    res.json(tag);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update tag
export const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return next(createError(404, 'Tag not found'));
    }

    if (tag.companyId.toString() !== req.user.companyId) {
      return next(createError(403, 'Not authorized to update this tag'));
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json(updatedTag);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Delete tag
export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return next(createError(404, 'Tag not found'));
    }

    if (tag.companyId.toString() !== req.user.companyId) {
      return next(createError(403, 'Not authorized to delete this tag'));
    }

    // Check if tag is in use
    const tagInUse = await Memory.exists({
      companyId: req.user.companyId,
      tags: tag.name
    });

    if (tagInUse) {
      return next(createError(400, 'Cannot delete tag that is in use'));
    }

    await tag.remove();
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Search tags
export const searchTags = async (req, res, next) => {
  try {
    const { q, category } = req.query;

    const query = {
      companyId: req.user.companyId,
      $text: { $search: q }
    };

    if (category) query.category = category;

    const tags = await Tag.find(query)
      .sort({ score: { $meta: 'textScore' } });

    res.json(tags);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get tag statistics
export const getTagStats = async (req, res, next) => {
  try {
    const stats = await Tag.aggregate([
      {
        $match: { companyId: req.user.companyId }
      },
      {
        $group: {
          _id: null,
          totalTags: { $sum: 1 },
          totalUsage: { $sum: '$usageCount' },
          byCategory: {
            $push: {
              category: '$category',
              count: 1
            }
          },
          topTags: {
            $push: {
              name: '$name',
              usageCount: '$usageCount'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalTags: 1,
          totalUsage: 1,
          byCategory: 1,
          topTags: {
            $slice: [
              {
                $sortArray: {
                  input: '$topTags',
                  sortBy: { usageCount: -1 }
                }
              },
              5
            ]
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalTags: 0,
      totalUsage: 0,
      byCategory: [],
      topTags: []
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get tag suggestions
export const getTagSuggestions = async (req, res, next) => {
  try {
    const { input, context, limit = 5 } = req.query;

    const baseQuery = {
      companyId: req.user.companyId
    };

    if (input) {
      baseQuery.name = { $regex: input, $options: 'i' };
    }

    if (context) {
      baseQuery.$or = [
        { category: context },
        { description: { $regex: context, $options: 'i' } }
      ];
    }

    const suggestions = await Tag.find(baseQuery)
      .sort('-usageCount')
      .limit(parseInt(limit));

    res.json(suggestions);
  } catch (error) {
    next(createError(400, error.message));
  }
};