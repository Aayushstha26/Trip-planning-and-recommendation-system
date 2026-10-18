import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import {
  upsertPreferenceSchema,
  groupIdParamSchema,
} from "../../module/perference/preference.validation.js";
import { preferenceController } from "../../module/perference/preference.controller.js";

const router = Router();


router.use(authenticate);
router.post(
  "/",
  validate(upsertPreferenceSchema),
  preferenceController.savePreference
);
router.post(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  validate(upsertPreferenceSchema),
  preferenceController.savePreference
);


router.get(
  "/:groupId/my",
  validate(groupIdParamSchema, "params"),
  preferenceController.getMyPreference
);

router.get(
  "/:groupId/group",
  validate(groupIdParamSchema, "params"),
  preferenceController.getGroupPreferences
);
router.get(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  preferenceController.getGroupPreferences
);


router.delete(
  "/:groupId/my",
  validate(groupIdParamSchema, "params"),
  preferenceController.deleteMyPreference
);
router.delete(
  "/:groupId",
  validate(groupIdParamSchema, "params"),
  preferenceController.deleteMyPreference
);

export default router;