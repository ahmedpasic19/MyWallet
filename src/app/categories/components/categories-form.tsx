'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { addCategory, updateCategory } from '../actions'

import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { createCategorySchema, updateCategorySchema } from '@/schemas/category.schema'

type TProps = {
   isEdit?: boolean
   category?: Category
}

const CategoriesForm = ({ category, isEdit }: TProps) => {
   const form = useForm<createCategorySchema>({
      resolver: zodResolver(isEdit ? updateCategorySchema : createCategorySchema),
      defaultValues: {
         name: '',
         note: '',
      },
      ...(isEdit && category ? { values: { ...category } } : {}),
   })

   const router = useRouter()

   async function onSubmit(values: createCategorySchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            formData.append(key[0], key[1]!.toString())
         }

         if (!isEdit) {
            await addCategory(formData)

            toast.success('Category created')
         }

         if (isEdit) {
            await updateCategory(formData)

            toast.success('Category updated')
         }
         router.back()
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputField
               name="name"
               label="Name"
               placeholder="Example Category"
               autoComplete="off"
            />
            <InputField
               name="budget"
               label="Monthly budget"
               type="number"
               placeholder="Input amount"
               autoComplete="off"
            />
            <InputField name="note" label="Note" placeholder="Example note..." autoComplete="off" />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}

export default CategoriesForm
