'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteCategory } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

const DeleteAccountDialog = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dCat') ? true : false

   const handleDelete = async () => {
      try {
         await deleteCategory(searchParams.get('dCat')!)

         router.back()

         toast.success('Category deleted')
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <MainDialog
         title="Delete category"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?dCat=true'))}
         noBtn
      >
         <div className="flex gap-2 w-full justify-center">
            <Button variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
         </div>
      </MainDialog>
   )
}

export default DeleteAccountDialog
