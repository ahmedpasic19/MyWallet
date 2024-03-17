import React, { Suspense } from 'react'

import { getUserCategories } from './actions'
import CategoriesTable from './components/categories-table'
import AddCategoryDialog from './components/dialogs/add-category-dialog'

export default async function CategoriesPage() {
   const data = await getUserCategories()

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <AddCategoryDialog />
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <CategoriesTable data={data?.categories} />
            </Suspense>
         </div>
      </div>
   )
}
