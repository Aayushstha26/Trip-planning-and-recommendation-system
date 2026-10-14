import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import {
  upsertPreferenceSchema,
  groupIdParamSchema,
} from "../../module/perference/preference.validation.js";
import { preferenceController } from "../../module/perference/preference.controller.js";

const preferenceRouter = Router();


preferenceRouter.use(authenticate);
preferenceRouter.post(
  "/",
  validate(upsertPreferenceSchema),
  preferenceController.savePreference
);
preferenceRouter.post(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  validate(upsertPreferenceSchema),
  preferenceController.savePreference
);


preferenceRouter.get(
  "/:groupId/my",
  validate(groupIdParamSchema, "params"),
  preferenceController.getMyPreference
);

preferenceRouter.get(
  "/:groupId/group",
  validate(groupIdParamSchema, "params"),
  preferenceController.getGroupPreferences
);
preferenceRouter.get(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  preferenceController.getGroupPreferences
);


preferenceRouter.delete(
  "/:groupId/my",
  validate(groupIdParamSchema, "params"),
  preferenceController.deleteMyPreference
);
preferenceRouter.delete(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  preferenceController.deleteMyPreference
);

export default preferenceRouter;