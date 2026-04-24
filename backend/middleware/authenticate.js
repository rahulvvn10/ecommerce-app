const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userModel = require('../models/userModel');
const sendEmail=require('../utils/email')
const crypto=require('crypto')
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Login first to access this resource'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please login again.'
      });
    }

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(500).json({ message: err.message });
  }
};


exports.authorizeRoles=(...roles)=>{
   return (req,res,next)=>{
      if(!roles.includes(req.user.role)){
        return res.status(401).json(`Role ${req.user.role} is not allowed`)
      }
      next()
    }
  }

  exports.logoutUser=(req,res,next)=>{
    res.cookie('token',null,{
     expires: new Date(
  Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
)
,
      httpOnly:true
    })
    .status(200).json({message:"Logout successful",success:true
    })
  }


exports.forgotPassword = async (req, res) => {

  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user with this email",
    });
  }

  const resetToken = user.resetPasswordTokens();
  await user.save({ validateBeforeSave: false });
const resetURL = `${req.protocol}://${req.hostname}:3000/password/reset/${resetToken}`;
  const message = `Your password reset link is as follows:\n\n${resetURL}\n\nIf you have not requested it, please ignore this email.`;

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email}`,
  });

  sendEmail({
    email: user.email,
    subject: "Ecommerce Site Password Recovery",
    message,
  }).catch(err => {
    console.error("Email send error:", err.message);
  });
};

exports.resetPassword= async (req,res)=>{
 const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex')
 const user=await User.findOne({resetPasswordToken,resetPasswordTokenExpire:{
  $gt: Date.now()
 }})
 if(!user){
  return res.status(404).json({message:"Password reset token is invalid or expired"})
 }
 if(req.body.password!==req.body.confirmPassword){
  return res.status(400).json({success: false,message:"Password does not match"})
 }
  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordTokenExpire=undefined;
  await user.save({validateBeforeSave:false});
 const token=user.getJwtToken()
 res.status(201).json({
  success:true,
  token,
  user
 })
}

exports.getProfile=async(req,res,next)=>{
  const user=await userModel.findById(req.user.id)
  res.status(200).json({
    success:true,
    user
  })
}

exports.changePassword=async(req,res,next)=>{
  const user=await userModel.findById(req.user.id).select('+password')
  if(!await user.isValidPassword(req.body.oldPassword)){
    return res.status(401).json({message:"Old password is incorrect"})
  }
  user.password=req.body.password;
  await user.save();
   res.status(200).json({
    success:true,
    message:"password changed"
  })
}

exports.updateProfile=async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email
  }
  const user=await userModel.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true,
    user
  })
}

exports.getAllUsers=async(req,res,next)=>{
  const users=await userModel.find();
  res.status(200).json({
    success:true,
    users
  })
}

exports.getUser=async(req,res,next)=>{
  const user=await userModel.findById(req.params.id);
  if(!user){
    return res.status(400).json("User not found");
  }
  res.status(200).json({
    success:true,
    user
  })
}

exports.updateUser=async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }
  const user=await userModel.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true,
    user
  })
}

exports.deleteUser=async(req,res,next)=>{
  const user=await userModel.findById(req.params.id);
  if(!user){
    return res.status(400).json("User not found");
  }
  await user.deleteOne();
  res.status(200).json({
    success:true
  })
}