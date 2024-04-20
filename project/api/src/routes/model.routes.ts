import { Router } from 'express';
import { modelController } from '@controllers';
import { verifyToken } from '@middlewares/auth';

const router = Router();

router.post('/activity', verifyToken, modelController.setActivity);
router.get('/recommendations', verifyToken, modelController.getRecommendations);

export default router;
