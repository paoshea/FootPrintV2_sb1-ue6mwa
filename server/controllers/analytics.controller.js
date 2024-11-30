import { Analytics } from '../models/Analytics.js';
import { Memory } from '../models/Memory.js';
import { User } from '../models/User.js';
import { createError } from '../utils/error.js';

// Get company analytics
export const getCompanyAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, period = 'daily' } = req.query;

    const query = {
      companyId: req.user.companyId,
      date: {}
    };

    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);

    const analytics = await Analytics.find(query)
      .sort({ date: -1 })
      .limit(30);

    // Calculate trends
    const trends = analytics.reduce((acc, curr) => {
      curr.metrics.forEach(metric => {
        if (!acc[metric.type]) {
          acc[metric.type] = {
            values: [],
            trend: 0
          };
        }
        acc[metric.type].values.push(metric.value);
      });
      return acc;
    }, {});

    // Calculate trend percentages
    Object.keys(trends).forEach(type => {
      const values = trends[type].values;
      if (values.length >= 2) {
        const latest = values[0];
        const previous = values[1];
        trends[type].trend = ((latest - previous) / previous) * 100;
      }
    });

    res.json({
      analytics,
      trends
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get department analytics
export const getDepartmentAnalytics = async (req, res, next) => {
  try {
    const { department } = req.params;
    const { startDate, endDate } = req.query;

    const query = {
      companyId: req.user.companyId,
      'departmentStats.department': department
    };

    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);

    const analytics = await Analytics.find(query)
      .sort({ date: -1 })
      .limit(30);

    res.json(analytics);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get user analytics
export const getUserAnalytics = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    // Check authorization
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return next(createError(403, 'Not authorized to view these analytics'));
    }

    const query = {
      companyId: req.user.companyId,
      'userStats.userId': userId
    };

    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);

    const analytics = await Analytics.find(query)
      .sort({ date: -1 })
      .limit(30);

    res.json(analytics);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Generate analytics report
export const generateAnalyticsReport = async (req, res, next) => {
  try {
    const { date = new Date() } = req.body;

    // Calculate metrics
    const [memories, users, engagement] = await Promise.all([
      Memory.aggregate([
        {
          $match: {
            companyId: req.user.companyId,
            createdAt: {
              $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
              $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
            }
          }
        },
        {
          $group: {
            _id: '$department',
            count: { $sum: 1 },
            engagement: {
              $sum: {
                $add: [
                  { $size: '$likes' },
                  { $size: '$comments' }
                ]
              }
            }
          }
        }
      ]),
      User.aggregate([
        {
          $match: {
            companyId: req.user.companyId,
            lastActive: {
              $gte: new Date(new Date(date).setHours(0, 0, 0, 0))
            }
          }
        },
        {
          $group: {
            _id: '$department',
            activeUsers: { $sum: 1 }
          }
        }
      ]),
      Memory.aggregate([
        {
          $match: {
            companyId: req.user.companyId,
            createdAt: {
              $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
              $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
            }
          }
        },
        {
          $group: {
            _id: { $hour: '$createdAt' },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Create analytics record
    const analytics = new Analytics({
      companyId: req.user.companyId,
      date,
      departmentStats: memories.map(m => ({
        department: m._id,
        memories: m.count,
        engagement: m.engagement,
        activeUsers: users.find(u => u._id === m._id)?.activeUsers || 0
      })),
      activityDistribution: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: engagement.find(e => e._id === hour)?.count || 0
      }))
    });

    await analytics.save();
    res.json(analytics);
  } catch (error) {
    next(createError(400, error.message));
  }
};