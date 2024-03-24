'use server'

import { RecordType } from '@prisma/client'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { createRecordSchema, updateRecordSchmea } from '@/schemas/record.schema'

// Currently not by userId
export async function getUserRecordsByType(type: RecordType) {
   const userRecords = await prisma.record.findMany({
      where: { type },
      include: {
         account: { select: { name: true, id: true } },
         category: { select: { id: true, name: true } },
         goal: { select: { id: true, name: true } },
      },
   })

   return { records: userRecords }
}

export async function getOneRecord(id: string) {
   const record = await prisma.record.findUnique({
      where: { id },
   })

   return { record }
}

export async function addRecord(formData: FormData) {
   const data = {
      title: formData.get('title'),
      type: formData.get('type'),
      date: formData.get('date'),
      amount: formData.get('amount'),
      note: formData.get('note'),
      accountId: formData.get('accountId'),
      categoryId: formData.get('categoryId'),
      goalId: formData.get('goalId'),
   }

   const validate = createRecordSchema.parse(data)

   const newRecord = await prisma.record.create({
      data: validate,
   })

   if (validate.type === 'EXPENSE') revalidatePath('/expense')
   if (validate.type === 'INCOME') revalidatePath('/income')
   return { message: 'Successfully created!', record: newRecord }
}

export async function updateRecord(formData: FormData) {
   const data = {
      id: formData.get('id'),
      title: formData.get('title'),
      type: formData.get('type'),
      date: formData.get('date'),
      amount: formData.get('amount'),
      note: formData.get('note'),
      accountId: formData.get('accountId'),
      categoryId: formData.get('categoryId'),
      goalId: formData.get('goalId'),
   }

   const validate = updateRecordSchmea.parse(data)

   const updatedRecord = await prisma.record.update({
      where: { id: validate.id },
      data: validate,
   })

   if (validate.type === 'EXPENSE') revalidatePath('/expense')
   if (validate.type === 'INCOME') revalidatePath('/income')
   return { message: 'Successfully updated!', record: updatedRecord }
}

export async function deleteRecord(id: string) {
   const deletedRecord = await prisma.record.delete({
      where: { id },
   })

   if (deletedRecord.type === 'EXPENSE') revalidatePath('/expense')
   if (deletedRecord.type === 'INCOME') revalidatePath('/income')
   return { message: 'Transfer deleted', record: deletedRecord }
}
