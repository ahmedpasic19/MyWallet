'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import TransfersFrom from '../transfers-form'

import MainDialog from '@/components/ui/main-dialog'

const AddTransferDialog = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('addTransfer') === 'true'

   return (
      <MainDialog
         title="Add new transfer"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?addTransfer=true'))}
         btnLabel="Add new"
      >
         <TransfersFrom />
      </MainDialog>
   )
}

export default AddTransferDialog
