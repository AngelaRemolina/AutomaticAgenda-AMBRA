import { Router } from 'express';
import { userController } from '@controllers';

const router = Router();

router.post('/register', userController.createUser);
router.post('/login', userController.getUserToken);

// methods for views
router.get('/register', (req, res) => {
    res.render('auth/register')
});

export default router;
