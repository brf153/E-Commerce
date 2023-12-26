const ErrorHander = require("../utils/errorhander.js")
const catchAsyncErrors =require("../middleware/catchAsyncErrors.js")
const User = require("../models/userModels.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width: 150,
        crop: "scale"
    }, function(error,result){
        console.log(result,error)
    })

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url
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

    const isPasswordMatched = await user.comparePassword(password);

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

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not found",404));
    }

    //Get ResetPassword Token 
    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
    // localStorage.setItem("token",JSON.stringify(resetToken))
    try{
        await sendEmail({
            email:user.email,
            subject: "Ecommerce Password Recovery",
            message
        })
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`,
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHander(error.message,500))
    }
    // res.status(200).json({
    //     success:true,
    //     user
    // })
})

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //creating token hash
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{ $gt : Date.now() },
        })

        if(!user){
            return next(new ErrorHander("Reset Password Token is invalid or has been expired",400))
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHander("Password does not match",400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({
            success:true,
            user
        })
        sendToken(user,200, res)
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
})

// Update User Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect",401));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password does not match",400))
    }

    user.password = req.body.newPassword;

    await user.save()
    res.status(200).json({
        success:true,
        user
    })
    sendToken(user,200,res)
})

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    //We will add cloudinary later
    if(req.body.avatar!==""){
        const user = await User.findById(req.user.id)
    
        const imageId = user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })

        newUserData.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})

//Get All Users(admin)
exports.getAllUser = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})

//Get Single User(admin)
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.findById(req.params.id)
    if(!users){
        return next(new ErrorHander(`User does not exist with id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        users
    })
})

//Update User Profile --Admin
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    //We will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    const imageId = user.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });