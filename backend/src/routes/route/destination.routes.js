import { Router } from "express";
import { destinationController } from "../../module/destination/destination.controller.js";
import { authenticate, authorizeRoles } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import { upload } from "../../common/middleware/multer.middleware.js";
import {
  createDestinationSchema,
  updateDestinationSchema,
  destinationIdParamSchema,
  listDestinationsSchema,
} from "../../module/destination/destination.validation.js";

const router = Router();

// Public routes
router.get(
  "/",
  validate(listDestinationsSchema, "query"),
  destinationController.getAllDestinations
);

router.get(
  "/:id",
  validate(destinationIdParamSchema, "params"),
  destinationController.getDestinationById
);

// Admin-only routes with file upload support
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  validate(createDestinationSchema),
  destinationController.createDestination
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  validate(destinationIdParamSchema, "params"),
  validate(updateDestinationSchema),
  destinationController.updateDestination
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  validate(destinationIdParamSchema, "params"),
  destinationController.deleteDestination
);

export default router;
