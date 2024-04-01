import { Goal } from '@prisma/client'

import React from 'react'

import { MountainIcon } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

import { Progress } from '@/components/ui/progress'
import { formatCurrency, round } from '@/lib/utils'

export const Card = ({ children, ...props }: LinkProps & { children: React.ReactNode }) => {
   return (
      <Link
         {...props}
         className="bg-white min-w-52 shadow-md rounded-md flex flex-col p-4 cursor-pointer hover:bg-gray-50"
      >
         {children}
      </Link>
   )
}

const GoalsCard = ({ goal }: { goal: Goal & { total: number } }) => {
   const total = goal.total + (goal?.initialAmount ? +goal?.initialAmount : 0)

   return (
      <Card href={`?accId=${goal.id}`}>
         <div>
            <MountainIcon /> <h1>{goal.name}</h1>
         </div>
         <section className="flex items-center gap-2">
            <Progress value={(total / goal.target) * 100} className="w-full h-2" />
            <div>{round((total / goal.target) * 100, 0)}%</div>
         </section>
         <div>{formatCurrency(round(total || 0))}</div>
      </Card>
   )
}
export default GoalsCard
