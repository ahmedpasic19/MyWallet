'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteGoal } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

const DeleteGoalDialog = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dGoal') ? true : false

   const handleDelete = async () => {
      try {
         await deleteGoal(searchParams.get('dGoal')!)

         router.back()

         toast.success('Account deleted')
      } catch (error) {
         toast.error('An error accured')
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
            <Button onClick={handleDelete}>Delete</Button>
         </div>
      </MainDialog>
   )
}

export default DeleteGoalDialog
