import { z } from 'zod'

const RecordType = z.enum(['EXPENSE', 'INCOME'])

export const createRecordSchema = z.object({
   title: z.string().min(3, 'Minimum 3 charachers').max(45, 'Maximum 45 characters'),
   amount: z.coerce.number(),
   date: z.coerce.date(),
   note: z.string().nullish(),
   type: RecordType,

   accountId: z.string().min(1, 'Must provide account ID'),
   categoryId: z.string().nullish(),
   goalId: z.string().nullish(),
})
export const updateRecordSchmea = createRecordSchema.merge(
   z.object({
      id: z.string().min(1, 'Must provide record ID'),
   }),
)

export type createRecordSchema = z.infer<typeof createRecordSchema>
export type updateRecordSchmea = z.infer<typeof updateRecordSchmea>
