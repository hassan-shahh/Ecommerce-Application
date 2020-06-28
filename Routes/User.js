const express = require("express")
const router= express.Router()
const {signup, signin}= require("../Controllers/User")
const {signupvalidator} = require("../validator/index")



router.post("/signup",signupvalidator,signup)
router.post("/signin",signin)





module.exports= router