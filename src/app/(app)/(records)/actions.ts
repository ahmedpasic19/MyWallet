'use server'

import { RecordType } from '@prisma/client'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { createRecordSchema, updateRecordSchmea } from '@/schemas/record.schema'

export async function getUserRecordsByType(type: RecordType) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const userRecords = await prisma.record.findMany({
      where: { type, userId: { equals: session.user?.id } },
      include: {
         account: { select: { name: true, id: true } },
         category: { select: { id: true, name: true } },
         goal: { select: { id: true, name: true } },
      },
   })

   return { records: userRecords, status: 200 }
}

export async function getOneRecord(id: string) {
   const record = await prisma.record.findUnique({
      where: { id },
   })

   return { record }
}

export async function addRecord(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

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
      data: { ...validate, userId: session?.user.id },
   })

   if (validate.type === 'EXPENSE') revalidatePath('/expense')
   if (validate.type === 'INCOME') revalidatePath('/income')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', statsu: 200, record: newRecord }
}

export async function updateRecord(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

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
   revalidatePath('/dashboard')

   return { message: 'Successfully updated!', status: 200, record: updatedRecord }
}

export async function deleteRecord(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const deletedRecord = await prisma.record.delete({
      where: { id },
   })

   if (deletedRecord.type === 'EXPENSE') revalidatePath('/expense')
   if (deletedRecord.type === 'INCOME') revalidatePath('/income')
   revalidatePath('/dashboard')

   return { message: 'Transfer deleted', status: 200, record: deletedRecord }
}
