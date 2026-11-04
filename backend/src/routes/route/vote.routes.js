import { Router } from "express";
import {validate} from "../../common/middleware/validate.middleware.js";
import {authenticate} from "../../common/middleware/auth.middleware.js";
import { castVoteSchema, groupIdParamSchema } from "../../module/vote/vote.validation.js";
import * as voteController from "../../module/vote/vote.controller.js";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", validate(groupIdParamSchema), voteController.getVotes);
router.put("/me", validate(castVoteSchema), voteController.castVote);
router.delete("/me", validate(groupIdParamSchema), voteController.withdrawVote);

export default router;