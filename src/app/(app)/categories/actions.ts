'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { createCategorySchema, updateCategorySchema } from '@/schemas/category.schema'

export async function getUserCategories() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const userCategories = await prisma.category.findMany({
      where: { userId: { equals: session.user.id } },
   })

   return { categories: userCategories, status: 200 }
}

export async function getUserCategoriesWithTotal() {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const categories = await prisma.category.findMany({
      where: { userId: { equals: session.user.id } },
      include: { Record: { select: { id: true, amount: true, type: true } } },
   })

   // Sum the records for all categories
   const summedCategories = categories?.map((category) => {
      const recordsSum = category.Record.reduce(
         (prev, curr) => {
            if (curr.type === 'EXPENSE') return { ...prev, expense: prev.expense + curr.amount }
            if (curr.type === 'INCOME') return { ...prev, income: prev.income + curr.amount }

            return prev
         },
         { income: 0, expense: 0 },
      )

      // Total afet all the calculations
      const total = recordsSum.income - recordsSum.expense

      return { ...category, total }
   })

   return { categories: summedCategories, status: 200 }
}

export async function getOneCategory(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const category = await prisma.category.findUnique({
      where: { id },
   })

   return { category, status: 200 }
}

export async function addCategory(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      name: formData.get('name'),
      note: formData.get('note'),
      budget: formData.get('budget'),
   }

   const validate = createCategorySchema.parse(data)

   const newCategorys = await prisma.category.create({
      data: { ...validate, userId: session.user.id },
   })

   revalidatePath('/categories')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, category: newCategorys }
}

export async function updateCategory(formData: FormData) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      note: formData.get('note'),
      budget: formData.get('budget'),
   }

   const validate = updateCategorySchema.parse(data)

   const updatedCategory = await prisma.category.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/categories')
   revalidatePath('/dashboard')

   return { message: 'Successfully created!', status: 200, category: updatedCategory }
}

export async function deleteCategory(id: string) {
   const session = await auth()

   if (!session?.user.id) {
      return { message: 'Not authenticated!', status: 403 }
   }

   const deletedCategory = await prisma.category.delete({
      where: { id },
   })

   revalidatePath('/categories')
   revalidatePath('/dashboard')

   return { message: 'Category deleted', status: 200, category: deletedCategory }
}
