import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { userRepository } from "../../module/User/user.repository.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    let token = null;

    const authHeader = req.headers.authorization || req.headers.Authorization || req.cookies?.access_token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if (!token) {
        throw new ApiError("Authentication token is required", 401);
    }

    let decoded;
    try {
        decoded = verifyAccessToken(token);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError("Access token expired", 401);
        }
        throw new ApiError("Invalid access token", 401);
    }

    const user = await userRepository.getUserById(decoded.id);
    if (!user) {
        throw new ApiError("User not found or account deactivated", 401);
    }

    req.user = user;
    next();
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError("Access forbidden: insufficient permissions", 403));
        }
        next();
    };
};
