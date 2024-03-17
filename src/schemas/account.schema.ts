import { z } from 'zod'

export const addAccountSchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   note: z.string().nullish(),
   // userId: z.string().min(1, 'Must provide userId'),
})
export const updateAccountSchema = addAccountSchema.merge(
   z.object({
      id: z.string().min(1, 'Must provide account ID'),
   }),
)

export type addAccountSchema = z.infer<typeof addAccountSchema>
export type updateAccountSchema = z.infer<typeof updateAccountSchema>
