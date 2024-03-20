import React from 'react'

import { PlusIcon } from 'lucide-react'

import { getUserGoalsWithTotal } from '../actions'

import AddGoalDialog from './dialogs/add-goal-dialog'
import GoalsCard, { Card } from './goals-card'

export default async function GoalsList() {
   const goalsData = await getUserGoalsWithTotal()

   return (
      <ul className="flex flex-col gap-4 w-full">
         {goalsData.goals.map((goal) => (
            <GoalsCard key={Math.random()} goal={goal} />
         ))}
         <Card href="?addGoal=true">
            <div className="flex items-center justify-center h-full">
               <PlusIcon /> Add new
            </div>
         </Card>

         <AddGoalDialog noBtn />
      </ul>
   )
}
