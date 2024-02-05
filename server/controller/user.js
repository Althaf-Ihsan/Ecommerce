const express = require('express')
const path = require('path')
const { upload } = require("../multer")
const fs = require('fs')
const User = require("../model/User")
const ErrorHandler = require('../utils/ErrorHandler')
const router = express.Router()
const jwt=require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const catchAsyncError=require('../middleware/catchAsyncError')
const sendToken = require('../utils/jwtToken')
const { isAuthenticated } = require('../middleware/auth')
router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try
    {
        const { name, email, password } = req.body;
    console.log(req.body)
    const userEmail = await User.findOne({ email })
    if(userEmail){
        const filename=req.file.filename;
        const filePath=`uploads/${filename}`
        fs.unlink(filePath,(err)=>{
            if(err)
            {
                console.log(err)
                res.status(500).json({message:"Error deleting Files"})
            }
           
        })
        return next(new ErrorHandler("user already exists", 400))
    }
    const fileName  = req.file.filename;
    const fileUrl = path.join(fileName)

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    }

   const activationToken=createActivationToken(user)
   console.log(activationToken)
   const activationUrl=`http://localhost:5173/activation/${activationToken}`
   try{
   await sendMail({
    email:user.email,
    subject:"Activate Your Account",
    message:`Hello ${user.name},Please click on the link to activate your account:${activationUrl}`
   })
   res.status(201).json({
    success:true,
    message:`Please check your Mail:-${user.email} to activate Your Account`
   })
   }
   catch(err)
   {
    return next(new ErrorHandler(err.message,400))
   }
    }
    catch(err)
    {
        return next(new ErrorHandler(err.message,400))
    }
})
const createActivationToken=(user)=>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
}


//create activation
router.post("/activation",catchAsyncError(async(req,res,next)=>{
    try{
  const{ activation_token }=req.body
  const newToken=activation_token.activation_token
  const newUser=jwt.verify(newToken,process.env.ACTIVATION_SECRET)
  if(!newUser)
  {
    return next(new ErrorHandler("invalid token",400))
    }
    const{email,password,name,avatar}=newUser
   await User.create({name,email,password,avatar})
   sendToken(newUser,201,res)

}
    catch(err){
       return next(new ErrorHandler(err.message,500))
    }
}))
router.post("/login-user",catchAsyncError(async(req,res,next)=>{
    try{
 const {email,password}=req.body
 console.log(req.body)
 if(!email || !password)
 {
    return next(new ErrorHandler("please Provide All fields",400))
 }
 const user=await User.findOne({email}).select("+password")
 if(!user)
 {
    return next(new ErrorHandler("Requested user not found",400))
 }
 const isPassword=user.comparePassword(password)
 if(!isPassword)
 {
    return next(new ErrorHandler("Invalid Credentials",400))
 }
 sendToken(user,201,res)
    }
    catch(err)
    {
        return next(new ErrorHandler(err.message,500))
    }
}))
//get user
router.get("getuser",isAuthenticated,catchAsyncError(async(req,res,next)=>{
    try{
  const user=await User.findById(req.user.id)
  if(!user){
    return next(new ErrorHandler("Requested user not found")) 
  }
    }
    catch(err)
    {
        return next(new ErrorHandler(err.message,500)) 
    }
}))
module.exports = router;