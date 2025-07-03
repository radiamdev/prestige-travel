import { z } from 'zod'

export const contactFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    fullName: z.string().min(2, { message: 'Name is too short' }),
    subject: z.string().min(2, { message: 'Subject is required' }),
    message: z.string().optional(),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
