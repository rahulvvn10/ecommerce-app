const express=require('express');
const User=require('../models/userModel');
const multer=require('multer');
const { logoutUser, forgotPassword, resetPassword, isAuthenticatedUser, getProfile, changePassword, updateProfile, getAllUsers,getUser, updateUser, deleteUser } = require('../middleware/authenticate');
const { authorizeRoles}=require('../middleware/authenticate')
const router=express.Router()

router.post('/register',async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
    });
    const token=user.getJwtToken();
     const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true,
        }
    res.status(201)
    .cookie('token',token,options)
    .json({
        success:true,
        user,
        token
    })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please enter email and password"});
        }
        const user=await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:"Invalid email or password ..."});
        }
        const match =await user.isValidPassword(password)
        if(!match){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const token=user.getJwtToken();
        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true,
        }
    res.status(201)
        .cookie('token',token,options)
    .json({
        success:true,
        user,
        token
    })
        
    }
    catch(err){
        res.status(500).json({message:err.message})  
    }
})

router.get('/logout',logoutUser);
router.post('/password/forgot',forgotPassword);
router.post('/password/reset/:token',resetPassword);
router.get('/myprofile',isAuthenticatedUser,getProfile);
router.put('/password/change',isAuthenticatedUser,changePassword);
router.put('/update',isAuthenticatedUser,updateProfile);


router.get('/admin/users',isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.get('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),getUser);
router.put('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteUser);



module.exports=router;

