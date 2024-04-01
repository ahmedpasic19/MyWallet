'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { WalletAccounts } from '@prisma/client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { addAccount, updateAccount } from '../actions'

import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { addAccountSchema, updateAccountSchema } from '@/schemas/account.schema'

type TProps = {
   isEdit?: boolean
   account?: WalletAccounts
}

const AccountsForm = ({ account, isEdit }: TProps) => {
   const form = useForm<addAccountSchema>({
      resolver: zodResolver(isEdit ? updateAccountSchema : addAccountSchema),
      defaultValues: {
         name: '',
         note: '',
      },
      ...(isEdit && account ? { values: { ...account } } : {}),
   })

   const router = useRouter()

   async function onSubmit(values: addAccountSchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            formData.append(key[0], key[1]!.toString())
         }

         if (!isEdit) {
            await addAccount(formData)

            toast.success('Account created')
         }

         if (isEdit) {
            await updateAccount(formData)

            toast.success('Account updated')
         }
         router.back()
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputField name="name" label="Name" placeholder="Example Account" autoComplete="off" />
            <InputField name="note" label="Note" placeholder="Example note..." autoComplete="off" />
            <Button
               type="submit"
               disabled={form.formState.isSubmitting}
               isLoading={form.formState.isSubmitting}
            >
               Submit
            </Button>
         </form>
      </Form>
   )
}

export default AccountsForm
