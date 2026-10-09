import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDb } from "./db/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log(` Server is running on http://localhost:${PORT}`);
    });
};

startServer();
