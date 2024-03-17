'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Goal, Record, RecordType, WalletAccounts } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getUserAccounts } from '../../accounts/actions'
import { getUserCategories } from '../../categories/actions'
import { getUserGoals } from '../../goals/actions'
import { addRecord, updateRecord } from '../actions'

import { DateField } from '@/components/form/date-picker'
import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { createRecordSchema, updateRecordSchmea } from '@/schemas/record.schema'

type TProps = {
   isEdit?: boolean
   record?: Record
   type: RecordType
}

const RecordsForm = ({ record, isEdit, type }: TProps) => {
   const [account, setAccount] = useState([] as WalletAccounts[])
   const [categories, setCategories] = useState([] as Category[])
   const [goals, setGoals] = useState([] as Goal[])

   const form = useForm<createRecordSchema>({
      resolver: zodResolver(isEdit ? updateRecordSchmea : createRecordSchema),
      defaultValues: {
         title: '',
         note: '',
         type,
      },
      ...(isEdit && record ? { values: { ...record } } : {}),
   })

   const router = useRouter()

   // GET the data for the form
   useEffect(() => {
      const getData = async () => {
         const res = await getUserAccounts()
         const cat = await getUserCategories()
         const gol = await getUserGoals()

         if (res.accounts) setAccount(res.accounts)
         if (cat.categories) setCategories(cat.categories)
         if (gol.goals) setGoals(gol.goals)
      }

      getData()
   }, [isEdit, record])

   const accountOptions = account?.map((acc) => ({ label: acc.name, value: acc.id }))
   const categoryOptions = categories?.map((cat) => ({ label: cat.name, value: cat.id }))
   const goalOptions = goals?.map((gol) => ({ label: gol.name, value: gol.id }))

   async function onSubmit(values: createRecordSchema) {
      try {
         const formData = new FormData()

         for (const key of Object.entries(values)) {
            if (key[0] && key[1]) formData.append(key[0], key[1].toString())
         }

         if (!isEdit) {
            await addRecord(formData)

            toast.success('Record created')
         }

         if (isEdit) {
            await updateRecord(formData)

            toast.success('Record updated')
         }
         router.back()
      } catch (error) {
         console.log(error)
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
               name="accountId"
               label="Account"
               placeholder="Select an account"
               value={record?.accountId ?? undefined}
            />
            <SelectField
               options={categoryOptions}
               name="categoryId"
               label="Category"
               placeholder="Select a category"
               value={record?.categoryId ?? undefined}
            />
            <SelectField
               options={goalOptions}
               name="goalId"
               label="Goal"
               placeholder="Select a goal"
               value={record?.goalId ?? undefined}
            />
            <InputField name="note" label="Note" placeholder="Example note..." autoComplete="off" />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}

export default RecordsForm
