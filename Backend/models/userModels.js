const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// mongoose.connect("mongodb://127.0.0.1:27017",{
//     dbName:"userinfo"
// })
// .then(()=>console.log("Database connected"))
// .catch((e)=>console.log(e))

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Naam likh apna"],
        maxLength: [30,"Saale itna bda naam kyo rkha hai tune.chota likh"],
        minLength: [4,"bda naam likh"]
    },
    email:{
        type:String,
        required: [true,"email daal apna"],
        unique: [true,"sasta email mt daal.kuch nya daal"],
        validate: [validator.isEmail, "email dhang se daal"]
    },
    password:{
        type:String,
        required: [true,"password daal"],
        minLength: [8,"8 se jyada hone ka re password"],
        select: false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
            },
        url:{
            type:String,
            required:true
            }
    },
    role:{
        type:String,
        default:"User"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

//JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

//Generating Password Reset Token 
userSchema.methods.getResetPasswordToken = function(){
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports  = mongoose.model("User",userSchema)