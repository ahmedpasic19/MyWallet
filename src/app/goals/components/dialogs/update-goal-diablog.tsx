'use client'

import { Goal } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneGoal } from '../../actions'
import GoalsForm from '../goals-form'

import MainDialog from '@/components/ui/main-dialog'

const UpdateAccountDialog = () => {
   const [goal, setGoal] = useState({} as Goal)

   const searchParams = useSearchParams()
   const router = useRouter()

   const goalId = searchParams.get('goalId')

   useEffect(() => {
      const getData = async () => {
         const res = await getOneGoal(goalId!)

         if (res.goal) setGoal(res.goal)
      }

      if (goalId) getData()
   }, [goalId])

   return (
      <MainDialog
         title="Edit goal"
         open={goalId ? true : false}
         onOpenChange={() => (goalId ? router.back() : router.push('?goalId'))}
         noBtn
      >
         <GoalsForm isEdit goal={goal} />
      </MainDialog>
   )
}

export default UpdateAccountDialog
