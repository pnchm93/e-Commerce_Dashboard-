const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    catogery:String,
    company:String,
    userId:String
});
module.exports=mongoose.model("products",productSchema);
