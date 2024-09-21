const express =require('express');
const cors=require('cors');
const User= require('./models/user')
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const { log } = require('console');
const cookieParser=require('cookie-parser')
require('dotenv').config()
const app=express();

const bcryptsalt=bcrypt.genSaltSync(10);
const jwtsecret="ABcDS"
app.use(express.json());
app.use(cookieParser())
app.use(cors({
credentials:true,
    origin:" http://localhost:5173"
}));

 mongoose.connect(process.env.MONGO_URL)
app.get('/test',(req,res)=>{
    res.json("test ok")
})

app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    
    try {
        const userDoc= await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptsalt),
        });
        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }
 
})

app.post('/signin',async(req,res)=>{
    const {email,password} =req.body;
    const userDoc=await User.findOne({email});
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtsecret,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token,{ httpOnly: true }).json(userDoc)
            })
            
          
        }else{
            res.json("pass not ok")
        }
    }else{
        alert("no user")
    }
})

app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    if(token){
        jwt.verify(token,jwtsecret,{},async(err,userData)=>{
            if(err)throw err;
         const userDoc=await   User.findById(userData.id)
            res.json(userDoc);
        })
    }else{
        res.json(null);
    }
 
})

app.listen(4000)