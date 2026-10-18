import fs from "fs";
import ApiError from "../../common/utils/apiError.js";
import destinationRepository from "./destination.repository.js";
import { uploadOnCloudinary } from "../../common/utils/cloudinary.js";

const cleanupTempFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete temp file:", err);
    }
  }
};

const ensureNameAvailable = async (name, excludeId) => {
  if (!name) return;
  const existing = await destinationRepository.findByName(name);
  if (existing && existing.id !== excludeId) {
    throw new ApiError("A destination with this name already exists", 409);
  }
};

const buildWhere = (q) => {
  const where = {};

  if (q.search && q.search.trim()) {
    where.OR = [
      { name: { contains: q.search.trim(), mode: "insensitive" } },
      { region: { contains: q.search.trim(), mode: "insensitive" } },
    ];
  }
  if (q.difficulty) where.difficulty = q.difficulty;
  if (q.maxBudget) where.estimatedBudget = { lte: Number(q.maxBudget) };
  if (q.maxDuration) where.durationDays = { lte: Number(q.maxDuration) };
  if (q.tag) where.tags = { has: q.tag.toLowerCase().trim() };
  if (q.season) where.bestSeasons = { has: q.season.toUpperCase().trim() };

  return where;
};

const destinationService = {
  createDestination: async (data, file) => {
    await ensureNameAvailable(data.name);

    let imageUrl = data.imageUrl || null;
    if (file?.path) {
      try {
        const uploadResult = await uploadOnCloudinary(file.path, "destinations");
        if (uploadResult?.secure_url || uploadResult?.url) {
          imageUrl = uploadResult.secure_url || uploadResult.url;
        }
      } catch (error) {
        cleanupTempFile(file.path);
        throw new ApiError("Failed to upload destination image", 500);
      }
    }

    return destinationRepository.create({
      ...data,
      imageUrl,
    });
  },

  getAllDestinations: async (q = {}) => {
    const page = Math.max(1, Number(q.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(q.limit) || 10));
    const sortBy = ["name", "estimatedBudget", "durationDays", "createdAt"].includes(q.sortBy)
      ? q.sortBy
      : "name";
    const order = q.order === "desc" ? "desc" : "asc";

    const [items, total] = await destinationRepository.findMany({
      where: buildWhere(q),
      orderBy: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getDestinationById: async (id) => {
    const destination = await destinationRepository.findById(id);
    if (!destination) throw new ApiError("Destination not found", 404);
    return destination;
  },

  updateDestination: async (id, data, file) => {
    await destinationService.getDestinationById(id);
    if (data.name) {
      await ensureNameAvailable(data.name, id);
    }

    const updatePayload = { ...data };

    if (file?.path) {
      try {
        const uploadResult = await uploadOnCloudinary(file.path, "destinations");
        if (uploadResult?.secure_url || uploadResult?.url) {
          updatePayload.imageUrl = uploadResult.secure_url || uploadResult.url;
        }
      } catch (error) {
        cleanupTempFile(file.path);
        throw new ApiError("Failed to upload destination image", 500);
      }
    }

    return destinationRepository.update(id, updatePayload);
  },

  deleteDestination: async (id) => {
    await destinationService.getDestinationById(id);
    await destinationRepository.delete(id);
  },
};

// Alias create to createDestination for backward/forward compatibility
destinationService.create = destinationService.createDestination;

export { destinationService };
export default destinationService;