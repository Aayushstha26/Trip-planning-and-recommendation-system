import prisma from "../../db/db.js";

export const preferenceRepository = {
  groupExists(groupId) {
    return prisma.group
      .findUnique({ where: { id: groupId }, select: { id: true } })
      .then(Boolean);
  },

  findMember(groupId, userId) {
    return prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
  },

  findByMemberId(groupMemberId) {
    return prisma.preference.findUnique({ where: { groupMemberId } });
  },

  upsertByMemberId(groupMemberId, data) {
    return prisma.preference.upsert({
      where: { groupMemberId },
      update: data,
      create: { ...data, groupMemberId },
    });
  },

  deleteByMemberId(groupMemberId) {
    return prisma.preference.delete({ where: { groupMemberId } });
  },

  findAllByGroupId(groupId) {
    return prisma.groupMember.findMany({
      where: { groupId },
      select: {
        id: true,
        role: true,
        user: { select: { id: true, name: true, avatar: true } },
        preference: true,
      },
      orderBy: { joinedAt: "asc" },
    });
  },
};

export default preferenceRepository;
