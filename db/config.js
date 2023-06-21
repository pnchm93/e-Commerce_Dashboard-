// in the config file we just basically connect the database with the nodejs 
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')