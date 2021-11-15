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
        //проверяваме дали съществува username
        if(Object.keys(error.keyValue[0] === 'username')){
            return res.status(400).send({error: 'This username already exist'})

        }
        return res.status(400).send({error: 'something is wrong'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(403).send({error: 'The login information is wrong'})
        }

        const isPasswordValid = await user.verifyPassword(password);

        if(!isPasswordValid) {
            return res.status(403).send({error: 'The login information is wrong'})
        }

        const userJson = user.toJSON()
        return res.send({
            user: userJson
        })
    } catch (error) {
        return res.status(500).send({error: 'We have an error'})
    }
})

export default router;