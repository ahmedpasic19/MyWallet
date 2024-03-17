import { z } from 'zod'

export const createGoalSchema = z.object({
   name: z.string().min(3, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   note: z.string().max(255, 'Maximum 255 characters').nullish(),
   initialAmount: z.coerce.number().nullish(),
   target: z.coerce.number(),
   // userId: z.string().min(1, 'Must provide userId'),
})

export const updateGoalSchema = z.object({
   id: z.string().min(1, 'Must provide account ID'),
   name: z.string().min(3, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   note: z.string().max(255, 'Maximum 255 characters').nullish(),
   initialAmount: z.coerce.number().nullish(),
   target: z.coerce.number(),
   // userId: z.string().min(1, 'Must provide userId'),
})

export type createGoalSchema = z.infer<typeof createGoalSchema>
export type updateGoalSchema = z.infer<typeof updateGoalSchema>
