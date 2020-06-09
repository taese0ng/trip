import express from 'express'
import routes from '../router.js'
import passport from 'passport'
import { postJoin, postLogin, postTendency } from '../controllers/userController.js';
import { postComment, deleteComment } from '../controllers/commentController.js';
import { getContentDetail } from '../controllers/contentController.js';


const globalRouter = express.Router();

// 회원가입
globalRouter.post(routes.join, postJoin, postTendency, postLogin);

// 로그인
globalRouter.post(routes.login, postLogin);


// 댓글 등록
globalRouter.post(routes.postComment,
    passport.authenticate('jwt', { session: false}),
    postComment    
)

// 댓글 삭제
globalRouter.get(routes.deleteComment,
    passport.authenticate('jwt', { session: false}),
    deleteComment
)

// Content 등록
globalRouter.get(routes.contentDetail,
    getContentDetail
)


export default globalRouter;