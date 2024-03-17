'use server'

import { PrismaClient } from '@prisma/client'

import { revalidatePath } from 'next/cache'

import { createGoalSchema, updateGoalSchema } from '@/schemas/goal.schema'

const prisma = new PrismaClient()

// Currently not by userId
export async function getUserGoals() {
   const goals = await prisma.goal.findMany()

   return { goals }
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
   return { message: 'Successfully created!', goal: updateGoal }
}

export async function deleteGoal(id: string) {
   const deletedGoal = await prisma.goal.delete({
      where: { id },
   })

   revalidatePath('/goals')
   return { message: 'Goal deleted', goal: deletedGoal }
}
