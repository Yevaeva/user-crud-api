class AsyncFunctionResponse {
    constructor(hasError, data, error) {
        this.hasError = hasError;
        this.data = data;
        this.error = error;
    }
    
    static constructResponseModel(data) {
        return new AsyncFunctionResponse(false, data, null);
    }
    
    static constructResponseErrModel(error) {
        return new AsyncFunctionResponse(true, null, error);
    }
}

module.exports = AsyncFunctionResponse;
