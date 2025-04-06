import { z } from 'zod'

export const createTransferSchema = z.object({
   title: z.string().min(3, 'Minimum 3 characters').max(45, 'Maximum 3 characters'),
   amount: z.coerce.number(),
   date: z.coerce.date(),
   note: z.string().nullish(),
   accountFromId: z.string().min(1, 'Must provide account ID'),
   accountToId: z.string().min(1, 'Must provide account ID'),
   goalId: z.string().nullish(),
})
export const updateTransferSchema = createTransferSchema.merge(
   z.object({
      id: z.string().min(1, 'Must provide transfer ID'),
   }),
)

export type createTransferSchema = z.infer<typeof createTransferSchema>
export type updateTransferSchema = z.infer<typeof updateTransferSchema>
