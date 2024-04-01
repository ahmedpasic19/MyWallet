'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Transfer, WalletAccounts } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getUserAccounts } from '../../accounts/actions'
import { addTransfer, updateTransfer } from '../actions'

import { DateField } from '@/components/form/date-picker'
import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { createTransferSchema, updateTransferSchema } from '@/schemas/transfer.schema'

type TProps = {
   isEdit?: boolean
   transfer?: Transfer
}

const TransfersForm = ({ transfer, isEdit }: TProps) => {
   const [account, setAccount] = useState([] as WalletAccounts[])

   const form = useForm<createTransferSchema>({
      resolver: zodResolver(isEdit ? updateTransferSchema : createTransferSchema),
      defaultValues: {
         title: '',
         note: '',
      },
      ...(isEdit && transfer ? { values: { ...transfer } } : {}),
   })

   const router = useRouter()

   // GET the data for the form
   useEffect(() => {
      const getData = async () => {
         const res = await getUserAccounts()

         if (res.accounts) setAccount(res.accounts)
      }

      getData()
   }, [isEdit, transfer])

   const accountOptions = account?.map((acc) => ({ label: acc.name, value: acc.id }))

   async function onSubmit(values: createTransferSchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            if (key[0] && key[1]) formData.append(key[0], key[1].toString())
         }

         if (!isEdit) {
            await addTransfer(formData)

            toast.success('Transfer created')
         }

         if (isEdit) {
            await updateTransfer(formData)

            toast.success('Transfer updated')
         }
         router.back()
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-h-[80vh] overflow-y-auto px-2"
         >
            <InputField name="title" label="Title" placeholder="Bananas" autoComplete="off" />
            <InputField
               name="amount"
               label="Amount"
               type="number"
               placeholder="Input amount"
               autoComplete="off"
            />
            <DateField name="date" label="Date" placeholder="Pick a date" autoComplete="off" />
            <SelectField
               options={accountOptions}
               name="accountFromId"
               label="Account from"
               placeholder="Select an account"
               value={transfer?.accountFromId ?? undefined}
            />
            <SelectField
               options={accountOptions}
               name="accountToId"
               label="Account to"
               placeholder="Select an account"
               value={transfer?.accountToId ?? undefined}
            />
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

export default TransfersForm
