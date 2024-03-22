import { Category } from '@prisma/client'

import React from 'react'

import { ToyBrickIcon } from 'lucide-react'
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

const CategoriesCard = ({ category }: { category: Category & { total: number } }) => {
   return (
      <Card href={`?accId=${category.id}`}>
         <div>
            <ToyBrickIcon /> <h1>{category.name}</h1>
         </div>
         <section className="flex items-center gap-2">
            <Progress
               value={(category.total / category.budget) * 100 * -1}
               className="w-full h-2"
            />
            <div>{round((category.total / category.budget) * 100 * -1, 0)}%</div>
         </section>
         <div>{formatCurrency(round(category.total || 0) * -1)}</div>
      </Card>
   )
}
export default CategoriesCard
