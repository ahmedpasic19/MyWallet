'use server'

import { PrismaClient } from '@prisma/client'

import { revalidatePath } from 'next/cache'

import { addAccountSchema, updateAccountSchema } from '@/schemas/account.schema'

const prisma = new PrismaClient()

// Currently not by userId
export async function getUserAccounts() {
   const userAccounts = await prisma.walletAccounts.findMany()

   return { accounts: userAccounts }
}

export async function getOneAccount(id: string) {
   const account = await prisma.walletAccounts.findUnique({
      where: { id },
   })

   return { account }
}

export async function addAccount(formData: FormData) {
   const data = {
      name: formData.get('name'),
      // userId: formData.get('userId'),
   }

   const validate = addAccountSchema.parse(data)

   const newAccount = await prisma.walletAccounts.create({
      data: validate,
   })

   revalidatePath('/accounts')
   return { message: 'Successfully created!', account: newAccount }
}

export async function updateAccount(formData: FormData) {
   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      // userId: formData.get('userId'),
   }

   const validate = updateAccountSchema.parse(data)

   const newAccount = await prisma.walletAccounts.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/accounts')
   return { message: 'Successfully created!', account: newAccount }
}

export async function deleteAccount(id: string) {
   const deletedAccount = await prisma.walletAccounts.delete({
      where: { id },
   })

   revalidatePath('/accounts')
   return { message: 'Account deleted', account: deletedAccount }
}
