import prisma from "../../db/db.js";

const destinationRepository = {
  create(data) {
    return prisma.destination.create({ data });
  },

  findById(id) {
    return prisma.destination.findUnique({ where: { id } });
  },

  findByName(name) {
    if (!name) return null;
    return prisma.destination.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: "insensitive",
        },
      },
    });
  },

  // Returns [items, total] for pagination
  findMany({ where, orderBy, skip, take }) {
    return prisma.$transaction([
      prisma.destination.findMany({ where, orderBy, skip, take }),
      prisma.destination.count({ where }),
    ]);
  },

  update(id, data) {
    return prisma.destination.update({ where: { id }, data });
  },

  delete(id) {
    return prisma.destination.delete({ where: { id } });
  },
};

export default destinationRepository;