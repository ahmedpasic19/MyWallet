'use client'

import { RecordType } from '@prisma/client'

import React, { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteRecord } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

type TProps = {
   type: RecordType
}

const DeleteRecordDialog = ({ type }: TProps) => {
   const [isLoading, setIsLoading] = useState(false)

   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dRec') ? true : false
   const paramsType = searchParams.get('type')?.toUpperCase() as RecordType

   const handleDelete = async () => {
      try {
         setIsLoading(true)
         await deleteRecord(searchParams.get('dRec')!)

         router.back()
         toast.success('Record deleted')
      } catch (error) {
         toast.error('An error accured')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <MainDialog
         title="Delete record"
         open={isOpen && paramsType === type}
         onOpenChange={() => (isOpen ? router.back() : router.push('?dRec=true'))}
         noBtn
      >
         <div className="flex gap-2 w -full justify-center">
            <Button variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
            <Button onClick={handleDelete} disabled={isLoading} isLoading={isLoading}>
               Delete
            </Button>
         </div>
      </MainDialog>
   )
}

export default DeleteRecordDialog
