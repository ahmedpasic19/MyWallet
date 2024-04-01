'use client'

import React, { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteAccount } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

const DeleteAccountDialog = () => {
   const [isLoading, setIsLoading] = useState(false)

   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dAcc') ? true : false

   const handleDelete = async () => {
      try {
         setIsLoading(true)
         await deleteAccount(searchParams.get('dAcc')!)

         router.back()
         toast.success('Account deleted')
      } catch (error) {
         toast.error('An error accured')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <MainDialog
         title="Delete account"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?dAcc=true'))}
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

export default DeleteAccountDialog
