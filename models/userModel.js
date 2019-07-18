const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickName: {type:String},
  username:{type: String, unique: true},
  password:{type:String},
  team:[{type:Schema.Types.ObjectId, ref:'pokemon',}],
})

module.exports= mongoose.model('User', userSchema);  