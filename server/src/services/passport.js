import passport from 'passport';
import passportJWT from "passport-jwt";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

import User from '../models/User.js'
import config from '../config/config.js'

passport.use(
    new JwtStrategy({
      jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JwtSecret
}, (async(jwtPayload, done) => {
    try {
        const user = await User.findByid(jwtPayload._id)
        if(!user){
            return done(new Error(), false);
        }
        return done(null, user);
    } catch (error) {
        return done(new Error(), false)
    }
   
}))
)

export default null;
