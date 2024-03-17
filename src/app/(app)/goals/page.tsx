import React, { Suspense } from 'react'

import { getUserGoals } from './actions'
import AddGoalDialog from './components/dialogs/add-goal-dialog'
import GoalsTable from './components/goals-table'

export default async function GoalsPage() {
   const data = await getUserGoals()

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <AddGoalDialog />
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <GoalsTable data={data?.goals} />
            </Suspense>
         </div>
      </div>
   )
}
