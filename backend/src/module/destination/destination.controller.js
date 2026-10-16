import destinationService from "./destination.service.js";
import asyncHandler from "../../common/utils/asyncHandler.js";


export const destinationController = {
    createDestination: asyncHandler(async (req, res) => {
        const destination = await destinationService.createDestination(req.body, req.file);
        return res.status(201).json({
            success: true,
            message: "Destination created successfully",
            data: destination,
        });
    }),
    getAllDestinations: asyncHandler(async (req, res) => {
        const { items, pagination } = await destinationService.getAllDestinations(req.query);
        return res.status(200).json({
            success: true,
            message: "Destinations fetched successfully",
            data: items,
            pagination,
        });
    }),
    getDestinationById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const destination = await destinationService.getDestinationById(id);
        return res.status(200).json({
            success: true,
            message: "Destination fetched successfully",
            data: destination,
        });
    }),
    updateDestination: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const destination = await destinationService.updateDestination(id, req.body, req.file);
        return res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            data: destination,
        });
    }),
    deleteDestination: asyncHandler(async (req, res) => {
        const { id } = req.params;
        await destinationService.deleteDestination(id);
        return res.status(200).json({
            success: true,
            message: "Destination deleted successfully",
        });
    }),

}