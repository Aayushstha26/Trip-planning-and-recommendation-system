import { z } from 'zod'

export const createGroupSchema = z
  .object({
    name: z
      .string({ required_error: 'Group name is required' })
      .trim()
      .min(2, { message: 'Group name must be at least 2 characters' })
      .max(100, { message: 'Group name cannot exceed 100 characters' }),
    startDate: z.string().optional().or(z.literal('')),
    endDate: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate)
      }
      return true
    },
    {
      message: 'End date must be on or after start date',
      path: ['endDate'],
    }
  )

export const createGroupDefaultValues = {
  name: '',
  startDate: '',
  endDate: '',
}

export const joinGroupSchema = z.object({
  inviteCode: z
    .string({ required_error: 'Invite code is required' })
    .trim()
    .min(1, { message: 'Please enter an invite code' })
    .max(50, { message: 'Invite code cannot exceed 50 characters' }),
})

export const joinGroupDefaultValues = {
  inviteCode: '',
}
