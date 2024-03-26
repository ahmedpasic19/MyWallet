'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { createGoalSchema, updateGoalSchema } from '@/schemas/goal.schema'

// Currently not by userId
export async function getUserGoals() {
   const goals = await prisma.goal.findMany()

   return { goals }
}

export async function getUserGoalsWithTotal() {
   const goals = await prisma.goal.findMany({
      include: { Record: { select: { id: true, amount: true, type: true } } },
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

      // Total afet all the calculations
      const total = recordsSum.income - recordsSum.expense

      return { ...goal, total }
   })

   return { goals: summedGoals }
}

export async function getOneGoal(id: string) {
   const goal = await prisma.goal.findUnique({
      where: { id },
   })

   return { goal }
}

export async function addGoal(formData: FormData) {
   const data = {
      name: formData.get('name'),
      initialAmount: formData.get('initialAmount'),
      target: formData.get('target'),
      note: formData.get('note'),
      // userId: formData.get('userId'),
   }

   const validate = createGoalSchema.parse(data)

   const newGoal = await prisma.goal.create({
      data: validate,
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')
   return { message: 'Successfully created!', goal: newGoal }
}

export async function updateGoal(formData: FormData) {
   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      initialAmount: formData.get('initialAmount'),
      target: formData.get('target'),
      note: formData.get('note'),
      // userId: formData.get('userId'),
   }

   const validate = updateGoalSchema.parse(data)

   const updateGoal = await prisma.goal.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')
   return { message: 'Successfully created!', goal: updateGoal }
}

export async function deleteGoal(id: string) {
   const deletedGoal = await prisma.goal.delete({
      where: { id },
   })

   revalidatePath('/goals')
   revalidatePath('/dashboard')
   return { message: 'Goal deleted', goal: deletedGoal }
}
