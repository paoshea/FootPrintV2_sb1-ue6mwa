import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['engagement', 'productivity', 'collaboration', 'impact'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  trend: Number,
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  metadata: mongoose.Schema.Types.Mixed,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const analyticsSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  metrics: [metricSchema],
  departmentStats: [{
    department: {
      type: String,
      required: true
    },
    memories: Number,
    engagement: Number,
    activeUsers: Number
  }],
  userStats: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    contributions: Number,
    impact: Number,
    engagement: Number
  }],
  activityDistribution: [{
    hour: Number,
    count: Number,
    type: String
  }],
  tags: [{
    name: String,
    count: Number,
    category: String
  }]
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ companyId: 1, date: -1 });
analyticsSchema.index({ companyId: 1, 'departmentStats.department': 1 });

export const Analytics = mongoose.model('Analytics', analyticsSchema);