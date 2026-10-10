import { Router } from "express";
import userRoutes from "./user.routes.js";

const apiRouter = Router();

apiRouter.use("/users", userRoutes);

export default apiRouter;
