import { Router } from "express";
import userController from "../module/User/user.controller.js";
import { authenticate, authorizeRoles } from "../common/middleware/auth.middleware.js";
import { validate } from "../common/middleware/validate.middleware.js";
import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    updateProfileSchema,
    changePasswordSchema,
    getUsersQuerySchema,
    userIdParamSchema
} from "../module/User/user.validation.js";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.post("/refresh-token", validate(refreshTokenSchema), userController.refreshAccessToken);

// Protected routes (require valid JWT access token)
router.post("/logout", authenticate, userController.logout);
router.get("/me", authenticate, userController.getCurrentUser);
router.patch("/me", authenticate, validate(updateProfileSchema), userController.updateProfile);
router.patch("/change-password", authenticate, validate(changePasswordSchema), userController.changePassword);

router.get("/", authenticate, authorizeRoles("ADMIN"), validate(getUsersQuerySchema, "query"), userController.getAllUsers);

router.delete("/:id", authenticate, validate(userIdParamSchema, "params"), userController.deleteUser);

export default router;
