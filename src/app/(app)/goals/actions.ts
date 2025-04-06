'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { createGoalSchema, updateGoalSchema } from '@/schemas/goal.schema'

export async function getUserGoals() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const goals = await prisma.goal.findMany({ where: { userId: { equals: session.user.id } } })

   return { goals, status: 200 }
}

export async function getUserGoalsWithTotal() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const goals = await prisma.goal.findMany({
      where: { userId: { equals: session.user.id } },
      include: {
         Record: { select: { id: true, amount: true, type: true } },
         Transfer: { select: { id: true, amount: true, title: true } },
      },
   })

   // Sum the records for all goals
   const summedGoals = goals?.map((goal) => {
      const recordsSum = goal.Record.reduce(
         (prev, curr) => {
            if (curr.type === 'EXPENSE') return { ...prev, expense: prev.expense + curr.amount }
            if (curr.type === 'INCOME') return { ...prev, income: prev.income + curr.amount }

            return prev
         },
         { income: 0, expense: 0 },
      )

      // Sum the amount by transfer
      const transferAmount = goal.Transfer.reduce((prev, curr) => {
         return prev + curr.amount
      }, 0)

      // Total afet all the calculations
      const total = recordsSum.income - recordsSum.expense + transferAmount

      return { ...goal, total }
   })

   return { goals: summedGoals, status: 200 }
}

export async function getOneGoal(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const goal = await prisma.goal.findUnique({
      where: { id },
   })

   return { goal, status: 200 }
}

export async function addGoal(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      name: formData.get('name'),
      initialAmount: formData.get('initialAmount'),
      target: formData.get('target'),
      note: formData.get('note'),
   }

   const validate = createGoalSchema.parse(data)

   const newGoal = await prisma.goal.create({
      data: { ...validate, userId: session.user.id },
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, goal: newGoal }
}

export async function updateGoal(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      initialAmount: formData.get('initialAmount'),
      target: formData.get('target'),
      note: formData.get('note'),
   }

   const validate = updateGoalSchema.parse(data)

   const updateGoal = await prisma.goal.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, goal: updateGoal }
}

export async function deleteGoal(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const deletedGoal = await prisma.goal.delete({
      where: { id },
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')

   return { message: 'Goal deleted', status: 200, goal: deletedGoal }
}
