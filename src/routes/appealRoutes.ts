import { Router } from 'express';
import {
    cancelAllAppeals,
    cancelAppeal,
    completeAppeal,
    takeAppeal,
    createAppeal,
    getAppeals,
    getAppealById,
    deleteAppeal,
} from '../controllers/appealController';

const router = Router();

router.get('/', getAppeals);
router.get('/:id', getAppealById);
router.post('/', createAppeal);
router.delete('/:id', deleteAppeal);
router.get('/take/:id', takeAppeal);
router.post('/complete/:id', completeAppeal);
router.post('/cancel/:id', cancelAppeal);
router.post('/cancelAll', cancelAllAppeals);

export default router;