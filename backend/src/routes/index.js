import { Router } from "express";
import userRoutes from "./route/user.routes.js";
import groupRoutes from "./route/group.routes.js";
import preferenceRoutes from "./route/preference.routes.js";

const apiRouter = Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/groups", groupRoutes);
apiRouter.use("/preferences", preferenceRoutes);
export default apiRouter;