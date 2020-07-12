const express = require("express")
const app = express()
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
var authroutes=require("./Routes/Userauth.js")
var userroutes=require("./Routes/user.js")
var categoryroutes=require("./Routes/category.js")
var productroutes=require("./Routes/product.js")
const mongoose = require("mongoose")
const expressValidator= require("express-validator")
const port = 8000
const connectDB= require("./connect")
    
connectDB()
app.listen(port, ()=>{
    console.log("Server is running on port %d",port)
})

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())



app.use('/api',authroutes)
app.use('/api',userroutes)
app.use('/api',categoryroutes)
app.use('/api',productroutes)
