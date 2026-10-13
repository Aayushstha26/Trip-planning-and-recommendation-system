import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import {
  createGroupSchema,
  updateGroupSchema,
  groupIdParamSchema,
  joinGroupSchema,
  removeMemberSchema,
  selectDestinationSchema,
} from "../../module/Group/group.validation.js";
import * as groupController from "../../module/Group/group.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", validate(createGroupSchema), groupController.createGroup);
router.get("/", groupController.getMyGroups);
router.post("/join", validate(joinGroupSchema), groupController.joinGroup);

router.get("/:id", validate(groupIdParamSchema, "params"), groupController.getGroupById);
router.patch(
  "/:id",
  validate(groupIdParamSchema, "params"),
  validate(updateGroupSchema),
  groupController.updateGroup
);
router.patch(
  "/:id/destination",
  validate(groupIdParamSchema, "params"),
  validate(selectDestinationSchema),
  groupController.selectDestination
);
router.delete("/:id", validate(groupIdParamSchema, "params"), groupController.deleteGroup);

router.post("/:id/leave", validate(groupIdParamSchema, "params"), groupController.leaveGroup);
router.delete(
  "/:id/members/:userId",
  validate(removeMemberSchema, "params"),
  groupController.removeMember
);

export default router;