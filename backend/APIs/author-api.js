// create author-api app

const exp = require('express')
const authorApp = exp.Router() //mini-express app so Router

authorApp.get('/test-author',(req,res)=>{
    res.send({message:"This is from author api"});
})

//export authorApp
module.exports =authorApp;