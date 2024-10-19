// create admin-api app

const exp = require('express')
const adminApp = exp.Router() //mini-express app so Router

const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// adminApp.get('/test-admin',(req,res)=>{
//     res.send({message:"This is from admin api"});
// })

let adminsCollection;
adminApp.use((req,res,next)=>{
    adminsCollection=req.app.get('adminsCollection');
    next();
})

adminApp.post('/adminregistration',expressAsyncHandler(async(req,res)=>{
    // console.log(req.body)

    const newAdmin = req.body;

    const dbAdmin = await adminsCollection.findOne({username:newAdmin.username})

    if (dbAdmin !==null){
        res.send({message:"admin exists"})
    }else{
        const hashedpassword = await bcryptjs.hash(newAdmin.password,7);

        newAdmin.password = hashedpassword;

        await adminsCollection.insertOne(newAdmin);

        res.send({message:"new admin created"});
    }
}));

//admin login route

adminApp.post('/adminlogin',expressAsyncHandler(async(req,res)=>{
    // console.log(req.body)
    const adminCredObj = req.body;

    const dbAdmin = await adminsCollection.findOne({username:adminCredObj.username});

    if (dbAdmin === null){
        res.send({message:"invalid Admin"});
    }else{

        const check =await bcryptjs.compare(adminCredObj.password,dbAdmin.password);
        // console.log(check)
        if (check===false){
            res.send({message:"incorrect password"});
        }else{
            const token = jwt.sign({username:dbAdmin.username},process.env.SK_admin,{expiresIn:'1d'});
            res.send({message:"admin Login successful",token:token,admin:dbAdmin});
        }
    }
}))

//to view all articles
adminApp.get('/view-articles',expressAsyncHandler(async(req,res)=>{
    const articlesCollection = req.app.get('articlesCollection');

    let articlesList = await articlesCollection.find({status:true}).toArray();

    res.send({message:"all articles",payload:articlesList});
}))



//export adminApp
module.exports =adminApp;