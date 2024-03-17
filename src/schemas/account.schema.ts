import { z } from 'zod'

export const addAccountSchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   // userId: z.string().min(1, 'Must provide userId'),
})

export type addAccountSchema = z.infer<typeof addAccountSchema>
