const sendToken=(user,statusCode,res)=>{
    console.log(user)
    const Token=user.getJwtToken();
    //options for cookies
    const options={
        expires:new Date(Date.now(+90*24*60*60*1000)),
        httpOnly:true
    }
    res.status(statusCode).cookie("token",Token,options).json({
        success:true,
        user,
        Token

    })
}
module.exports=sendToken