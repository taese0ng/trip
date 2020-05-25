import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postTendency, getUserDetail } from '../controllers/userController.js'

const userRouter = express.Router()

// 경향 선택
userRouter.post(routes.selectTendency, 
    passport.authenticate('jwt', { session: false}), 
    postTendency)

// 사용자 정보 (모두 볼 수 있음)
userRouter.get(routes.userDetail(), getUserDetail)

/*
// 사용자 정보 수정 (비밀번호)
userRouter.post(routes.editProfile, 
    passport.authenticate('jwt', { session: false}),
    postEditProfile)
*/

export default userRouter;