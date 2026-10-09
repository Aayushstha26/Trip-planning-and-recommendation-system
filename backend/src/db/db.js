import pg from "pg";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const isCloudOrSsl = Boolean(
    connectionString?.includes("neon.tech") ||
    connectionString?.includes("sslmode=require") ||
    connectionString?.includes("supabase.co")
);

const pool = new pg.Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
    ...(isCloudOrSsl ? { ssl: { rejectUnauthorized: false } } : {})
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const connectDb = async () => {
    try {
        // Test connectivity through connection pool
        await pool.query("SELECT 1");
        console.log(" Database connected successfully");
    } catch (error) {
        console.error(" Database connection failed:");
        console.error(error.message || error);
        console.log(" Tip: Verify your DATABASE_URL in .env (ensure PostgreSQL is running and credentials are correct).");
    }
};

export default prisma;