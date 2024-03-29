const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHander = require("../utils/errorhander.js")
const jwt = require("jsonwebtoken")
const User = require("../models/userModels.js")

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const { token } = req.cookies;
    
    if(!token){
        return res.json({
            success:false,
            message:"Login first to access this resource"
        }) 
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)

    next()
});

exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`,403));
    }

    next();
}
}