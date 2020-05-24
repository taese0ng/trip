# 너의 일정을 짜고 싶어
## **Server** 📖
### 개발 도구
- Node.js + Express<br>
  
```
dependencies:{
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.13",
    "morgan": "^1.10.0"
}
```
실행
```
$ nohup node app.js &
```

## **TODO List** 📝
### [✔] Sing UP
- [POST] body
```
"username" : "dlfdyd96",
"password": "ㅋㅋ",
"passwordConfirmation": "ㅋㅋ",
"name" : "Hwang"
```
- [🛠] username : Email로 변경해야함.
- [+] 이메일 확인 과정 필요
- [+] 성향과 묶어야함.
### [✔] Login
- [POST] body
```
"username" : "dlfdyd96",
"password": "zz"
```
- 로그인 성공 시(200) : 토큰 정보 return
```
data : {
    "success": true,
    "message": null,
    "errors": null,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6I..."
}
```
- 로그인 실패 시(200)
  - `data.success : false `
### ~~[✔] Session~~
### [✔] JWT
- token 생성
```javascript
jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
    if(err) 
        return res.json(util.successFalse(err));
    res.json(util.successTrue(token));
});
```
- token 확인
```javascript
// Middleware에서 Token 확인 검증함.
jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if(err) 
        return res.json(util.successFalse(err));
    else{
        req.decoded = decoded;
        next();
    }
});
```
- Client에서 요청 시,
```js
axios.get('url', {
    'x-access-token' : token 값
}).then(res=> {
    // logic
}).catch(err => console.log(err));
```
### [✔] Naver Server에 올리기
### [❌] HTTPS
- https 인증서 발행
  - [참고사이트](http://blog.naver.com/PostView.nhn?blogId=awesomedev&logNo=220713833207)
- OAuth에 필요
### [❌] 성향 model
### [❌] 게시판
### [❌] 이메일 인증 하기
### [❌] 네이버 아이디로 로그인


