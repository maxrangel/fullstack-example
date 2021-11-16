import { Router } from 'express';

// Controller
import { getUserById } from '../controllers/user.controller';

const router = Router();

router.route('/:id').get(getUserById);

export { router as userRouter };
