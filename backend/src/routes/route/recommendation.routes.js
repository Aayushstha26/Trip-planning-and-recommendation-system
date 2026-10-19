import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import { recommendationSchema } from "../../module/recommendation/recommendation.validation.js";
import { getRecommendations } from "../../module/recommendation/recommendation.controller.js";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get("/", validate(recommendationSchema), getRecommendations);

export default router;