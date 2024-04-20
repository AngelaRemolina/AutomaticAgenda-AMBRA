import { Router } from 'express';
import { userController } from '@controllers';

const router = Router();

router.post('/register', userController.createUser);
router.post('/login', userController.getUserToken);

export default router;
