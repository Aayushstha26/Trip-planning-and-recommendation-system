import { z } from "zod";

const uuid = z.string().uuid("Invalid Group ID");

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export const upsertPreferenceSchema = z.object({
  groupId: uuid.optional(),
  budget: z.coerce
    .number({ invalid_type_error: "Budget must be a number" })
    .int("Budget must be a whole number")
    .positive("Budget must be greater than 0")
    .max(10_000_000, "Budget is too large"),
  difficulty: z.enum(["EASY", "MODERATE", "HARD"], {
    errorMap: () => ({ message: "Difficulty must be EASY, MODERATE or HARD" }),
  }),
  maxDurationDays: z.coerce
    .number({ invalid_type_error: "Duration must be a number" })
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 day")
    .max(60, "Duration cannot exceed 60 days"),
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest")
    .max(10, "Select at most 10 interests")
    .transform((arr) => [...new Set(arr)]),
  preferredSeason: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(z.enum(MONTHS, { errorMap: () => ({ message: "Invalid month" }) }))
    .nullable()
    .optional(),
});

export const groupIdParamSchema = z
  .object({
    groupId: uuid.optional(),
    id: uuid.optional(),
  })
  .refine((data) => data.groupId || data.id, {
    message: "Valid Group ID is required in URL parameters",
  });