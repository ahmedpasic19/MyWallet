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

export async function getUserAccountsWithTotal() {
   const userAccounts = await prisma.walletAccounts.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
         Record: { select: { id: true, amount: true, type: true } },
         TransfersFrom: { select: { id: true, amount: true } },
         TransfersTo: { select: { id: true, amount: true } },
      },
   })

   // Sum all the records and transfers
   const summedAccounts = userAccounts.map((acc) => {
      const recordsSum = acc.Record.reduce(
         (prev, curr) => {
            if (curr.type === 'EXPENSE') return { ...prev, expense: prev.expense + curr.amount }
            if (curr.type === 'INCOME') return { ...prev, income: prev.income + curr.amount }

            return prev
         },
         { income: 0, expense: 0 },
      )

      const fromSum = acc.TransfersFrom.reduce((prev, curr) => prev + curr.amount, 0)
      const toSum = acc.TransfersTo.reduce((prev, curr) => prev + curr.amount, 0)

      // Total afet all the calculations
      const total = toSum + recordsSum.income - (fromSum + recordsSum.expense)

      return { ...acc, total }
   })

   return { accounts: summedAccounts }
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
      note: formData.get('note'),
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
      note: formData.get('note'),
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
