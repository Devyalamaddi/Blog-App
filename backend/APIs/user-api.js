// create user-api app

const exp = require('express')
const userApp = exp.Router() //mini-express app so Router

userApp.get('/test-user',(req,res)=>{
    res.send({message:"This is from user api"});
})

//export userApp
module.exports =userApp;