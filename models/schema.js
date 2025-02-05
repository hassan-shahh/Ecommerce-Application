const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuidv1")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},
    { timestamps: true })
// virtual fields


userSchema.virtual('password').set(function (password) {
    this.passwords = this.password
    this.salt = uuidv1()
    this.hashed_password = this.encrpytPassword(password)
})
userSchema.get(function () {
    return this.password
})
userSchema.methods = {
    authenticate: function(password){
        return this.encrpytPassword(password)==this.hashed_password
        
    },
    encrpytPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest("hex");
        }
        catch (err) {
            return ''
        }
    }
}
module.exports = mongoose.model("User", userSchema)