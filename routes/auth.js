///////////////////////////////
///////  INSTALACIONES  ///////
///////////////////////////////
const express = require('express');
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const multer = require("multer");
const uploads = multer({dest: './public/uploads'});
const ensureLogin = require("connect-ensure-login");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Project = require('../models/Project');



///////////////////////////////////
///////  Autentificacion de sesión  ///////
///////////////////////////////////

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/profile')
  }
  return next();
}

function isNotAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}
//probando
///////////////////////////////////
///////  RUTAS PARA Profile  ///////
///////////////////////////////////


router.get('/profile', isNotAuth, (req,res, next)=>{
    User.findById(req.user._id)
    .then(user=>{
    res.render('auth/profile', user);
    })
    .catch(e=>next(e))
  })



  router.post('/profile', uploads.single('profilePhoto'),(req, res, next)=>{
    req.body.profilePhoto = "/uploads/" + req.file.filename;
    User.findByIdAndUpdate(req.user._id, req.body)
    .then(()=>{
      req.user.message = "foto actualizada";
      res.render('auth/profile', req.user);
    })
    .catch(e=>next(e));
  })

///////////////////////////////////
///////  RUTAS PARA LOGIN  ////////
///////////////////////////////////
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/login');
})

router.get("/login", isAuthenticated, (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login",
passport.authenticate("local"), (req, res)=>{
  return res.redirect('/profile')
});



///////////////////////////////////
///////  RUTAS PARA SIGNUP  ///////
///////////////////////////////////

router.get('/signup', (req,res)=>{
res.render('auth/signup',{error:req.body.error});
});

router.post('/signup',
    (req,res)=>{
        User.register(req.body, req.body.password, function(err, user) {
            if (err) return res.send(err);
            const authenticate = User.authenticate();
            authenticate(req.body.email, req.body.password, function(err, result) {
                if (err) return res.send(err);
                return res.redirect('/login');
            })
        })
    });


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
        username: profile.emails[0].value,
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
/*
//////////////////////////////////////////////
///////  RUTAS PARA SIGNUP CON GOOGLE  ///////
//////////////////////////////////////////////

    router.get("/auth/google", passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/plus.login",
                "https://www.googleapis.com/auth/plus.profile.emails.read"]
      }));
      
      router.get("/auth/google/callback", passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/profile"
      }));
*/




module.exports = router;
