import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiError from "../../common/utils/apiError.js";
import { preferenceService } from "./preference.service.js";

const getGroupId = (req) => {
    const groupId = req.params.groupId || req.params.id || req.body?.groupId || req.query?.groupId;
    if (!groupId) {
        throw new ApiError("Group ID is required", 400);
    }
    return groupId;
};

export const preferenceController = {
    savePreference: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        const preference = await preferenceService.saveMyPreference(req.user.id, groupId, req.body);
        res.status(201).json({ success: true, data: preference });
    }),
    saveMyPreference: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        const preference = await preferenceService.getMyPreference(req.user.id, groupId);
        res.status(200).json({ success: true, data: preference });
    }),
    getMyPreference: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        const preference = await preferenceService.getMyPreference(req.user.id, groupId);
        res.status(200).json({ success: true, data: preference });
    }),
    getGroupPreferences: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        const preferences = await preferenceService.getGroupPreferences(req.user.id, groupId);
        res.status(200).json({ success: true, data: preferences });
    }),
    getAllPreferences: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        const preferences = await preferenceService.getGroupPreferences(req.user.id, groupId);
        res.status(200).json({ success: true, data: preferences });
    }),
    deleteMyPreference: asyncHandler(async (req, res) => {
        const groupId = getGroupId(req);
        await preferenceService.deleteMyPreference(req.user.id, groupId);
        res.status(200).json({ success: true, message: "Preference deleted successfully" });
    })
};

export default preferenceController;