import { Router } from 'express';

import { registerValidation, loginValidation, postCreateValidation } from '../validations/index.js';
import { getProfileInfo } from '../controllers/getMeController.js';
import { uploadController } from '../controllers/uploadController.js';
import { authController, postController } from '../controllers/index.js';
import { handleValidationErrors, checkAuth } from '../utils/index.js';
import { upload } from '../multer storage/index.js';

export const router = new Router();

router.post('/register', registerValidation, handleValidationErrors, authController.register);
router.post('/login', loginValidation, handleValidationErrors, authController.login);
router.get('/me', checkAuth, getProfileInfo);

router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getOne);
router.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.create,
);
router.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.update,
);
router.delete('/posts/:id', checkAuth, postController.remove);

router.post('/upload', checkAuth, upload.single('image'), uploadController);
