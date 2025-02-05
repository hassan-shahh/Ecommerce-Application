const User = require("../models/schema")


exports.userbyid = (req,res,next,id) =>{
    User.findById(id).exec((err,user) => {
        if(err || !user){
            res.status(400).json({
                error:"User not Found"
            })
        }
        req.profile = user;
        next()

    })
}
exports.read = (req,res) =>{
    req.profile.salt = undefined  
    req.profile.hashed_password = undefined
    console.log(req.profile)
    return res.json(req.profile)
}
exports.update = (req,res) =>{
    User.findOneAndUpdate({_id:req.profile._id},{$set : req.body}, {new:true}, (err,user) =>{
        if(err){
          return  res.status(400).json({
                error:"You dont have the permission"
            })
        }
        res.json(user)
    })

}