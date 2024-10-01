const express =require('express');
const cors=require('cors');
const User= require('../backend/models/user')
const Place =require('../backend/models/place')
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const { log } = require('console');
const cookieParser=require('cookie-parser')
const  download= require('image-downloader')
const fs=require('fs')

const multer =require('multer');
const { title } = require('process');
require('dotenv').config()
const app=express();

const bcryptsalt=bcrypt.genSaltSync(10);
const jwtsecret="ABcDS"
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + "/uploads"))
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

app.post('/logout',(req,res)=>{
    res.cookie('token',"").json(true)
})

app.post('/upload-by-link', async(req,res)=>{
    const{link}=req.body;
    const newName= Date.now()+'.jpg'
  

    if (!link) {
        return res.status(400).json({ message: 'No link provided' });
    }
    await download.image({
        url:link,
        dest:__dirname +'/uploads/'+ newName,
    });
    res.json( newName)
})

const photosMiddleware=multer({dest:"uploads/"})
app.post('/upload', photosMiddleware.array('photos', 100) ,(req,res)=>{
 const uploadedFiles=[]
    for(let i =0;i<req.files.length;i++){
    const {path,originalname}=req.files[i];
    const parts =originalname.split('.');
    const ext =parts[parts.length-1]
    const newPath= path +  "." + ext
fs.renameSync(path,newPath)
const finalPath = newPath.replace(/\\/g, '/').replace('uploads/', '');
uploadedFiles.push(finalPath);
 }
    res.json(uploadedFiles);

})

app.post('/places',async(req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token,jwtsecret,{},async(err,userData)=>{
        const { title, address, description, perks, extraInfo, checkin, checkOut, maxGuests, existingPhotos } = req.body;
        if(err)throw err;
   const placeDoc=  await Place.create({
            owner:userData.id,
            title,
            photos: existingPhotos,
            address,description,
            perks,extraInfo,checkin,checkOut,maxGuests
          
    })
   res.json(placeDoc)
    })

})
app.listen(4000)