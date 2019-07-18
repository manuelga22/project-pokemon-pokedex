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
  console.log(req.body)
  User.findById(req.user._id).populate('team')    
  .then((user)=>{
    res.json(user);  
    console.log(user.team.length)
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


router.post('/myteam/update/:id', uploadCloud.single('pokemonImage'),(req,res,next)=>{
  if(!req.user){
    res.redirect('/');
   }else{
    console.log("new body",req.body);
   let theId = req.params.id;
   let data={
     nickName: req.body.nickName,
     pokemonType:req.body.pokemonType,
     pokemonImage:req.file.url,
     move1:req.body.move1,
     move2:req.body.move2,
     move3:req.body.move3,
     move4:req.body.move4,
     abilities:req.body.abilities
   }
  Pokemon.findByIdAndUpdate(theId, data)
  .then((pokemon)=>{
    console.log(pokemon,"updated")
    res.redirect('/myteam');
  }).catch((err)=> next(err))
  }
})

router.post('/myteam/delete/:id',(req,res,next)=>{
  console.log("this is the post for deleting pokemon")
  User.findById(req.params._id)
  .then(()=>{
    console.log(req)
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