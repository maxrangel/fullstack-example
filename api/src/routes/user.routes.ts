import { Router } from 'express';

// Controller
import { getUserById, createUser } from '../controllers/user.controller';

// Middlewares
import {
  signupValidators,
  validateRequest,
} from '../middlewares/validators.middleware';

const router = Router();

router.post('/signup', signupValidators, validateRequest, createUser);

router.route('/:id').get(getUserById);

export { router as userRouter };
