const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHander = require("../utils/errorhander.js")
const jwt = require("jsonwebtoken")
const User = require("../models/userModels.js")

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const { token } = req.cookies;
    
    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401))
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)

    next()
})