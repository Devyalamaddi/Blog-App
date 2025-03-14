// create user-api app

const exp = require('express')
const userApp = exp.Router() //mini-express app so Router

const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken=require('../middlewares/verifyToken');
const User = require('../models/userModel');
const Article = require('../models/articleModel');


//user registration route(public)
userApp.post('/userregistration', expressAsyncHandler(async(req,res)=>{

    //get user details from req
        // console.log(req.body)
    const newUser = req.body;

    //check for duplicate user based on username

    const dbUser = await User.findOne({username:newUser.username})
    if (dbUser !== null) res.send({message:"User existed"});
    else{
        //hash the password
        const hashedpassword = await bcryptjs.hash(newUser.password,7);

        //replace plain password with hashed password
        newUser.password=hashedpassword;

        //create user in db
        await User.insertOne(newUser)

        //send res
        res.send({message:"user Created"})
    }
}))


//user login route(public)
userApp.post('/userlogin',expressAsyncHandler(async(req,res)=>{
    // console.log(req.body)

    const userCredObj = req.body;

    const dbUser = await User.findOne({username:userCredObj.username})
    if(!dbUser.status){
        dbUser.status=true;
    }

    if (dbUser === null){
       return res.send({message:"invalid username"})
    }
        
    const check = bcryptjs.compare(userCredObj.password,dbUser.password)

    if (check===false){
        return res.send({message:"incorrect password"})
    }
    const token=jwt.sign({username:dbUser.username},process.env.SK_user,{expiresIn:'1d'})
    return res.send({message:"login successful",token:token,user:dbUser});
}))


//get articles of all users(protected)

userApp.get('/view-articles',verifyToken,expressAsyncHandler(async(req,res)=>{


    let articlesList = await Article.find({status:true})

    res.send({message:"Articles list",payload:articlesList})

}))

// get articles by articleId
userApp.get('/view-articles/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    let articleIdFromUrl = Number(req.params.articleId);

    let article = await Article.find({articleId:articleIdFromUrl,status:true})

    res.send({message:"Article",payload:article})

}))


//post comments for an article by articleId(protected)
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const userComment = req.body
    articleIdFromUrl = Number(req.params.articleId)
    //insert userComment obj in comment array in Article
 let result = await Article.updateOne({$and:[{articleId:articleIdFromUrl},{status:true}]},{$addToSet:{comments:userComment}})
 res.send({message:"comment posted"})
//  console.log(result)
}))



//export userApp
module.exports =userApp;