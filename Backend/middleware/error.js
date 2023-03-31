const ErrorHander = require("../utils/errorhander");

module.exports = (err,res,req,next)=>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server Error";

    //Wrong Mongodb ID error
    if(err.name==="CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }

    req.status(err.statusCode).json({
        success: false,
        message: err.stack,
    })
}