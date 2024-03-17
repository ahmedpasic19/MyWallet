import { z } from 'zod'

export const createCategorySchema = z.object({
   name: z.string().min(3, 'Minimum 3 characters').max(45, 'Maximum 45 characters'),
   note: z.string().nullish(),
   budget: z.coerce.number(),
   // userId: z.string().min(1, 'Must provide userId'),
})
export const updateCategorySchema = createCategorySchema.merge(
   z.object({
      id: z.string().min(1, 'Must provide category ID'),
   }),
)

export type createCategorySchema = z.infer<typeof createCategorySchema>
export type updateCategorySchema = z.infer<typeof updateCategorySchema>
