import { Router } from 'express';

// Controller
import {
  getUserById,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} from '../controllers/user.controller';

// Middlewares
import {
  signupValidators,
  validateRequest,
  updateUserValidators,
} from '../middlewares/validators.middleware';

const router = Router();

router.get('/', getAllUsers);

router.post('/signup', signupValidators, validateRequest, createUser);

router.post('/login', login);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserValidators, validateRequest, updateUser)
  .delete(deleteUser);

export { router as userRouter };
