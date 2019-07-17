const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  nickName:{type:String, required:true},
  pokemonType:{type:String, required:true},
  pokemonImage:{type:String,required:true},
  move1:{type:String, required:true},
  move2 :{type:String},
  move3:{type:String},
  move4:{type:String},
  abilities:{type:String}
})

 module.exports = mongoose.model('pokemon', pokemonSchema);