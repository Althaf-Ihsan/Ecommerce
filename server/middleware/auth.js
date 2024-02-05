const ErrorHandler=require("../utils/ErrorHandler")
const catchAsyncErrors=require("../middleware/catchAsyncError")
const JWT=require("jsonwebtoken")
const User=require("../model/User")
const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler("please Login to countinue",401))
    }
    const decoded=JWT.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id)
    next();
})
module.exports={
    isAuthenticated
}