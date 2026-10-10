import prisma from "../../db/db.js";

const SAFE_USER_SELECT = {
    id: true,
    email: true,
    name: true,
    role: true,
    createdAt: true,
    updatedAt: true
};

export const userRepository = {
    createUser: async (data) => {
        return prisma.user.create({
            data,
            select: SAFE_USER_SELECT
        });
    },

    getUserByEmail: async (email) => {
        return prisma.user.findUnique({
            where: { email }
        });
    },

    getUserById: async (id) => {
        return prisma.user.findUnique({
            where: { id: Number(id) },
            select: SAFE_USER_SELECT
        });
    },

    getUserByIdWithPassword: async (id) => {
        return prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                ...SAFE_USER_SELECT,
                password: true
            }
        });
    },

    getUserByIdWithRefreshToken: async (id) => {
        return prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                ...SAFE_USER_SELECT,
                refreshToken: true
            }
        });
    },

    updateUserData: async (data, id) => {
        return prisma.user.update({
            where: { id: Number(id) },
            data,
            select: SAFE_USER_SELECT
        });
    },

    getAllUsers: async ({ skip = 0, take = 10, search, role } = {}) => {
        const where = {};

        if (role) {
            where.role = role;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } }
            ];
        }

        return prisma.user.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            select: SAFE_USER_SELECT
        });
    },

    countUsers: async ({ search, role } = {}) => {
        const where = {};

        if (role) {
            where.role = role;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } }
            ];
        }

        return prisma.user.count({ where });
    },

    deleteUser: async (id) => {
        return prisma.user.delete({
            where: { id: Number(id) },
            select: SAFE_USER_SELECT
        });
    }
};
