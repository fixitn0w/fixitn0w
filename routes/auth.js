///////////////////////////////
///////  INSTALACIONES  ///////
///////////////////////////////

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const multer = require("multer");
const uploads = multer({dest: './public/uploads'});


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
            console.log("ando acá")
            const authenticate = User.authenticate();
            authenticate(req.body.email, req.body.password, function(err, result) {
                console.log("aqui ando");
                if (err) return res.send(err);
                return res.redirect('/');
            })
        })
    });

module.exports = router;