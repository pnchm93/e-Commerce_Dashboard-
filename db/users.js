const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

module.exports=new mongoose.model('users',userSchema);
