let express = require('express');
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let dbConfig = require('./database/db');
const session = require('express-session');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.listen(4000);
console.log("server ++");
// ===============================================
app.use(cors({
  origin: [
    "http://localhost:4200"
  ],
  credentials: true
}));

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
    const userWithoutPassword = {
      ...user
    };
    delete userWithoutPassword.pw;
    req.session.user = userWithoutPassword;
    // console.log(req.session);
    res.status(200).send({
      user: userWithoutPassword
    });
  } else {
    res.status(403).send({
      errorMessage: 'Permission denied!'
    });
  }

});

app.post('/api/loginUser', validatePayloadMiddleware, (req, res) => {

  req.session.user = req.body;
  // console.log(req.session);
  res.status(200).send({
    user: req.session.user
  });

});

app.get('/api/login', (req, res) => {
  console.log(req.session);
  req.session.user ? res.status(200).send({
    loggedIn: req.session.user
  }) : res.status(200).send({
    loggedIn: false
  });
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

app.post('/api/addFavorite', (req, res) => {
  // console.log(req.body);

  req.session.favorite = req.body;
  // console.log(req.session.favorite);
});

app.get('/api/favorite', (req, res) => {
  console.log("Don't have session");
  if (req.session.user) {
    console.log("Have session");
    console.log(req.session.favorite);
    console.log(json(req.session.favorite));
    return json(req.session.favorite);

  }
});
// ==================================================
// let appRoute = require('./routes/app.route');
// app.use('/', appRoute);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database sucessfully connected')
  },
  error => {
    console.log('Database could not connected: ' + error)
  }
)

app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/backend')));
// app.use('/', express.static(path.join(__dirname, 'dist/backend')));

let data = require('./data/data');
let moneyModel = require('./model/MoneyModel');
// moneyModel.create(data);
let moneyRoute = require('./routes/money.route');
app.use('/money', moneyRoute);

let people = require('./data/people');
let peopleModel = require('./model/peopleModel');
// peopleModel.create(people);
let peopleRoute = require('./routes/people.route');
app.use('/people', peopleRoute);

let room = require('./data/room');
let roomModel = require('./model/roomModel');
// roomModel.create(room);
let roomRoute = require('./routes/room.route');
const {
  json
} = require('body-parser');
app.use('/room', roomRoute);

// Find 404 and hand over to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
