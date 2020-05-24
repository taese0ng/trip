import passport from 'passport'
import routes from '../router.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// 회원가입
export const postJoin = async (req, res, next) => {
    const { 
        body : {
            password,
            verifyPassword,
            email,
            name
        }
    } = req;
    if (password !== verifyPassword) {
        res.status(401).send('Not match passwords!');
    }
    // User 이미 존재하면 미리다 체크해줌.
    const user = new User({email, name});
    try {
        await User.register(user, password);
        // res.status(200).send('join success');
        next(); // login 바로 연결
    }catch(err) {
        console.log(`Join Error : ${err}`);
        res.status(401).send('User is Already Exist!');
    }
}

// JWT
// 토큰
export const postLogin = (req, res, next) => {
    passport.authenticate('local', {session: false}, 
        (err, user, info) => {
            // console.log(user);
            if(err) console.log(err);
            if (err || !user) {
                return res.status(400).json({
                    message: 'Check the account',
                    user   : user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                // console.log(`jwt 전`)
                const token = jwt.sign(user.email, 'thisIsMySecret');
                return res.json({name : user.name, token});
            });
        }
    )(req, res);
}
// 확인
export const verifyUser = async (jwt_payload, done) => {
    console.log(`jwtPayload : ${jwt_payload}`);
    return await User.findOne({email:jwt_payload})
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log(err);
            return done(err);
        })
}

// 성향 파악 질문
export const postTendency = async (req, res, next) => {
    const { body : { selection }  } = req;
    try {
        await User.findOneAndUpdate( { _id: req.user._id },
            { selection }
        )
        res.status(200).json({
            message: 'Success Update Tedency',
            selection   : selection
        })
    } catch(err) {
        console.log(`Error with Post Tedency : ${err}`)
        res.status(400).json({
            message: 'Fail to update Tedency',
            selection   : selection
        })
    }
}