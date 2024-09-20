const express =require('express');
const cors=require('cors');
const User= require('./models/user')
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const { log } = require('console');
require('dotenv').config()
const app=express();

const bcryptsalt=bcrypt.genSaltSync(10);
app.use(express.json())
app.use(cors({
credentials:true,
    origin:" http://localhost:5173"
}));

 mongoose.connect(process.env.MONGO_URL)
app.get('/test',(req,res)=>{
    res.json("test ok")
})

app.post("/register",async(req,res)=>{
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

app.listen(4000)