import React from 'react'

import GoalCardSkeleton from './goal-card-skeleton'

const GoalsListSkeleton = () => {
   return (
      <ul className="flex flex-col gap-4 w-full">
         {[1, 2, 3, 4].map((acc) => (
            <GoalCardSkeleton key={acc} />
         ))}
      </ul>
   )
}

export default GoalsListSkeleton
