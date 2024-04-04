import React from 'react'

import { PlusIcon } from 'lucide-react'

import { getUserGoalsWithTotal } from '../actions'

import AddGoalDialog from './dialogs/add-goal-dialog'
import GoalsCard from './goals-card'
import Box from '@/components/ui/box'

export default async function GoalsList() {
   const goalsData = await getUserGoalsWithTotal()

   return (
      <ul className="flex flex-col gap-4 w-full">
         {goalsData.goals?.map((goal) => <GoalsCard key={Math.random()} goal={goal} />)}
         <Box href="?addGoal=true">
            <div className="flex items-center justify-center h-full">
               <PlusIcon /> Add new
            </div>
         </Box>

         <AddGoalDialog noBtn />
      </ul>
   )
}
