import React from 'react'

import dynamic from 'next/dynamic'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserCategories } from './actions'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddCategoryDialog = dynamic(() => import('./components/dialogs/add-category-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})
const CategoriesTable = dynamic(() => import('./components/categories-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function CategoriesPage() {
   const data = await getUserCategories()

   return (
      <div className="page">
         <H4>Categories</H4>
         <div className="mb-2 w-full flex items-start">
            <AddCategoryDialog />
         </div>
         <div className="w-full ">
            <CategoriesTable data={data?.categories} />
         </div>
      </div>
   )
}
