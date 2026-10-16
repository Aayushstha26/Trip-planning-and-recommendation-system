import { z } from "zod";

const uuid = z.string().uuid("Invalid Destination ID");

const difficulty = z.enum(["EASY", "MODERATE", "HARD"], {
  errorMap: () => ({ message: "Difficulty must be EASY, MODERATE, or HARD" }),
});

const month = z
  .string()
  .trim()
  .toUpperCase()
  .pipe(
    z.enum([
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    ], {
      errorMap: () => ({ message: "Season must be a valid month (e.g. OCTOBER, MARCH)" }),
    })
  );

const unique = (arr) => [...new Set(arr)];

const parseArray = (itemValidator) =>
  z.preprocess((val) => {
    if (val === undefined || val === null || val === "") return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, z.array(itemValidator).transform(unique).default([]));

const parseOptionalArray = (itemValidator) =>
  z.preprocess((val) => {
    if (val === undefined) return undefined;
    if (val === null || val === "") return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return val;
  }, z.array(itemValidator).transform(unique).optional());

const tagItem = z.string().trim().toLowerCase().min(1).max(30);

export const createDestinationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters").max(100),
  region: z.string({ required_error: "Region is required" }).trim().min(2, "Region must be at least 2 characters").max(100),
  description: z.string().trim().max(2000).nullable().optional(),
  latitude: z.coerce.number({ required_error: "Latitude is required", invalid_type_error: "Latitude must be a number" }).min(-90).max(90),
  longitude: z.coerce.number({ required_error: "Longitude is required", invalid_type_error: "Longitude must be a number" }).min(-180).max(180),
  maxAltitudeM: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
    z.number().int().min(0).max(9000).nullable().optional()
  ),
  durationDays: z.coerce.number({ required_error: "Duration is required", invalid_type_error: "Duration must be a number" }).int().min(1).max(60),
  estimatedBudget: z.coerce.number({ required_error: "Estimated budget is required", invalid_type_error: "Estimated budget must be a number" }).int().positive().max(10_000_000),
  difficulty,
  bestSeasons: parseArray(month).optional(),
  tags: parseArray(tagItem).optional(),
  imageUrl: z.string().trim().url("Invalid image URL").nullable().optional(),
});

export const updateDestinationSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100).optional(),
    region: z.string().trim().min(2, "Region must be at least 2 characters").max(100).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
    latitude: z.coerce.number({ invalid_type_error: "Latitude must be a number" }).min(-90).max(90).optional(),
    longitude: z.coerce.number({ invalid_type_error: "Longitude must be a number" }).min(-180).max(180).optional(),
    maxAltitudeM: z.preprocess(
      (val) => (val === "" || val === null ? null : val === undefined ? undefined : Number(val)),
      z.number().int().min(0).max(9000).nullable().optional()
    ),
    durationDays: z.coerce.number({ invalid_type_error: "Duration must be a number" }).int().min(1).max(60).optional(),
    estimatedBudget: z.coerce.number({ invalid_type_error: "Estimated budget must be a number" }).int().positive().max(10_000_000).optional(),
    difficulty: difficulty.optional(),
    bestSeasons: parseOptionalArray(month),
    tags: parseOptionalArray(tagItem),
    imageUrl: z.string().trim().url("Invalid image URL").nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

export const destinationIdParamSchema = z.object({
  id: uuid,
});

export const listDestinationsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().min(1).optional(),
  difficulty: z.string().trim().toUpperCase().pipe(difficulty).optional(),
  maxBudget: z.coerce.number().int().positive().optional(),
  maxDuration: z.coerce.number().int().positive().optional(),
  tag: z.string().trim().toLowerCase().min(1).optional(),
  season: month.optional(),
  sortBy: z
    .enum(["name", "estimatedBudget", "durationDays", "createdAt"])
    .default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});