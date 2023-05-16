const ErrorHander = require("../utils/errorhander.js")
const catchAsyncErrors =require("../middleware/catchAsyncErrors.js")
const User = require("../models/userModels.js");
const sendToken = require("../utils/jwttoken.js");

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "this is sample id",
            url:"profileURL"
        }
    });

    sendToken(user,201,res)
})

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email both
    if(!email||!password){
        return next(new ErrorHander("Please Enter Email and Password",400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid Email or Password",401));
    }

    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401))
    }
    
    sendToken(user,200,res)
})

//LogOut User
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})