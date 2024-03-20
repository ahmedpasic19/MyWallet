'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import GoalsForm from '../goals-form'

import MainDialog from '@/components/ui/main-dialog'

const AddGoalDialog = ({ noBtn }: { noBtn?: boolean }) => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('addGoal') === 'true'

   return (
      <MainDialog
         title="Add new goal"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?addGoal=true'))}
         btnLabel="Add new"
         noBtn={noBtn}
      >
         <GoalsForm />
      </MainDialog>
   )
}

export default AddGoalDialog
