//create express app
const exp = require('express')
const app = exp()
require('dotenv').config()//process.env.PORT


//to parse the body of req
app.use(exp.json());

// import api Routes
const authorApp =require('./APIs/author-api')
const adminApp = require('./APIs/admin-api')
const userApp = require('../../blog-app/backend/APIs/user-api')

//if path starts with user-api, send req to userApp
app.use('/user-api',userApp)

//if path starts with author-api, send req to authorApp
app.use('/author-api',authorApp)

//if path starts with admin-api, send req to adminApp
app.use('/admin-api',adminApp)

//express error handler
app.use((err,req,res,next)=>{
    res.send({errorMessage:"error", payload:err});
})

//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`web server running on port ${port}`));