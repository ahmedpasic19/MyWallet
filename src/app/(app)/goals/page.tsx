import React, { Suspense } from 'react'

import { getUserGoals } from './actions'
import AddGoalDialog from './components/dialogs/add-goal-dialog'
import GoalsTable from './components/goals-table'
import { H4 } from '@/components/ui/typography'

export default async function GoalsPage() {
   const data = await getUserGoals()

   return (
      <div className="page">
         <H4>Goals</H4>
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddGoalDialog />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <GoalsTable data={data?.goals} />
            </Suspense>
         </div>
      </div>
   )
}
