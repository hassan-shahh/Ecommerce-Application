const User = require("../models/schema")
let uuidv1 = require('uuidv1')
const { errorHandler } = require("../helpers/dbErrorHandler")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

// body
exports.signup = async (req, res) => {
  const user = await new User(req.body)
  await user.save((error, user) => {
    if (!error) {
      user.salt = undefined;
      user.hashed_password = undefined
      console.log(user)
      return res.json(
        {
          user
        }
      )
    }
    else {
      res.status(403).json({
        error: errorHandler(error),
      })
    }
  }
  )
}

exports.signin = (req,res)=>{
  const {email,password}=req.body
  User.findOne({email},(err,user) =>{
    if(err || !user){
      res.status(400).json({
        error : "Email donot exist. Please Sign up."
      })
    }
    //if user found,check if email and password matches
    //create authicate method in schema
    if(!user.authenticate(password)){
      res.status(401).json({
        error:"Email and Password donot match"
      })
    }
    else{
    //generate token
   const token = jwt.sign({id:user._id},'secretkey')
   res.cookie("tok",token,{expire: new Date()+9999})
   const{_id,role,name,email}=user
   res.json({
     token,user:{_id,email,name,role}
    } )
  }})
}

exports.signout = (req,res)=>{

    res.clearCookie("tok");
res.json({message: 'Signed out Successfully'})
}

exports.reqsignin = expressJwt({
  secret:'secretkey',
  userProperty:'auth'
})


exports.isAuth= (req,res,next) =>{
  let user = req.profile && req.auth && req.profile._id==req.auth.id
  if(!user){
    return res.status(400).json({error:"Acces denied"})
  }
  next()
}
exports.isAdmin= (req,res,next) =>{
  if(req.profile.role==0){
    return res.status(400).json({error:"Acces denied.Only for Admins"})
  }
  next()
}








/* exports.signin = async (req, res) => {
        const userExists = await User(req.body);
        if (userExists)
          return res.status(403).json({
            error: errorHandler(error),
          });
        // dsfsjfdsfdsfdsf
        const user = await new User(req.body);
        await user.save();
        res.status(200).json({ message: "Signup successful! Please login." });
      };*/