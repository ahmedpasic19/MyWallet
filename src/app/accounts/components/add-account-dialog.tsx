'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import AccountsForm from './accounts-form'
import MainDialog from '@/components/ui/main-dialog'

const AddAccountDialog = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('addAcc') === 'true'

   return (
      <MainDialog
         title="Add new account"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?addAcc=true'))}
         btnLabel="Add new"
      >
         <AccountsForm />
      </MainDialog>
   )
}

export default AddAccountDialog
