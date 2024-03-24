'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { createTransferSchema, updateTransferSchema } from '@/schemas/transfer.schema'

// Currently not by userId
export async function getUserTransfers() {
   const userTransfers = await prisma.transfer.findMany({
      include: {
         accountFrom: { select: { name: true, id: true } },
         accountTo: { select: { name: true, id: true } },
      },
   })

   return { transfers: userTransfers }
}

export async function getOneTransfer(id: string) {
   const transfer = await prisma.transfer.findUnique({
      where: { id },
   })

   return { transfer }
}

export async function addTransfer(formData: FormData) {
   const data = {
      title: formData.get('title'),
      amount: formData.get('amount'),
      date: formData.get('date'),
      accountFromId: formData.get('accountFromId'),
      accountToId: formData.get('accountToId'),
      note: formData.get('note'),
   }

   const validate = createTransferSchema.parse(data)

   const newTransfer = await prisma.transfer.create({
      data: validate,
   })

   revalidatePath('/transfers')
   return { message: 'Successfully created!', transfer: newTransfer }
}

export async function updateTransfer(formData: FormData) {
   const data = {
      id: formData.get('id'),
      title: formData.get('title'),
      amount: formData.get('amount'),
      date: formData.get('date'),
      accountFromId: formData.get('accountFromId'),
      accountToId: formData.get('accountToId'),
      note: formData.get('note'),
   }

   const validate = updateTransferSchema.parse(data)

   const updatedTransfer = await prisma.transfer.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/transfers')
   return { message: 'Successfully updated!', transfer: updatedTransfer }
}

export async function deleteTransfer(id: string) {
   const deletedTransfer = await prisma.transfer.delete({
      where: { id },
   })

   revalidatePath('/transfers')
   return { message: 'Transfer deleted', transfer: deletedTransfer }
}
