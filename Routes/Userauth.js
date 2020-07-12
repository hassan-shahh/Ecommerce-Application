const express = require("express")
const router= express.Router()
const {signup, signin,signout,reqsignin}= require("../Controllers/Userauth")
const {signupvalidator} = require("../validator/index")



router.post("/signup",signupvalidator,signup)
router.post("/signin",signin)

router.get("/signout",signout)

router.get("/hello",reqsignin,(req,res)=>{
    res.send("Helloooo")
})





module.exports= router