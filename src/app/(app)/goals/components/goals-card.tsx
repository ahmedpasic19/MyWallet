import { Goal } from '@prisma/client'

import React from 'react'

import { MountainIcon } from 'lucide-react'

import Box from '@/components/ui/box'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, round } from '@/lib/utils'

const GoalsCard = ({ goal }: { goal: Goal & { total: number } }) => {
   const total = goal.total + (goal?.initialAmount ? +goal?.initialAmount : 0)

   return (
      <Box href={`?accId=${goal.id}`}>
         <div>
            <MountainIcon /> <h1>{goal.name}</h1>
         </div>
         <section className="flex items-center gap-2">
            <Progress value={(total / goal.target) * 100} className="w-full h-2" />
            <div>{round((total / goal.target) * 100, 0)}%</div>
         </section>
         <div>{formatCurrency(round(total || 0))}</div>
      </Box>
   )
}
export default GoalsCard
