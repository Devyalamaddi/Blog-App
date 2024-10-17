//create express app
const exp = require('express')
const app = exp()
require('dotenv').config()//process.env.PORT

//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`web server running on port ${port}`));