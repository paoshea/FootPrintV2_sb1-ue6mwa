import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const versionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['milestone', 'achievement', 'project', 'story'],
    required: true
  },
  tags: [String],
  visibility: {
    type: String,
    enum: ['private', 'team', 'company', 'public'],
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  changeDescription: String
});

const memorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: 'text'
  },
  content: {
    type: String,
    required: true,
    index: 'text'
  },
  type: {
    type: String,
    enum: ['milestone', 'achievement', 'project', 'story'],
    required: true,
    index: true
  },
  visibility: {
    type: String,
    enum: ['private', 'team', 'company', 'public'],
    required: true,
    default: 'team',
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
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
  tags: {
    type: [String],
    index: true
  },
  media: [{
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'document'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    thumbnailUrl: String,
    fileName: String,
    fileSize: Number,
    mimeType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema],
  versions: [versionSchema],
  version: {
    type: Number,
    default: 1
  },
  impact: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  relatedMemories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
memorySchema.index({ title: 'text', content: 'text', tags: 'text' });
memorySchema.index({ companyId: 1, createdAt: -1 });
memorySchema.index({ companyId: 1, department: 1 });
memorySchema.index({ companyId: 1, type: 1 });

// Methods
memorySchema.methods.isVisibleTo = function(user) {
  if (this.visibility === 'public') return true;
  if (this.visibility === 'private') return this.userId.equals(user._id);
  if (this.visibility === 'team') return this.department === user.department;
  if (this.visibility === 'company') return this.companyId.equals(user.companyId);
  return false;
};

export const Memory = mongoose.model('Memory', memorySchema);