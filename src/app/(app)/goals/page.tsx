import React from 'react'

import dynamic from 'next/dynamic'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserGoals } from './actions'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddGoalDialog = dynamic(() => import('./components/dialogs/add-goal-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})
const GoalsTable = dynamic(() => import('./components/goals-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function GoalsPage() {
   const data = await getUserGoals()

   return (
      <div className="page">
         <H4>Goals</H4>
         <div className="mb-2 w-full flex items-start">
            <AddGoalDialog />
         </div>
         <div className="w-full ">
            <GoalsTable data={data?.goals} />
         </div>
      </div>
   )
}
