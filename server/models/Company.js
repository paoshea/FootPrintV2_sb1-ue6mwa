import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parentDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  budget: {
    amount: Number,
    currency: String
  },
  metrics: {
    headcount: {
      type: Number,
      default: 0
    },
    activeProjects: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  logo: String,
  industry: {
    type: String,
    required: true,
    index: true
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501+'],
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  description: String,
  foundedYear: Number,
  headquarters: {
    country: String,
    city: String,
    address: String
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  departments: [departmentSchema],
  settings: {
    defaultMemoryVisibility: {
      type: String,
      enum: ['private', 'team', 'company', 'public'],
      default: 'team'
    },
    allowedDomains: [String],
    features: {
      analytics: {
        type: Boolean,
        default: true
      },
      collaboration: {
        type: Boolean,
        default: true
      },
      knowledgeBase: {
        type: Boolean,
        default: true
      }
    },
    branding: {
      primaryColor: String,
      secondaryColor: String,
      customCss: String
    }
  },
  metrics: {
    totalEmployees: {
      type: Number,
      default: 0
    },
    activeUsers: {
      type: Number,
      default: 0
    },
    totalMemories: {
      type: Number,
      default: 0
    },
    engagementRate: {
      type: Number,
      default: 0
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'trialing', 'expired'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  timestamps: true
});

// Indexes
companySchema.index({ name: 1, industry: 1 });
companySchema.index({ 'departments.name': 1 });
companySchema.index({ createdAt: -1 });

export const Company = mongoose.model('Company', companySchema);