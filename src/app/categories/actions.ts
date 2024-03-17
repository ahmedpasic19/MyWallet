'use server'

import { PrismaClient } from '@prisma/client'

import { revalidatePath } from 'next/cache'

import { createCategorySchema, updateCategorySchema } from '@/schemas/category.schema'

const prisma = new PrismaClient()

// Currently not by userId
export async function getUserCategories() {
   const userCategories = await prisma.category.findMany()

   return { categories: userCategories }
}

export async function getOneCategory(id: string) {
   const category = await prisma.category.findUnique({
      where: { id },
   })

   return { category }
}

export async function addCategory(formData: FormData) {
   const data = {
      name: formData.get('name'),
      note: formData.get('note'),
      budget: formData.get('budget'),
      // userId: formData.get('userId'),
   }

   const validate = createCategorySchema.parse(data)

   const newCategorys = await prisma.category.create({
      data: validate,
   })

   revalidatePath('/categories')
   return { message: 'Successfully created!', category: newCategorys }
}

export async function updateCategory(formData: FormData) {
   const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      note: formData.get('note'),
      budget: formData.get('budget'),
      // userId: formData.get('userId'),
   }

   const validate = updateCategorySchema.parse(data)

   const updatedCategory = await prisma.category.update({
      where: { id: validate.id },
      data: validate,
   })

   revalidatePath('/categories')
   return { message: 'Successfully created!', category: updatedCategory }
}

export async function deleteCategory(id: string) {
   const deletedCategory = await prisma.category.delete({
      where: { id },
   })

   revalidatePath('/categories')
   return { message: 'Category deleted', category: deletedCategory }
}
