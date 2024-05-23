import { Router } from 'express';
import { modelController } from '@controllers';
import { verifyToken } from '@middlewares/auth';

const router = Router();

router.post('/feedback', verifyToken, modelController.setActivity);
router.get('/recommendations', verifyToken, modelController.getRecommendations);

export default router;
