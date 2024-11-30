import { body, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  };
};

export const memoryValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('type').isIn(['milestone', 'achievement', 'project', 'story'])
    .withMessage('Invalid memory type'),
  body('visibility').isIn(['private', 'team', 'company', 'public'])
    .withMessage('Invalid visibility setting'),
  body('tags').isArray().withMessage('Tags must be an array'),
];

export const userValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
];

export const tagValidation = [
  body('name').trim().notEmpty().withMessage('Tag name is required'),
  body('category').optional().trim(),
  body('description').optional().trim(),
];