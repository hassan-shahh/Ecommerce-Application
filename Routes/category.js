const express = require("express")
const router= express.Router()
const {create,categorybyid,read,update,deletecategory,list}= require("../Controllers/category")
const {reqsignin,isAuth,isAdmin}= require("../Controllers/Userauth")
const {userbyid}= require("../Controllers/user")


router.post('/category/create/:userid',reqsignin,isAuth,isAdmin,create)
router.get('/category/:categoryid',read)
router.put('/category/update/:categoryid/:userid',reqsignin,isAuth,isAdmin,update)
router.delete('/category/delete/:categoryid/:userid',reqsignin,isAuth,isAdmin,deletecategory)
router.get('/categories',list)


router.param('userid',userbyid)
router.param('categoryid',categorybyid)



module.exports= router