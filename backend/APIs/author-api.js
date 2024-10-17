// create author-api app

const exp = require('express');
const authorApp = exp.Router() //mini-express app so Router

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
// authorApp.get('/test-author',(req,res)=>{
//     res.send({message:"This is from author api"});
// })

let authorsCollection;
authorApp.use((req,res,next)=>{
    authorsCollection = req.app.get('authorsCollection');
    next();
})

//author registration
authorApp.post('/authorregistration',async(req,res)=>{
    // console.log(req.body)

    const newAuthor = req.body;

    const dbAuthor = await authorsCollection.findOne({username:newAuthor.username});

    if (dbAuthor !== null){
        res.send({message:"author already exists"});
    }else{
        const hashedpassword =await bcryptjs.hash(newAuthor.password,7);

        newAuthor.password=hashedpassword;

        await authorsCollection.insertOne(newAuthor);
        res.send({message:"author created!"});
    }
});

//author login
authorApp.post('/authorlogin',async(req,res)=>{
    // console.log(req.body)

    const authorCredObj = req.body

    const dbAuthor = await authorsCollection.findOne({username:authorCredObj.username});
    if (dbAuthor === null){
        res.send({message:"invalid author"});
    }
    else{
        const check = await bcryptjs.compare(authorCredObj.password,dbAuthor.password);
        if(check===false){
            res.send({message:"incorrect password"});
        }
        else{

            const token = jwt.sign({username:dbAuthor.username},process.env.SK_Author,{expiresIn:'1d'});

            res.send({message:"author login successful",token:token,author:dbAuthor});
        }
    }
})

//to view all articles
authorApp.get('/view-articles',async(req,res)=>{
    const articlesCollection = req.app.get('articlesCollection');

    let articlesList = await articlesCollection.find().toArray();

    res.send({message:"all articles",payload:articlesList});
})

//export authorApp
module.exports =authorApp;