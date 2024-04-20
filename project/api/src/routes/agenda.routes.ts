import { Router } from 'express';
import { agendaController } from '@controllers';
import { verifyToken } from '@middlewares/auth';

const router = Router();

router.post('/', verifyToken, agendaController.createAgenda);
router.get('/:id', verifyToken, agendaController.getAgenda);
router.get('/', verifyToken, agendaController.getAgendas);
router.patch('/:id', verifyToken, agendaController.updateAgenda);
router.delete('/:id', verifyToken, agendaController.deleteAgenda);

export default router;
