import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changeDescription: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const articleSchema = new mongoose.Schema({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  versions: [versionSchema],
  currentVersion: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  visibility: {
    type: String,
    enum: ['private', 'team', 'company', 'public'],
    default: 'company'
  },
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KnowledgeArticle'
  }],
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
articleSchema.index({ title: 'text', content: 'text', tags: 'text' });
articleSchema.index({ companyId: 1, category: 1 });
articleSchema.index({ companyId: 1, status: 1 });
articleSchema.index({ companyId: 1, 'metrics.views': -1 });

// Methods
articleSchema.methods.isVisibleTo = function(user) {
  if (this.visibility === 'public') return true;
  if (this.visibility === 'private') return this.author.equals(user._id);
  if (this.visibility === 'team') return this.category === user.department;
  if (this.visibility === 'company') return this.companyId.equals(user.companyId);
  return false;
};

articleSchema.methods.incrementViews = async function() {
  this.metrics.views += 1;
  await this.save();
};

articleSchema.methods.addContributor = async function(userId) {
  if (!this.contributors.includes(userId)) {
    this.contributors.push(userId);
    await this.save();
  }
};

export const KnowledgeArticle = mongoose.model('KnowledgeArticle', articleSchema);