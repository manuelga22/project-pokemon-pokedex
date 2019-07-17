const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/seeAllPokemon', (req,res,next)=>{  


    res.render('seeAllViews/seeAllPokemon');  

});




 
module.exports = router;