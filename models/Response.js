class Response {
    constructor(hasError, body, errorCode, errorMessage) {
        this.hasError = hasError;
        this.body = body;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    
    static constructResponseModel(body) {
        return new Response(false, body, 0, null);
    }
    
    static constructResponseErrModel(errorCode = null, errorMessage = null) {
        return new Response(true, null, errorCode, errorMessage);
    }
}

module.exports = Response;
