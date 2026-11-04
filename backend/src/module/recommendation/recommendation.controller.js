import asyncHandler from "../../common/utils/asyncHandler.js";
import recommendationService  from "./recommendation.service.js";

export const getRecommendations = asyncHandler(async (req, res) => {
    const data = await recommendationService.getRecommendations(
        req.user.id,
        req.params.id,
        req.validated.query
    );
    res.json({ success: true, data });
});