const express=require('express');
const cors=require('cors');
require('./db/config')
const User=require('./db/users')
const Product=require('./db/Product');
const app=express();

app.use(express.json());
app.use(cors())

const Jwt=require('jsonwebtoken');
const jwtKey='e-commerce';
// this key is kept secret, on the basis of this tokens are made.


app.post('/register',async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey, {expiresIn:"2h"}, (err,token)=>{
        if(err){
            resp.send({result:"Something went wrong"});
        }
        resp.send({result , auth:token });
    })
})

app.post("/login",async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user= await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtKey, {expiresIn:"2h"}, (err,token)=>{
                if(err){
                    resp.send({result:"Something went wrong"});
                }
                resp.send({user , auth:token });
            })
             
        }
        else{
            resp.send({result:"result not found"});
        }
    }
    else{
        resp.send("it is not okay");
    }
})
 //api to add the data into the data base
app.post('/add-product',async (req,resp)=>{
    let product= new Product(req.body);
    console.log(req.body);
    let result=await product.save();
    resp.send(req.body);
})
// api to get the list of data from the database
app.get("/products",verifytoken,async (req,resp)=>{
    let products=await Product.find();
    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send("No product found");
    }
})
//api to delete the an item
app.delete('/product/:id',async (req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});
//making an api to get an item from DB on the basis of the id of the prduct
app.get('/product/:id',async (req,resp)=>{
    let result= await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send("Result not found...!")
    }
})
//make the api for the update the product
app.put('/product/:id',async (req,resp)=>{
    const result=await Product.updateOne(
        { _id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result);
})
// api to search the data on the basis of the key entered by the user.
app.get('/search/:key',verifytoken,async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            { company : {$regex: req.params.key}},
            {catogery:{$regex: req.params.key}},
            {price: {$regex: req.params.key}}
        ]
    })
    resp.send(result);
})

function verifytoken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];//  split will give th array and the 0th index conatins the bearer and 1st index contains the actual Auth token
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send("please enter the valid token");
            }
            else{
                next();
            }
        })
    }
    else{  
        resp.status(403).send("Please add the token with header");
    }
}

app.listen(5000);
