import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postTendency } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post(routes.selectTendency, passport.authenticate('jwt', { session: false}), postTendency)

export default userRouter;