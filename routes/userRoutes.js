const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/userModel');
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

router.get('/signup',(req,res,next)=>{
  console.log(req.flash())
  res.render('userViews/signup');
})
router.get('/login',(req,res,next)=>{
  res.render('userViews/login', {message: req.flash('error')});
})

router.post('/signup/create',(req,res,next)=>{
   console.log(req.body);
   const {nickName,usernameSignup,password, password2} = req.body;
   const salt = bcrypt.genSaltSync(12);
   const hashedPassWord =  bcrypt.hashSync(password, salt);
  console.log("the const vars ----------- ", nickName, usernameSignup, password, password2)
   if(!req.body){
     console.log("Error: no information entered")
    req.flash('error', 'you must enter your information to sign up')
    res.redirect('/signup');
   }else if(!nickName || !usernameSignup || !password || !password2){
     console.log("ERROR 1!!", nickName,usernameSignup,password, password2)
     req.flash({'error': ' Please fill in all fields'});
     res.redirect('/signup');
   }else if(password !== password2){
     console.log("passwords are different ")
     req.flash('error','passwords do not match');
     res.redirect('/signup');
   }else  if(password.length<6){
    console.log("ERROR 3!!")
     req.flash('error','password is too short')
     res.redirect('/signup');
   }else{
    User.findOne({username: req.body.usernameSignup})
    .then((userdb)=>{
       if(userdb){
         req.flash('error', 'email already subscribed');
         res.redirect('/signup');
       }else{
        User.create({
          nickName:nickName,
          username:usernameSignup,
          password:hashedPassWord
        })
        .then(()=>{
          req.flash('error','Account created succesfully');
          res.redirect('/login');
        }).catch((err)=>console.log(err))
       }
    })
   
    }
 })

 router.post('/login', passport.authenticate("local",{ 
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
 }))

 router.get('/logout', (req, res, next)=>{
  req.flash('error',`you logged out of ${req.user.username}`)
  req.logout();
  res.redirect("/");
})



module.exports = router;