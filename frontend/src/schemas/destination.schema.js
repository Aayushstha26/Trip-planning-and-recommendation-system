import { z } from "zod";

export const destinationFormSchema = z.object({
  name: z
    .string({ required_error: "Destination name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  region: z
    .string({ required_error: "Region is required" })
    .trim()
    .min(2, "Region must be at least 2 characters")
    .max(100, "Region cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional()
    .or(z.literal("")),

  difficulty: z.enum(["EASY", "MODERATE", "HARD"], {
    required_error: "Difficulty is required",
  }),

  estimatedBudget: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .positive("Budget must be a positive number")
    .max(10_000_000)
    .optional()
    .or(z.literal("")),

  durationDays: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .min(1, "Duration must be at least 1 day")
    .max(60, "Duration cannot exceed 60 days")
    .optional()
    .or(z.literal("")),

  latitude: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional()
    .or(z.literal("")),

  longitude: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional()
    .or(z.literal("")),

  maxAltitudeM: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .min(0)
    .max(9000, "Altitude cannot exceed 9000m")
    .optional()
    .or(z.literal("")),

  // Comma-separated tags string — transformed on submit
  tags: z.string().trim().optional().or(z.literal("")),

  // bestSeasons is managed separately as an array state (not registered via RHF)
});

export const destinationFormDefaults = {
  name: "",
  region: "",
  description: "",
  difficulty: "EASY",
  estimatedBudget: "",
  durationDays: "",
  latitude: "",
  longitude: "",
  maxAltitudeM: "",
  tags: "",
};

