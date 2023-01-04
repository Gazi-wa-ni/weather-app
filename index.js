const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config()
const  route  = require("./router/route");
const rateLimiting = require('express-rate-limit');
const app = express()

// user midlewares
app.use(cors())

// rate limiting
const limiter = rateLimiting({
    max : 40 ,
    windowMs : 10 * 60 * 1000,
    message: "too many requests form this ip"
})
// through this middleware.
app.use(limiter);
app.set('trust proxy',1)

// set static folder
app.use(express.static('public'))

app.use('/api',route)

app.listen(5000,()=>{
    console.log("app is runnng on port 5000");
})