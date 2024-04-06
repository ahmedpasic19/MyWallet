'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { addAccountSchema, updateAccountSchema } from '@/schemas/account.schema'

export async function getUserAccounts() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const userAccounts = await prisma.walletAccounts.findMany({
      where: { userId: { equals: session.user.id } },
   })

   return { accounts: userAccounts, status: 200 }
}

export async function getUserAccountsWithTotal() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const userAccounts = await prisma.walletAccounts.findMany({
      where: { userId: { equals: session.user.id } },
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

   return { accounts: summedAccounts, status: 200 }
}

export async function getOneAccount(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const account = await prisma.walletAccounts.findUnique({
      where: { id },
   })

   return { account, status: 200 }
}

export async function addAccount(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      name: formData.get('name'),
      note: formData.get('note'),
   }

   const validate = addAccountSchema.parse(data)

   const newAccount = await prisma.walletAccounts.create({
      data: { ...validate, userId: session.user.id },
   })

   revalidatePath('/accounts')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, account: newAccount }
}

export async function updateAccount(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      note: formData.get('note'),
   }

   const validate = updateAccountSchema.parse(data)

   const newAccount = await prisma.walletAccounts.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/accounts')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, account: newAccount }
}

export async function deleteAccount(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const deletedAccount = await prisma.walletAccounts.delete({
      where: { id },
   })

   revalidatePath('/accounts')
   revalidatePath('/dashboard')

   return { message: 'Account deleted', status: 200, account: deletedAccount }
}
