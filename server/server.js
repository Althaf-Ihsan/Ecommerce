const app=require("./app");
const connectDatabase = require("./DB/Databse");
//handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server for handling uncaught exception`)
})
//config
if(process.env.NODE_ENV !=="production")
{
    require("dotenv").config({
        path:"server/config/.env",
    });
}
connectDatabase();
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})
//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
console.log(`shutting down the server for:${err.message}`)
console.log(console.log(`shutting down the server for promise rejection`))
server.close(()=>{
    process.exit(1);
})
})