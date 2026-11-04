import { z } from "zod";

const uuid = z.string().uuid("Invalid ID");

export const castVoteSchema = z.object({
  params: z.object({ id: uuid }),
  body: z.object({ destinationId: uuid }),
});

export const groupIdParamSchema = z.object({
  params: z.object({ id: uuid }),
});