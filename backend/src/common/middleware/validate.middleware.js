import ApiError from "../utils/apiError.js";

export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req[source]);
            if (!result.success) {
                const formattedErrors = result.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message
                }));
                const message = formattedErrors.map((err) => `${err.field}: ${err.message}`).join("; ");
                return next(new ApiError(message || "Validation error", 400, "", formattedErrors));
            }

            // In Express 5, req.query is a getter-only property on the prototype.
            // Using Object.defineProperty allows overriding it safely with the validated data.
            try {
                req[source] = result.data;
            } catch {
                Object.defineProperty(req, source, {
                    value: result.data,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
