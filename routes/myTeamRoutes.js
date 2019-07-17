const express = require('express');
const router  = express.Router();
const User = require('../models/userModel')
const Pokemon = require('../models/pokemonModel');
const uploadCloud = require('../config/claudinary');

router.get('/myteam',(req,res,next)=>{
  if(!req.user){
    res.redirect('/');
  }else{
  res.render('teamViews/myteam');
  }
});

router.get('/myteam/add',(req,res,next)=>{
  User.findById(req.user._id).populate('team')
  .then((user)=>{
    console.log(user.team)
     res.json(user);      
  }).catch((err)=>console.log(err))
});

router.post('/myteam/add', uploadCloud.single('pokemonImage'),(req,res,next)=>{
  if(!req.user){
    res.redirect('/');
  }else{
  Pokemon.create({
     nickName: req.body.pokemonName,
     pokemonType: req.body.pokemonTypes,
     pokemonImage: req.file.url,
     move1:req.body.pokemonMoves1,
     move2 :req.body.pokemonMoves2,
     move3:req.body.pokemonMoves3,
     move4:req.body.pokemonMoves4,
     abilities:req.body.pokemonAbilities
  })
  .then((pokemon)=>{
    req.user.team.push(pokemon._id);
    req.user.save()
    .then(()=>{
       console.log('yay');
       res.redirect('/myteam');
    }).catch((err)=>console.log(err))
  
     console.log('yay')
  }).catch((err)=>console.log(err))
}
});

router.get('/myteam/edit/:id',(req,res,next)=>{
  if(!req.user){
    res.redirect('/');
  }else{
  Pokemon.findById(req.params.id)
  .then((pokemon)=>{
    res.render('#edit',{pokemon:pokemon})
  }).catch((err)=> next(err))}
});

router.post('/myteam/update/:id',(req,res,next)=>{
  if(!req.user){
    res.redirect('/');
  }else{
  Pokemon.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{
    res.redirect('/myteam')
  }).catch((err)=> next(err))}
})

router.post('/myteam/delete/:id',(req,res,next)=>{
  console.log("this is the post for deleting pokemon")
  User.findById(req.params.id)
  .then(()=>{
    console.log("delete the pokemon")
   res.redirect('/myTeam');
  }).catch((err)=> console.log(err))

   Pokemon.findByIdAndRemove(req.params.id)
   .then(()=>{
     console.log('deleted')
     res.redirect('/myTeam');
   }).catch((err)=> next(err))
   
})

module.exports= router;