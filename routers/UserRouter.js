import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postTendency, getUserDetail, postEditProfile, postUpdatePassword } from '../controllers/userController.js'

const userRouter = express.Router()

// 경향 선택
userRouter.post(routes.selectTendency, 
    passport.authenticate('jwt', { session: false}), 
    postTendency)

// 사용자 정보 (모두 볼 수 있음)
userRouter.get(routes.userDetail(), getUserDetail)

// 사용자 정보 수정  (이름만 되어있음. 추후에 더 추가할 것)
userRouter.post(routes.editProfile, 
    passport.authenticate('jwt', { session: false}),
    postEditProfile)

// 비밀번호 수정
userRouter.post(routes.changePassword, 
    passport.authenticate('jwt', { session: false}),
    postUpdatePassword)



export default userRouter;