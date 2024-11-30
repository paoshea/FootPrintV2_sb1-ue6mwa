import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  color: String,
  description: String,
  category: String,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  usageCount: {
    type: Number,
    default: 0,
    index: true
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
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for unique tags per company
tagSchema.index({ name: 1, companyId: 1 }, { unique: true });

// Text index for search
tagSchema.index({ name: 'text', description: 'text' });

export const Tag = mongoose.model('Tag', tagSchema);