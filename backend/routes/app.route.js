let express = require('express');
let moneyRoute = express.Router();

let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const session = require('express-session');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));

app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true
}));

const validatePayloadMiddleware = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(403).send({
      errorMessage: 'You need a payload'
    });
  }
};

const appUsers = {
  'lequyetanh@gmail.com': {
    email: 'lequyetanh@gmail.com',
    pw: '02081999' // YOU DO NOT WANT TO STORE PW's LIKE THIS IN REAL LIFE - HASH THEM FOR STORAGE
  }
};

app.post('/api/login', validatePayloadMiddleware, (req, res) => {
  const user = appUsers[req.body.email];
  if (user && user.pw === req.body.password) {
    const userWithoutPassword = {...user};
    delete userWithoutPassword.pw;
    req.session.user = userWithoutPassword;
    res.status(200).send({
      user: userWithoutPassword
    });
  } else {
    res.status(403).send({
      errorMessage: 'Permission denied!'
    });
  }
});

app.get('/api/login', (req, res) => {
  req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out.');
    } else {
      res.status(200).send({});
    }
  });
});


module.exports = moneyRoute;
