import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  criteria: [String],
  points: {
    type: Number,
    default: 0
  },
  icon: String,
  unlockedAt: Date
});

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  icon: String,
  category: {
    type: String,
    enum: ['contribution', 'innovation', 'leadership', 'teamwork']
  },
  level: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum']
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'team_leader', 'admin'],
    default: 'user'
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  department: {
    type: String,
    required: true,
    index: true
  },
  title: String,
  avatar: String,
  bio: String,
  location: String,
  phoneNumber: String,
  timezone: String,
  settings: {
    language: {
      type: String,
      default: 'en'
    },
    theme: {
      type: String,
      default: 'light'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      digest: {
        type: String,
        enum: ['none', 'daily', 'weekly'],
        default: 'daily'
      }
    },
    privacy: {
      showEmail: {
        type: Boolean,
        default: false
      },
      showPhone: {
        type: Boolean,
        default: false
      }
    }
  },
  achievements: [achievementSchema],
  badges: [badgeSchema],
  stats: {
    memories: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    impact: {
      type: Number,
      default: 0
    }
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ companyId: 1, department: 1 });
userSchema.index({ companyId: 1, role: 1 });
userSchema.index({ email: 1, companyId: 1 }, { unique: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model('User', userSchema);