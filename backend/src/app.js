import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/index.js";
import { errorHandler } from "./common/middleware/errorHandler.middleware.js";
import ApiError from "./common/utils/apiError.js";

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Trip planning backend API is running",
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use("/api/v1", apiRouter);
app.use("/api", apiRouter);

// 404 Not Found Handler
app.use((req, res, next) => {
    next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
