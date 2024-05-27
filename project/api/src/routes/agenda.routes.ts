import { Router } from 'express';
import { agendaController } from '@controllers';
import { verifyToken } from '@middlewares/auth';

const router = Router();

router.get('/', verifyToken, agendaController.getAgenda);

export default router;
