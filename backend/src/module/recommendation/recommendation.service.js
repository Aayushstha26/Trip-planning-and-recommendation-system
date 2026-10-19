import ApiError from "../../common/utils/apiError.js";
import {preferenceRepository} from "../perference/perference.repository.js";
import destinationRepository from "../destination/destination.repository.js";
import { recommendDestinations } from "../../common/utils/recommender.js";

export const getRecommendationsService = async (userId, groupId, { limit, lambda }) => {
    if (!(await preferenceRepository.groupExists(groupId))) {
      throw new ApiError("Group not found", 404);
    } 

    const caller = await preferenceRepository.findMember(groupId, userId);
    if (!caller) throw new ApiError("You are not a member of this group", 403);
    const members = await preferenceRepository.findAllByGroupId(groupId);

    const pending = members.filter((m) => !m.preference);
    if (pending.length > 0) {
      throw new ApiError(
        "All members must submit preferences first",
        409,
        pending.map((m) => ({ userId: m.user.id, name: m.user.name }))
      );
    }

    // 3. Run the pipeline: filter, cosine similarity, least misery, rank
    const destinations = await destinationRepository.findAll();

    const { ranked, excluded } = recommendDestinations({
      members: members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        preference: m.preference,
      })),
      destinations,
      lambda,
    });

    return {
      groupId,
      lambda,
      memberCount: members.length,
      totalDestinations: destinations.length,
      eligibleCount: ranked.length,
      excludedCount: excluded.length,
      recommendations: ranked.slice(0, limit),
      excluded,
    };
  }