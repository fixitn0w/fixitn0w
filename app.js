require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require("express-session");
const flash      = require("connect-flash");
const passport = require("./helpers/passport");
const MongoStore = require("connect-mongo")(session);
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/User");




mongoose.Promise = Promise;
mongoose
.connect(process.env.DATABASE, {useMongoClient: true})  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//////////////////////
// Middleware Setup //
//////////////////////
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/////////////////////////////
// Google Login Middleware //
/////////////////////////////

passport.use(new GoogleStrategy({
  clientID: "796743130836-dd1ro4b9d0i1qje3rns5md8kmo84q3a5.apps.googleusercontent.com",
  clientSecret: "aoraPuQr9mgMnXCv4YMAqrLG",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id,
      username:profile.emails[0].value,
      name: profile.displayName,
      email: profile.emails[0].value
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

///////////////////////////////
// Express View engine setup //
///////////////////////////////

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


///////////////////////////////////
// default value for title local //
///////////////////////////////////

app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const auth = require("./routes/auth");
const projects = require('./routes/projects');
app.use('/', auth);
app.use('/', index);
app.use('/projects', projects)


module.exports = app;
