'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Goal } from '@prisma/client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { addGoal, updateGoal } from '../actions'

import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { createGoalSchema, updateGoalSchema } from '@/schemas/goal.schema'

type TProps = {
   isEdit?: boolean
   goal?: Goal
}

const GoalsForm = ({ goal, isEdit }: TProps) => {
   const form = useForm<createGoalSchema>({
      resolver: zodResolver(isEdit ? updateGoalSchema : createGoalSchema),
      defaultValues: {
         name: '',
         note: '',
      },
      ...(isEdit && goal ? { values: { ...goal } } : {}),
   })

   const router = useRouter()

   async function onSubmit(values: createGoalSchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            formData.append(key[0], key[1]!.toString())
         }

         if (!isEdit) {
            await addGoal(formData)

            toast.success('Goal created')
         }

         if (isEdit) {
            await updateGoal(formData)

            toast.success('Goal updated')
         }
         router.back()
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputField name="name" label="Name" placeholder="Example Goal" autoComplete="off" />
            <InputField
               name="target"
               type="number"
               label="Target"
               placeholder="Input target"
               autoComplete="off"
            />
            <InputField
               name="initialAmount"
               type="number"
               label="Initial Amount"
               placeholder="Input amount"
               autoComplete="off"
            />
            <InputField name="note" label="Note" placeholder="My note..." autoComplete="off" />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}

export default GoalsForm
