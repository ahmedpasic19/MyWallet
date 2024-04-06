'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { createTransferSchema, updateTransferSchema } from '@/schemas/transfer.schema'

export async function getUserTransfers() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const userTransfers = await prisma.transfer.findMany({
      where: { userId: { equals: session.user.id } },
      include: {
         accountFrom: { select: { name: true, id: true } },
         accountTo: { select: { name: true, id: true } },
      },
   })

   return { transfers: userTransfers, status: 200 }
}

export async function getOneTransfer(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const transfer = await prisma.transfer.findUnique({
      where: { id },
   })

   return { transfer, status: 200 }
}

export async function addTransfer(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

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
      data: { ...validate, userId: session.user.id },
   })

   revalidatePath('/transfers')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, transfer: newTransfer }
}

export async function updateTransfer(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

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
   revalidatePath('/dashboard')

   return { message: 'Successfully updated!', staus: 200, transfer: updatedTransfer }
}

export async function deleteTransfer(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const deletedTransfer = await prisma.transfer.delete({
      where: { id },
   })

   revalidatePath('/transfers')
   revalidatePath('/dashboard')

   return { message: 'Transfer deleted', status: 200, transfer: deletedTransfer }
}
