import { z } from 'zod'

export const AVAILABLE_INTERESTS = [
  'Trekking & Hiking',
  'Mountain Views',
  'Cultural Heritage',
  'Spiritual & Temples',
  'Wildlife & Safari',
  'Adventure Sports',
  'Lakes & Waterfalls',
  'Photography',
  'Local Food & Culture',
  'Peace & Relaxation',
]

export const TRAVEL_MONTHS = [
  { value: 'OCTOBER', label: 'October', tag: 'Peak Autumn' },
  { value: 'NOVEMBER', label: 'November', tag: 'Clear Autumn' },
  { value: 'MARCH', label: 'March', tag: 'Spring Bloom' },
  { value: 'APRIL', label: 'April', tag: 'Warm Spring' },
  { value: 'MAY', label: 'May', tag: 'Late Spring' },
  { value: 'SEPTEMBER', label: 'September', tag: 'Post-Monsoon' },
  { value: 'DECEMBER', label: 'December', tag: 'Crisp Winter' },
  { value: 'JANUARY', label: 'January', tag: 'Quiet Winter' },
  { value: 'FEBRUARY', label: 'February', tag: 'Late Winter' },
  { value: 'JUNE', label: 'June', tag: 'Monsoon' },
  { value: 'JULY', label: 'July', tag: 'Rainy' },
  { value: 'AUGUST', label: 'August', tag: 'Rainy' },
]

export const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

export const preferenceSchema = z.object({
  budget: z.coerce
    .number({ invalid_type_error: 'Budget must be a number' })
    .int('Budget must be a whole number')
    .positive('Budget must be greater than NPR 0')
    .max(10_000_000, 'Budget is too large'),
  difficulty: z.enum(['EASY', 'MODERATE', 'HARD'], {
    errorMap: () => ({ message: 'Please select a difficulty level' }),
  }),
  maxDurationDays: z.coerce
    .number({ invalid_type_error: 'Duration must be a number' })
    .int('Duration must be a whole number')
    .min(1, 'Duration must be at least 1 day')
    .max(60, 'Duration cannot exceed 60 days'),
  interests: z
    .array(z.string())
    .min(1, 'Select at least one interest')
    .max(10, 'Select up to 10 interests'),
  preferredSeason: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === '' ? null : val)),
})

export const preferenceDefaultValues = {
  budget: 25000,
  difficulty: 'MODERATE',
  maxDurationDays: 7,
  interests: ['Trekking & Hiking', 'Mountain Views'],
  preferredSeason: 'AUTUMN',
}
