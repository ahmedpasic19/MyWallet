'use server'

import { PrismaClient } from '@prisma/client'

import { addAccountSchema } from '@/schemas/account.schema'

const prisma = new PrismaClient()

// Currently not by userId
export async function getUserAccounts() {
   const userAccounts = await prisma.walletAccounts.findMany()

   return { accounts: userAccounts }
}

export async function addAccount(formData: FormData) {
   try {
      const data = {
         name: formData.get('name'),
         // userId: formData.get('userId'),
      }

      const validate = addAccountSchema.parse(data)

      const newAccount = await prisma.walletAccounts.create({
         data: validate,
      })

      return { message: 'Successfully created!', account: newAccount }
   } catch (error) {
      console.log(error)
   }
}
