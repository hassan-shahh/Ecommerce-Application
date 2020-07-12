const express = require("express")
const router= express.Router()
const {userbyid, read, update}= require("../Controllers/user")
const {reqsignin,isAuth,isAdmin}= require("../Controllers/Userauth")



router.get('/secret/:userid',reqsignin,isAuth,isAdmin,(req,res)  =>{
    res.json({
        user:req.profile
    })
})
router.get("/user/:userid",reqsignin,isAuth,read)
router.put("/user/:userid",reqsignin,isAuth,update)
router.param('userid',userbyid)

module.exports= router