import ApiError from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";
    let errors = err.errors || [];

    // Handle Prisma unique constraint violation
    if (err.code === "P2002") {
        statusCode = 409;
        const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : "field";
        message = `Duplicate value for ${target}. Please use a different value.`;
    }

    // Handle Prisma not found
    if (err.code === "P2025") {
        statusCode = 404;
        message = "Record not found";
    }

    // Handle invalid JWT
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: errors.length > 0 ? errors : undefined,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};