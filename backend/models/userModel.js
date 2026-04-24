const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const crypto = require('crypto'); 
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter email"],
        unique:[true,"Email already exists"],
        validate:[validator.isEmail,'Enter valid email address']
    },
    password:{
        type:String,
        required:[true,"Please Enter password"],
        maxlength:[7,"Password cannot be more than 7 characters"],
        select:false
    },
   
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:{
        type:String},
    resetPasswordTokenExpire:{
        type:Date},
    createdAt:{
        type:Date,
        default: Date.now
    }
})
UserSchema.pre('save',async function(next){
     if (!this.isModified('password')) {
    return next();
  }
    this.password=await bcrypt.hash(this.password,10);
})
UserSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
UserSchema.methods.isValidPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
UserSchema.methods.resetPasswordTokens=function(){
    const token=crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordTokenExpire=Date.now()+30*60*1000;
    return token;
}
const userModel=mongoose.model('user',UserSchema);
module.exports=userModel;