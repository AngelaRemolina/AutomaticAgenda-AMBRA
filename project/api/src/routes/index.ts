import { Router } from 'express';
const router = Router();

import userRouter from './user.routes';
import agendaRouter from './agenda.routes';
import modelRouter from './model.routes';

router.use('/users', userRouter);
router.use('/agendas', agendaRouter);
router.use('/models', modelRouter);
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

export default router;
