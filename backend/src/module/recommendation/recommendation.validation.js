import { z } from "zod";

export const recommendationSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
  query: z.object({
    limit: z.coerce.number().int().min(1).max(20).default(5),
    // 0 = pure average, 1 = pure least misery
    lambda: z.coerce.number().min(0).max(1).default(0.5),
  }),
});