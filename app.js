var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var cors       = require('cors');
var morgan     = require('morgan');
var dotenv     = require('dotenv');
var https      = require('https');
var http       = require('http');
var fs         = require('fs');
dotenv.config()

// Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_LOGIN_API);
var db = mongoose.connection;
db.once('open', function () {
   console.log('✔ DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// https options
var options = 
  process.env.NODE_ENV === 'production' ? 
  {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  }
  : undefined;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

// API
app.use('/api/users', require('./api/user')); //2
app.use('/api/auth', require('./api/auth'));   //2

// Server
var server = https.createServer(options, app)
server.listen(process.env.PORT_ENV, () => {
  console.log('✔ listening on port:' + `https://localhost:${process.env.PORT_ENV}`)
});
/*
options ?
  https.createServer(options, app.listen(process.env.PORT_PROD, function(){
    console.log('✔ listening on port:' + `https://localhost:${port}`);
  }))
  :
  app.listen(process.env.PORT_DEV , function(){
    console.log('✔ listening on port:' + `http://localhost:${port}`);
  });
*/