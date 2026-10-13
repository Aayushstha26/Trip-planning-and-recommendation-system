import { z } from "zod";

// Destination is selected later after system recommendation, so it is omitted from initial group creation
export const createGroupSchema = z
  .object({
    name: z
      .string({
        required_error: "Group name is required",
      })
      .trim()
      .min(2, {
        message: "Group name must be at least 2 characters",
      })
      .max(100, {
        message: "Group name cannot exceed 100 characters",
      }),
    startDate: z.coerce
      .date({
        invalid_type_error: "Start date must be a valid date",
      })
      .optional()
      .nullable(),
    endDate: z.coerce
      .date({
        invalid_type_error: "End date must be a valid date",
      })
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

// For updating group details (name, dates, or destination)
export const updateGroupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: "Group name must be at least 2 characters",
      })
      .max(100, {
        message: "Group name cannot exceed 100 characters",
      })
      .optional(),
    destinationId: z
      .string()
      .uuid({
        message: "Invalid destination ID format",
      })
      .optional()
      .nullable(),
    startDate: z.coerce
      .date({
        invalid_type_error: "Start date must be a valid date",
      })
      .optional()
      .nullable(),
    endDate: z.coerce
      .date({
        invalid_type_error: "End date must be a valid date",
      })
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      const fields = [data.name, data.destinationId, data.startDate, data.endDate];
      return fields.some((val) => val !== undefined);
    },
    {
      message: "At least one field must be provided for update",
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

// For selecting a recommended destination for the group
export const selectDestinationSchema = z.object({
  destinationId: z
    .string({
      required_error: "Destination ID is required",
    })
    .uuid({
      message: "Invalid destination ID format",
    }),
});

export const groupIdParamSchema = z.object({
  id: z.string().uuid({
    message: "Group ID must be a valid UUID",
  }),
});

export const joinGroupSchema = z.object({
  inviteCode: z
    .string({
      required_error: "Invite code is required",
    })
    .trim()
    .min(1, {
      message: "Invite code is required",
    })
    .max(50, {
      message: "Invite code cannot exceed 50 characters",
    }),
});

export const removeMemberSchema = z.object({
  id: z.string().uuid({
    message: "Group ID must be a valid UUID",
  }),
  userId: z.coerce.number().int().positive({
    message: "User ID must be a positive integer",
  }),
});
