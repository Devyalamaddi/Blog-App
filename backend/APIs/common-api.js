// to place all common routes to use in other APIs 

const exp = require('express')
const commonApp = exp.Router()

commonApp.get('/common',(req,res)=>{
    res.send({message:"message form common api"});
})

module.exports=commonApp