import {Router} from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.use('/api', userController);
router.get('/test', (req, res) => {
    res.send('hello')
})

export default router;