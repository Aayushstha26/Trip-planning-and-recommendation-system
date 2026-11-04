import prisma from "../../db/db.js";

const destinationSelect = { id: true, name: true, region: true };

const voteRepository = {
  findGroup(groupId) {
    return prisma.group.findUnique({
      where: { id: groupId },
      select: { id: true, destinationId: true },
    });
  },

  findMember(groupId, userId) {
    return prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
  },

  findVoteByMemberId(groupMemberId) {
    return prisma.vote.findUnique({ where: { groupMemberId } });
  },

  upsertVote(groupMemberId, destinationId) {
    return prisma.vote.upsert({
      where: { groupMemberId },
      update: { destinationId },
      create: { groupMemberId, destinationId },
      include: { destination: { select: destinationSelect } },
    });
  },

  deleteVote(groupMemberId) {
    return prisma.vote.delete({ where: { groupMemberId } });
  },

  // Every member of the group with their vote (null if not voted)
  findMembersWithVotes(groupId) {
    return prisma.groupMember.findMany({
      where: { groupId },
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        vote: {
          select: {
            destinationId: true,
            destination: { select: destinationSelect },
          },
        },
      },
      orderBy: { joinedAt: "asc" },
    });
  },
};

export default voteRepository;