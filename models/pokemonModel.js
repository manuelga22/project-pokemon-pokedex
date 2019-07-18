const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  nickName:{type:String, required:true},
  pokemonType:{type:String},
  pokemonImage:{type:String},
  move1:{type:String},
  move2 :{type:String},
  move3:{type:String},
  move4:{type:String},
  abilities:{type:String}
})

 module.exports = mongoose.model('pokemon', pokemonSchema);