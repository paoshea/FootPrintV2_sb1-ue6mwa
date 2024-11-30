import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Memory } from '../models/Memory.js';
import { createError } from '../utils/error.js';

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, companyId } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'User already exists'));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      companyId,
      role: 'user',
      joinedAt: new Date()
    });

    const savedUser = await user.save();

    // Generate token
    const token = jwt.sign(
      { id: savedUser.id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      ...userWithoutPassword,
      token
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      ...userWithoutPassword,
      token
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('badges')
      .populate('achievements');

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.json(user);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { password, email, role, ...updates } = req.body;

    // Don't allow updating sensitive fields
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...updates,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get user statistics
export const getUserStats = async (req, res, next) => {
  try {
    const [memories, engagement, achievements] = await Promise.all([
      Memory.countDocuments({ userId: req.user.id }),
      Memory.aggregate([
        { $match: { userId: req.user.id } },
        {
          $group: {
            _id: null,
            likes: { $sum: { $size: '$likes' } },
            comments: { $sum: { $size: '$comments' } }
          }
        }
      ]),
      User.findById(req.user.id)
        .select('achievements badges')
        .populate('achievements')
        .populate('badges')
    ]);

    res.json({
      memories,
      engagement: engagement[0] || { likes: 0, comments: 0 },
      achievements: achievements?.achievements || [],
      badges: achievements?.badges || []
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update user settings
export const updateUserSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    user.settings = {
      ...user.settings,
      ...req.body,
      updatedAt: new Date()
    };

    await user.save();

    res.json(user.settings);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get user achievements
export const getUserAchievements = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('achievements')
      .populate('badges')
      .select('achievements badges');

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.json({
      achievements: user.achievements,
      badges: user.badges
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};