
class ApiError extends Error {
    statusCode;
    message;
    stack;
    errors;
    success;
    constructor(
        message,
        statusCode,
        stack = "",
        errors = []
    ) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.stack = stack;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export default ApiError