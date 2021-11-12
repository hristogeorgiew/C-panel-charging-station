import { Router } from 'express';
import User from '../models/User.js'

const router = Router();

router.get('/findById', async (req, res) => {
    const {user} = req;
        if(!user){
            return res.status(400).send({error: "server is having an issue plase try again latter"})
        }
        return res.json(user)
})

router.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body)
        const userObjJson = user.toJSON();

        res.send({user: userObjJson})
    } catch (error) {
        console.log(error);
        return res.status(400).send({error: 'something is wrong'})
    }
})

export default router;