import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'invalid email format').isEmail(),
  body('password', 'password must be at least 5 characters').isLength({ min: 5 }),
  body('fullName', 'enter a name').isLength({ min: 3 }),
  body('avatarUrl', 'invalid avatar link').optional().isURL(),
];

export const loginValidation = [
  body('email', 'invalid email format').isEmail(),
  body('password', 'password must be at least 5 characters').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'enter article title').isLength({ min: 3 }).isString(),
  body('text', 'enter the text of the article').isLength({ min: 10 }).isString(),
  body('tags', 'invalid tag format (specify an array)').optional().isArray(),
  body('imageUrl', 'invalid image link').optional().isString(),
];
