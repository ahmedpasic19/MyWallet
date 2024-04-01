'use client'

import React, { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteTransfer } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

const DeleteTransferDialog = () => {
   const [isLoading, setIsLoading] = useState(false)

   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dTra') ? true : false

   const handleDelete = async () => {
      try {
         setIsLoading(true)

         await deleteTransfer(searchParams.get('dTra')!)

         router.back()
         toast.success('Transfer deleted')
      } catch (error) {
         toast.error('An error accured')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <MainDialog
         title="Delete transfer"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?dTra=true'))}
         noBtn
      >
         <div className="flex gap-2 w-full justify-center">
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

export default DeleteTransferDialog
