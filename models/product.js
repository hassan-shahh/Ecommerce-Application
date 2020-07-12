const mongoose = require("mongoose")
const Category = require("./category")
const {ObjectId} = mongoose.Schema


const productSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
        description :{
            type : String,
            required : true,
            maxlength:2000
        },
        price :{
            type : Number,
            required : true,
            trim: true,
            maxlength:32
        },
        category :{
            type : ObjectId,
            required : true,
            ref: 'Category',
            maxlength:32
        },
        quantity :{
            type : Number,
        },
        sold :{
            type : Number,
        },
        photo:{
            data: Buffer,
            contentType : String
        },
        shipping:{
            required :false,
            type:Boolean

        }
},
    { timestamps: true })

module.exports = mongoose.model("Product", productSchema)