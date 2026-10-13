import { z } from 'zod'

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(50, { message: 'Full name cannot exceed 50 characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' }),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the Terms of Service & Privacy Policy',
    }),
})

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  agreeTerms: false,
}

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
})

export const loginDefaultValues = {
  email: '',
  password: '',
}
