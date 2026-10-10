import bcrypt from "bcryptjs";
import { userRepository } from "./user.repository.js";
import ApiError from "../../common/utils/apiError.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../../common/utils/jwt.js";
import { Role } from "../../generated/prisma/client.js";

export const userServices = {
    register: async (email, name, password, role ) => {
        if (!email || !name || !password) {
            throw new ApiError("All fields (email, name, password) are required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await userRepository.getUserByEmail(normalizedEmail);
        if (existingUser) {
            throw new ApiError("User with this email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await userRepository.createUser({
                email: normalizedEmail,
                name: name.trim(),
                password: hashedPassword,
                role: role || Role.USER
            });
            return user;
        } catch (error) {
            if (error?.code === "P2002") {
                throw new ApiError("User with this email already exists", 409);
            }
            throw error;
        }
    },

    login: async (email, password) => {
        if (!email || !password) {
            throw new ApiError("Email and password are required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await userRepository.getUserByEmail(normalizedEmail);
        if (!user || !user.password) {
            throw new ApiError("Invalid user credentials", 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new ApiError("Invalid user credentials", 401);
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        const updatedUser = await userRepository.updateUserData({ refreshToken }, user.id);

        return {
            user: updatedUser,
            accessToken,
            refreshToken
        };
    },

    logout: async (id) => {
        return await userRepository.updateUserData({ refreshToken: null }, id);
    },

    refreshAccessToken: async (incomingRefreshToken) => {
        if (!incomingRefreshToken) {
            throw new ApiError("Refresh token is not provided", 400);
        }

        let decoded;
        try {
            decoded = verifyRefreshToken(incomingRefreshToken);
        } catch (e) {
            if (e.name === "TokenExpiredError") {
                throw new ApiError("Refresh token has expired, please log in again", 401);
            }
            throw new ApiError("Invalid refresh token", 401);
        }

        const user = await userRepository.getUserByIdWithRefreshToken(decoded.id);
        if (!user) {
            throw new ApiError("User no longer exists", 401);
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError("Invalid or expired refresh token", 401);
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(tokenPayload);
        const newRefreshToken = generateRefreshToken(tokenPayload);

        await userRepository.updateUserData({ refreshToken: newRefreshToken }, user.id);

        return { accessToken, newRefreshToken };
    },

    getCurrentUser: async (id) => {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return user;
    },

    updateProfile: async (id, data) => {
        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) {
            throw new ApiError("User not found", 404);
        }

        const updatePayload = {};
        if (data.name !== undefined) {
            updatePayload.name = data.name.trim();
        }

        return await userRepository.updateUserData(updatePayload, id);
    },

    changePassword: async (id, currentPassword, newPassword) => {
        const user = await userRepository.getUserByIdWithPassword(id);
        if (!user || !user.password) {
            throw new ApiError("User not found", 404);
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new ApiError("Current password is incorrect", 400);
        }

        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            throw new ApiError("New password must be different from current password", 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.updateUserData({ password: hashedPassword }, id);

        return { message: "Password updated successfully" };
    },

    getAllUsers: async ({ page = 1, limit = 10, search, role } = {}) => {
        const parsedPage = Math.max(1, Number(page) || 1);
        const parsedLimit = Math.min(100, Math.max(1, Number(limit) || 10));
        const skip = (parsedPage - 1) * parsedLimit;

        const [users, total] = await Promise.all([
            userRepository.getAllUsers({ skip, take: parsedLimit, search, role }),
            userRepository.countUsers({ search, role })
        ]);

        return {
            users,
            pagination: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(total / parsedLimit)
            }
        };
    },

    deleteUser: async (id) => {
        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) {
            throw new ApiError("User not found", 404);
        }

        return await userRepository.deleteUser(id);
    }
};
