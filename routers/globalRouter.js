import express from 'express'
import routes from '../router.js'
import { postJoin, postLogin } from '../controllers/userController.js';

const globalRouter = express.Router();

// 회원가입
globalRouter.post(routes.join, postJoin, postLogin);

// 로그인
globalRouter.post(routes.login, postLogin);



export default globalRouter;