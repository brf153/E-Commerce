class ErrorHander extends Error{
    constructor(message,statusCode, success = false){
        super(message);
        this.statusCode = statusCode;
        this.success = success;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHander