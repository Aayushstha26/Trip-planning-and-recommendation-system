import ApiError from "../../common/utils/apiError.js";
import { preferenceRepository } from "./perference.repository.js";

const getMembershipOrThrow = async (groupId, userId) => {
  if (!(await preferenceRepository.groupExists(groupId))) {
    throw new ApiError("Group not found", 404);
  }

  const member = await preferenceRepository.findMember(groupId, userId);
  if (!member) throw new ApiError("You are not a member of this group", 403);

  return member;
};

const preferenceService = {
  async saveMyPreference(userId, groupId, data) {
    const member = await getMembershipOrThrow(groupId, userId);

    return preferenceRepository.upsertByMemberId(member.id, {
      budget: data.budget,
      difficulty: data.difficulty,
      maxDurationDays: data.maxDurationDays,
      interests: data.interests,    
      preferredSeason: data.preferredSeason ?? null,
    });
  },

  async getMyPreference(userId, groupId) {
    const member = await getMembershipOrThrow(groupId, userId);

    const preference = await preferenceRepository.findByMemberId(member.id);
    if (!preference) throw new ApiError("You have not submitted preferences yet", 404);

    return preference;
  },

  async deleteMyPreference(userId, groupId) {
    const member = await getMembershipOrThrow(groupId, userId);

    const preference = await preferenceRepository.findByMemberId(member.id);
    if (!preference) throw new ApiError("You have not submitted preferences yet", 404);

    await preferenceRepository.deleteByMemberId(member.id);
  },

  async getGroupPreferences(userId, groupId) {
    await getMembershipOrThrow(groupId, userId);

    const members = await preferenceRepository.findAllByGroupId(groupId);

    return {
      submittedCount: members.filter((m) => m.preference).length,
      totalMembers: members.length,
      members,
    };
  },
};

export { preferenceService };