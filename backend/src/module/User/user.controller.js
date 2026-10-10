import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiError from "../../common/utils/apiError.js";
import { userServices } from "./user.services.js";

const isProduction = process.env.NODE_ENV === "production";

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const userController = {
    register: asyncHandler(async (req, res) => {
        const { email, name, password, role } = req.body;
        const user = await userServices.register(email, name, password, role);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await userServices.login(email, password);

        res.cookie("access_token", accessToken, ACCESS_COOKIE_OPTIONS);
        res.cookie("refresh_token", refreshToken, REFRESH_COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            accessToken,
            refreshToken
        });
    }),

    logout: asyncHandler(async (req, res) => {
        const id = req.user.id;
        await userServices.logout(id);

        res.clearCookie("access_token", ACCESS_COOKIE_OPTIONS);
        res.clearCookie("refresh_token", REFRESH_COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }),

    refreshAccessToken: asyncHandler(async (req, res) => {
        const incomingRefreshToken = req.cookies?.refresh_token || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError("Refresh token is required via cookie or request body", 400);
        }

        const { accessToken, newRefreshToken } = await userServices.refreshAccessToken(incomingRefreshToken);

        res.cookie("access_token", accessToken, ACCESS_COOKIE_OPTIONS);
        res.cookie("refresh_token", newRefreshToken, REFRESH_COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken,
            refreshToken: newRefreshToken
        });
    }),

    getCurrentUser: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const user = await userServices.getCurrentUser(userId);

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        });
    }),

    updateProfile: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const updatedUser = await userServices.updateProfile(userId, req.body);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    }),

    changePassword: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const result = await userServices.changePassword(userId, currentPassword, newPassword);

        return res.status(200).json({
            success: true,
            message: result.message
        });
    }),

    getAllUsers: asyncHandler(async (req, res) => {
        const { page, limit, search, role } = req.query;
        const result = await userServices.getAllUsers({ page, limit, search, role });

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            ...result
        });
    }),

    deleteUser: asyncHandler(async (req, res) => {
        const targetUserId = Number(req.params.id);

        // Allow user to delete their own account or admin to delete any account
        if (req.user.role !== "ADMIN" && req.user.id !== targetUserId) {
            throw new ApiError("You are not authorized to delete this user", 403);
        }

        const deletedUser = await userServices.deleteUser(targetUserId);

        // If self deleted, clear auth cookies
        if (req.user.id === targetUserId) {
            res.clearCookie("access_token", ACCESS_COOKIE_OPTIONS);
            res.clearCookie("refresh_token", REFRESH_COOKIE_OPTIONS);
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser
        });
    })
};

export default userController;