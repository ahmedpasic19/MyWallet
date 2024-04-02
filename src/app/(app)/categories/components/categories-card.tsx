import { Category } from '@prisma/client'

import React from 'react'

import { BlocksIcon } from 'lucide-react'

import Box from '@/components/ui/box'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, round } from '@/lib/utils'

const CategoriesCard = ({ category }: { category: Category & { total: number } }) => {
   return (
      <Box href={`?accId=${category.id}`}>
         <div>
            <BlocksIcon /> <h1>{category.name}</h1>
         </div>
         <section className="flex items-center gap-2">
            <Progress
               value={(category.total / category.budget) * 100 * -1}
               className="w-full h-2"
            />
            <div>{round((category.total / category.budget) * 100 * -1, 0)}%</div>
         </section>
         <strong>
            {
               category.total
                  ? formatCurrency(round(category.total || 0) * -1)
                  : formatCurrency(round(category.total || 0)) // Don't display in negatie if 0
            }
         </strong>
      </Box>
   )
}
export default CategoriesCard
