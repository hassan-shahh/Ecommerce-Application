const Product = require("../models/product")
const { errorHandler } = require("../helpers/dbErrorHandler")

const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.create = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            return res.status(400).json(
                {
                    err: "Image not found"
                })
        }
        else {
            const { name, description, category, quantity, shipping } = fields
            if (!name || !description || !category || !quantity || !shipping) {
                return res.status(400).json({
                    err: "All fields are required"
                })
            }
            let product = new Product(fields)
            if (files.photo) {
                if (files.photo.size > 100000) {
                    res.status(400).json({
                        err: "Image should not be greater than 1MB"
                    })
                }
                else {
                    product.photo.data = fs.readFileSync(files.photo.path)
                    product.photo.contentType = files.photo.type
                }
            }

            product.save((err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json(
                        {
                            error: errorHandler(err)
                        })
                }
                else {
                    res.json({
                        data
                    })
                }
            })
        }
    })
}

exports.update = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            return res.status(400).json(
                {
                    err: "Image not found"
                })
        }
        else {
            const { name, description, category, quantity, shipping } = fields
            if (!name || !description || !category || !quantity || !shipping) {
                return res.status(400).json({
                    err: "All fields are required"
                })
            }
            let product = req.product
            //lodash allows us to update fields
            product = _.extend(product,fields)
            if (files.photo) {
                if (files.photo.size > 100000) {
                    res.status(400).json({
                        err: "Image should not be greater than 1MB"
                    })
                }
                else {
                    product.photo.data = fs.readFileSync(files.photo.path)
                    product.photo.contentType = files.photo.type
                }
            }

            product.save((err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json(
                        {
                            error: errorHandler(err)
                        })
                }
                else {
                    res.json({
                        data
                    })
                }
            })
        }
    })
}





exports.productbyid = (req, res,next,id) => {
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
           return res.status(400).json({
                error:"product is not found"
            })
        }
        req.product=product
        next()
    })  
   
}


exports.read = (req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}




exports.deleteproduct = (req,res) =>{
    let product = req.product
    Product.remove((err,deleted) =>{
        if(err){
            return res.status(400).json({
                 error:errorHandler(err)
             })
         }
         res.json(
             "Product was deleted"
         )
    })
}
/*
query params
sell/arrival
by items sold = /products?sortBy=sold&order=desc&limit=4
by arrival= /products?sortBy=createdAt&order=desc&limit=4
if no params, then all the products are sent
*/
exports.list = (req,res) =>{
let order = req.query.order ? req.query.order:'asc';
let sortBy= req.query.sortBy ? req.query.sortBy:'_id';
let limit = req.query.limit ? parseInt(req.query.limit): 6

Product.find()
.select("-photo")
.populate('category')
.sort([[sortBy,order]])
.limit(limit)
.exec((err,product) =>{
    console.log(product)
if(err){
    return res.status(400).json({
        error:"No products found"
    })
}
    res.send(product)

})
}



exports.listrelated = (req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit): 6


    Product.find({_id:{$ne:req.product}, category:req.product.category})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,data) => {
        console.log(data)
        if (err || !data){
           return res.status(400).json({
                err : "No related products"
            })
        }
        res.json(data)
    }

    )}

    exports.listcategories = (req,res) =>{
        Product.distinct('category', {},(err,categories) =>{
            if (err || !categories){
                return res.status(400).json({
                     err : "No product catgories found"
                 })
                }
                 res.json(categories)
             
        })
    }

    exports.listbysearch = (req, res) => {
        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip);
        let findArgs = {};
     
        // console.log(order, sortBy, limit, skip, req.body.filters);
        // console.log("findArgs", findArgs);
     
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10]
                    // lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
     
        Product.find(findArgs)
            .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: "Products not found"
                    });
                }
                res.json({
                    size: data.length,
                    data
                });
            });
    };

    exports.photo= (req,res,next) =>{
        if(req.product.photo.data){
            res.set('Content-Type',req.product.photo.contentType)
            return res.send(req.product.photo.data)        
        }
    next()  
  }