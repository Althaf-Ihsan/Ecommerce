class ErrorHandler extends Error{
    constructor(message,StatusCode)
    {
        super(message);
        this.StatusCode=StatusCode;
        Error.captureStackTrace(this,this.constructor);//this refers to the global context of all errors
    }                          //which error should be capture
}//Error is pushed to stack and retrieve 

//this-the error object which the stack trace should be captured
//this.constructor: the constructor function to omit from the stack trace
module.exports =ErrorHandler;