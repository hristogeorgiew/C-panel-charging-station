import { Router } from 'express';
import User from '../models/User.js'
import { isAuthenticated } from '../middlewares/index.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

function jwtSignUser(user){
    const ONE_WEEK = 7 * 24 * 60 * 60
    return jwt.sign(user, config.JwtSecret, {
        expiresIn: ONE_WEEK
    })
}

router.get('/findById', isAuthenticated,  async (req, res) => {
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

        res.send({user: userObjJson, token: jwtSignUser(userObjJson)})
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

        const userObjJson = user.toJSON()
        return res.send({
            user: userObjJson,
            token: jwtSignUser(userObjJson)
        })
    } catch (error) {
        return res.status(500).send({error: 'We have an error we don\'t know what to do'})
    }
})

export default router;