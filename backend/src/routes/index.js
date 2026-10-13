import { Router } from "express";
import userRoutes from "./route/user.routes.js";
import groupRoutes from "./route/group.routes.js";

const apiRouter = Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/groups", groupRoutes);

export default apiRouter;