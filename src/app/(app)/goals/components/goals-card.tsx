import { Goal } from '@prisma/client'

import React from 'react'

import { TargetIcon } from 'lucide-react'
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
   return (
      <Card href={`?accId=${goal.id}`}>
         <div>
            <TargetIcon /> <h1>{goal.name}</h1>
         </div>
         <section className="flex items-center gap-2">
            <Progress value={(goal.total / goal.target) * 100} className="w-full h-2" />
            <div>{round((goal.total / goal.target) * 100, 0)}%</div>
         </section>
         <div>{formatCurrency(round(goal.total || 0))}</div>
      </Card>
   )
}
export default GoalsCard
