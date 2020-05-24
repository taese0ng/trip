# 너의 일정을 짜고 싶어
## **Server** 📖
### 🔧 개발 도구
#### Node.js + Express<br>
  
```
"dependencies": {
    "@babel/core": "^7.9.6",
    "@babel/node": "^7.8.7",
    "@babel/preset-env": "^7.9.6",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "core-js": "^3.6.5",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "helmet": "^3.22.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.15",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^6.0.1",
    "validator": "^13.0.0"
}
```
#### 실행
```
$ nohup npm start &
```

## **TODO List** 📝
### [✔] Sing UP
- [POST] body
```js
// body
"email": "dlfdyd96@gmail.com", // 아이디
"password": "zz",
"passwordConfirmation": "zz",
"name" : "일용"
```
- [✔] 아이디 : Email로 변경해야함.
- [+] 이메일 확인 과정 필요
- [+] 성향과 묶어야함.
### [✔] Login
#### 📎 API 통신 예제
- [POST] '/login'
- Request
```js
// body
{
    "email" : "dlfdyd96@gmail.com",
    "password": "zz"
}
```
- Response
```js
// status : 200 OK
data : {
    "name": "황일용",
    "token": "eyJhbGciOiJIUzI..." // token 정보 -> LocalStorage에 저장할 것
}

// status : 400 Bad Request
data : {
    "message": "Check the account",
    "user": false
}
```
<br>

#### ⚙ 동작
`passport-local-mongoose` 를 사용하여 local Login 구현
```js
// passport.js
passport.use(User.createStrategy()) // 로 passport-local 쓰지 않고 간단하게 로그인 구현 가능
```
```js
// ./models/User.js
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'}); // passportLocalMongoose를 plugin 해준다.
// email로 로그인하기때문에 usernameField 설정 필수.
```
- [+] 카카오 아이디로 로그인.
- [+] 네이버 아이디로 로그인.
### ~~[✔] Session~~
### [✔] JWT
`passport-jwt`, `passport`, `jsonwebtoken` 사용
- 참고 사이트 : [passport.org](http://www.passportjs.org/packages/passport-jwt/), [Learn Using JWT with Passport Authentication](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
#### ⚙ 동작
```js
// passport.js

// JWT Token Authentication
passport.use(
    new passportJWT.Strategy({
            // options
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey   : 'thisIsMySecret'
        },
        // callback
        function (jwtPayload, cb) {
            console.log(jwtPayload);
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findOneById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    )
)
```
```js
// globalRouter

globalRouter.post(routes.login, postLoin);
```
```js
// UserController.js

export const postLoin = (req, res, next) => {
    passport.authenticate('local', {session: false}, 
        (err, user, info) => {
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
                const token = jwt.sign(user.email, 'thisIsMySecret');
                return res.json({name : user.name, token});
            });
        }
    )(req, res);
}
```
- [+] Secret 키는 배포전에 process.env.JWT_SECRET 로 숨기기
### [✔] Naver Server에 올리기
#### 🗄 Server
- `VSCode Remote - WSL` 을 통해 서버의 코드들을 vscode에서 작성 가능 하도록 했음.
- 도메인 주소 : http://49.50.175.145:3389/
### ~~[❌] HTTPS~~
- https 인증서 발행
  - [참고사이트](http://blog.naver.com/PostView.nhn?blogId=awesomedev&logNo=220713833207)
- OAuth에 필요
### [✔] 초기 Selections 추가
#### 📎 API 통신 예제
- [POST] '/user/select-tendency'
- Request
``` js
// body
{
    "selection" : ["경북궁", "해운대"]
}

// header
Authorization : `Bearer ${localStorage.token}` // 꼭 'Bearer ' 붙여줘야함
```
- Response
```js
{
    "message": "Success Update Tedency",
    "selection": [
        "경북궁",
        "해운대"
    ]
}
```
<br>

#### ⚙ 동작
- Router
```js
userRouter.post(routes.selectTendency, 
    passport.authenticate('jwt', { session: false}), // 인증 Middleware
    postTendency)   // 경향 등록
```
- Controller
```js
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
```


### [❌] 처음 추천 list 
- [+] dummy data 던져 주기
```
[
    {
        "location" : "경주",
        "img" : "http://49.50.175.145/output/img/${경주}"
    }, ...
]
```

### [❌] Itinerary C/R/U/D
1. Create
2. Read
3. Update
4. Delete
### [❌] 
### [❌] 이메일 인증 하기
### [❌] 네이버 아이디로 로그인


