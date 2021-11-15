import passport from 'passport'

export const isAuthenticated = (req, res, next) => {
        passport.authenticate('jwt', (err, user) => {
            if(err || !user) {
                res.status(403).send({error: 'you shall not pass'})
            }else{
                req.user = user
                next()
            }
        })(req, res, next);
    }
