import crypto from "crypto";
import ApiError from "../../common/utils/apiError.js";
import groupRepository from "./group.repository.js";

const generateInviteCode = async () => {
  for (let i = 0; i < 5; i++) {
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();
    if (!(await groupRepository.inviteCodeExists(code))) return code;
  }
  throw new ApiError("Could not generate invite code, try again", 500);
};

const ensureDestinationExists = async (destinationId) => {
  if (destinationId && !(await groupRepository.destinationExists(destinationId))) {
    throw new ApiError("Destination not found", 404);
  }
};

const getGroupOrThrow = async (id) => {
  const group = await groupRepository.findById(id);
  if (!group) throw new ApiError("Group not found", 404);
  return group;
};

const assertMember = (group, userId) => {
  if (!group.members.some((m) => m.userId === userId)) {
    throw new ApiError("You are not a member of this group", 403);
  }
};

const assertOwner = (group, userId) => {
  if (group.ownerId !== userId) {
    throw new ApiError("Only the group owner can do this", 403);
  }
};

const groupService = {
  async createGroup(userId, data) {
    const inviteCode = await generateInviteCode();

    return groupRepository.create({ ...data, ownerId: userId, inviteCode });
  },

  async selectDestination(userId, groupId, destinationId) {
    const group = await getGroupOrThrow(groupId);
    assertOwner(group, userId);
    await ensureDestinationExists(destinationId);

    return groupRepository.update(groupId, { destinationId });
  },

  getMyGroups(userId) {
    return groupRepository.findAllByUserId(userId);
  },

  async getGroupById(userId, groupId) {
    const group = await getGroupOrThrow(groupId);
    assertMember(group, userId);
    return group;
  },

  async updateGroup(userId, groupId, data) {
    const group = await getGroupOrThrow(groupId);
    assertOwner(group, userId);
    await ensureDestinationExists(data.destinationId);

    // Re-check dates against stored values when only one date is sent
    const startDate = data.startDate !== undefined ? data.startDate : group.startDate;
    const endDate = data.endDate !== undefined ? data.endDate : group.endDate;
    if (startDate && endDate && endDate < startDate) {
      throw new ApiError("End date must be on or after start date", 400);
    }

    return groupRepository.update(groupId, data);
  },

  async deleteGroup(userId, groupId) {
    const group = await getGroupOrThrow(groupId);
    assertOwner(group, userId);
    await groupRepository.delete(groupId);
  },

  async joinGroup(userId, inviteCode) {
    const group = await groupRepository.findByInviteCode(inviteCode.toUpperCase());
    if (!group) throw new ApiError("Invalid invite code", 404);

    const existing = await groupRepository.findMember(group.id, userId);
    if (existing) throw new ApiError("You are already a member of this group", 409);

    await groupRepository.addMember(group.id, userId);
    return groupRepository.findById(group.id);
  },

  async leaveGroup(userId, groupId) {
    const group = await getGroupOrThrow(groupId);
    assertMember(group, userId);

    if (group.ownerId === userId) {
      throw new ApiError("Owner cannot leave the group. Delete the group instead", 400);
    }

    await groupRepository.removeMember(groupId, userId);
  },

  async removeMember(ownerId, groupId, targetUserId) {
    const group = await getGroupOrThrow(groupId);
    assertOwner(group, ownerId);

    if (targetUserId === ownerId) {
      throw new ApiError("Owner cannot remove themselves", 400);
    }

    const member = group.members.find((m) => m.userId === targetUserId);
    if (!member) throw new ApiError("Member not found in this group", 404);

    await groupRepository.removeMember(groupId, targetUserId);
  },
};

export default groupService;