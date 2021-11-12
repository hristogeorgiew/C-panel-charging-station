import {User} from '../models/User';

export default {
    findById: (req, res) => {
        const {user} = req;
        if(!user){
            return res.status(400).send({error: "server is having an issue plase try again latter"})
        }
        return res.json(user)
    },

    async signup(req, res) {
        try {
            const user = await User.create(req.body)
            const userObjJson = user.toJSON();

            return res.send({user: userObjJson})
        } catch (error) {
            console.log(error);
            return res.status(400).send({error: 'something is wrong'})
        }
    }
}