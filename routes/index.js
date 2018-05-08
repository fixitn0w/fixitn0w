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

const Project = require('../models/Project');




/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('index');
});

module.exports = router;

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
