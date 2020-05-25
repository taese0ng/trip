import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postTendency } from '../controllers/userController.js'

const userRouter = express.Router()

// 경향 선택
userRouter.post(routes.selectTendency, 
    passport.authenticate('jwt', { session: false}), 
    postTendency)

// 사용자 정보
// userRouter.get(routes.userDetail(), passport.authentication('jwt', {session : false}), getUserDetail)


export default userRouter;