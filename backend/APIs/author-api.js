// create author-api app

const exp = require('express');
const authorApp = exp.Router() //mini-express app so Router

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();
const verifyToken=require('../middlewares/verifyToken');

// authorApp.get('/test-author',(req,res)=>{
//     res.send({message:"This is from author api"});
// })

let authorsCollection;
let articlesCollection;
authorApp.use((req,res,next)=>{
    authorsCollection = req.app.get('authorsCollection');
    articlesCollection = req.app.get('articlesCollection');

    next();
})

//author registration(public)
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
        res.send({message:"author created"});
    }
});

//author login(public)
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


// adding new article by author(protected)
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body;

    //post it in articlesCollections
    await articlesCollection.insertOne(newArticle);
    res.send({message:"new Article is created"});

}))

//modify article by author(protected)
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    
    //update by article id
    let result = await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    console.log(result)
    res.send({message:"article modified"})
}))

//delete article by articleId
        //soft delete is modifying action we just hide the article, instead deleteing, for restoring it later.

authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const articleIdFromUrl=req.params.articleId;

    const articleToDelete=req.body;

    let modifiedResults=await articlesCollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete}})
    res.send({message:"article deleted"});
    console.log(modifiedResults)
}))



//to view all articles **by author**(protected)
authorApp.get('/view-articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    
    const authorName = req.params.username;


    let articlesList = await articlesCollection.find({$and:[{username:authorName},{status:true}]}).toArray();
    res.send({message:"all articles",payload:articlesList});
}))

//export authorApp
module.exports =authorApp;