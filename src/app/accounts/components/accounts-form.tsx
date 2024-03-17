'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { addAccount } from '../actions'

import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { addAccountSchema } from '@/schemas/account.schema'

const AccountsForm = () => {
   const form = useForm<addAccountSchema>({
      resolver: zodResolver(addAccountSchema),
      defaultValues: {
         name: '',
      },
   })

   const router = useRouter()

   async function onSubmit(values: addAccountSchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            formData.append(key[0], key[1]!.toString())
         }

         await addAccount(formData)

         toast.success('Account created')
         router.back()
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputField name="name" label="Name" placeholder="Example Account" autoComplete="off" />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}

export default AccountsForm
