import passport from 'passport'
import passportJWT from 'passport-jwt'
import User from './models/User.js'
import { verifyUser } from './controllers/userController.js'

// local Login
passport.use(User.createStrategy())

// JWT Token Authentication
passport.use(
    new passportJWT.Strategy({
            // options
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey   : 'thisIsMySecret'
        },
        // callback
        verifyUser
    )
)

/* Session을 쓰지 않기 때문에 사용 x
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/