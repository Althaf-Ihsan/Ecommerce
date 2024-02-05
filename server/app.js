const express=require("express")
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const ErrorHandler=require("./middleware/Error")
const bodyParser=require('body-parser')
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://127.0.0.1:5173/ ","http://localhost:5173"],
    credentials:true
}))


app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true}))
//import routes
const user=require("./controller/user")
app.use("/api/v2",user)
//for error handling
// app.use(ErrorHandler)
module.exports=app