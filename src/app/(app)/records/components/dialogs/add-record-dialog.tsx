'use client'

import { RecordType } from '@prisma/client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import RecordsForm from '../records-form'

import MainDialog from '@/components/ui/main-dialog'

type TProps = {
   type: RecordType
}

const AddRecordDialog = ({ type }: TProps) => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('addRecord') === 'true'

   return (
      <MainDialog
         title="Add new record"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?addRecord=true'))}
         btnLabel="Add new"
      >
         <RecordsForm type={type} />
      </MainDialog>
   )
}

export default AddRecordDialog
