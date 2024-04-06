import React, { Suspense } from 'react'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserCategories } from './actions'
import CategoriesTable from './components/categories-table'
import AddCategoryDialog from './components/dialogs/add-category-dialog'
import { H4 } from '@/components/ui/typography'

export default async function CategoriesPage() {
   const data = await getUserCategories()

   return (
      <div className="page">
         <H4>Categories</H4>
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddCategoryDialog />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<DashboardTableSkeleton noBtn />}>
               <CategoriesTable data={data?.categories} />
            </Suspense>
         </div>
      </div>
   )
}
