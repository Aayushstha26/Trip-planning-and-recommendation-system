import prisma from "../../db/db.js";

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

const groupInclude = {
  owner: { select: userSelect },
  destination: true,
  members: {
    include: {
      user: { select: userSelect },
      preference: true,
    },
    orderBy: { joinedAt: "asc" },
  },
};

const groupRepository = {
  // Creates the group and adds the owner as an OWNER member in one transaction
  create({ ownerId, inviteCode, ...data }) {
    return prisma.group.create({
      data: {
        ...data,
        ownerId,
        inviteCode,
        members: { create: { userId: ownerId, role: "OWNER" } },
      },
      include: groupInclude,
    });
  },

  findById(id) {
    return prisma.group.findUnique({ where: { id }, include: groupInclude });
  },

  findByInviteCode(inviteCode) {
    return prisma.group.findUnique({ where: { inviteCode } });
  },

  findAllByUserId(userId) {
    return prisma.group.findMany({
      where: { members: { some: { userId } } },
      include: {
        owner: { select: userSelect },
        destination: true,
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  update(id, data) {
    return prisma.group.update({
      where: { id },
      data,
      include: groupInclude,
    });
  },

  delete(id) {
    return prisma.group.delete({ where: { id } });
  },

  findMember(groupId, userId) {
    return prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
  },

  addMember(groupId, userId) {
    return prisma.groupMember.create({
      data: { groupId, userId, role: "MEMBER" },
    });
  },

  removeMember(groupId, userId) {
    return prisma.groupMember.delete({
      where: { groupId_userId: { groupId, userId } },
    });
  },

  destinationExists(id) {
    return prisma.destination
      .findUnique({ where: { id }, select: { id: true } })
      .then(Boolean);
  },

  inviteCodeExists(inviteCode) {
    return prisma.group
      .findUnique({ where: { inviteCode }, select: { id: true } })
      .then(Boolean);
  },
};

export default groupRepository;
