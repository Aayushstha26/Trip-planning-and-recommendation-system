import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().trim().email({
        message: "Invalid email address"
    }),
    name: z.string().trim().min(2, {
        message: "Name must be at least 2 characters"
    }).max(50, {
        message: "Name cannot exceed 50 characters"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }).max(100, {
        message: "Password cannot exceed 100 characters"
    }),
    role: z.enum(["USER", "ADMIN"]).optional()
});

export const loginSchema = z.object({
    email: z.string().trim().email({
        message: "Invalid email address"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().optional()
});

export const updateProfileSchema = z.object({
    name: z.string().trim().min(2, {
        message: "Name must be at least 2 characters"
    }).max(50, {
        message: "Name cannot exceed 50 characters"
    }).optional()
}).refine(data => data.name !== undefined, {
    message: "At least one field (name) must be provided for update"
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, {
        message: "Current password is required"
    }),
    newPassword: z.string().min(8, {
        message: "New password must be at least 8 characters"
    }).max(100, {
        message: "New password cannot exceed 100 characters"
    })
});

export const getUsersQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    role: z.enum(["USER", "ADMIN"]).optional(),
    search: z.string().trim().optional()
});

export const userIdParamSchema = z.object({
    id: z.coerce.number().int().positive({
        message: "User ID must be a positive integer"
    })
});
