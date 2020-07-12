const Category = require("../models/category")
const _ = require("lodash")
const fs = require("fs")
const { errorHandler } = require("../helpers/dbErrorHandler")


exports.create = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,data) =>{
        if(err || !data){
           return res.status(400).json({
                error:errorHandler(err)
            })
        }
        else{
            res.json({data})
        }
    })
}
exports.categorybyid = (req, res,next,id) => {
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
           return res.status(400).json({
                error:"Category is not found"
            })
        }
        req.category=category
        next()
    })  
   
}

exports.read = (req,res)=>{
    return res.json(req.category)
}

exports.update = (req,res)=>{
    const category = req.category
    category.name=req.body.name
    category.save((err,data) =>{
        if(err || !data){
           return res.status(400).json({
                error:errorHandler(err)
            })
        }
        else{
            res.json({data})
        }
    })
}
exports.deletecategory= (req,res) =>{
    let category = req.category
    Category.remove((err,deleted) =>{
        if(err){
            return res.status(400).json({
                 error:errorHandler(err)
             })
         }
         res.json(
             "Category was deleted"
         )
    })
}

exports.list = (req, res)=> {
    Category.find().exec((err,data)=>{
        if(err || !data){
           return res.status(400).json({
                error:"No Categories"
            })
        }
        else{
        res.json({data})
      }  })  
   
}