import {Router} from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.use('/api', userController);

export default router;