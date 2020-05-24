import express from 'express'
import routes from '../router.js'
import { postJoin, postLoin } from '../controllers/userController.js';

const globalRouter = express.Router();

// 회원가입
globalRouter.post(routes.join, postJoin);

// 로그인
globalRouter.post(routes.login, postLoin);


export default globalRouter;