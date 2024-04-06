import React from 'react'

import { PlusIcon } from 'lucide-react'

import { getUserCategoriesWithTotal } from '../actions'

import CategoriesCard from './categories-card'
import AddCategoryDialog from './dialogs/add-category-dialog'
import Box from '@/components/ui/box'

export default async function CategoriesList() {
   const categoriesData = await getUserCategoriesWithTotal()

   return (
      <ul className="flex flex-col gap-4 w-full">
         {categoriesData.categories?.map((category) => (
            <CategoriesCard key={Math.random()} category={category} />
         ))}
         <Box href="?addCategory=true">
            <div className="flex items-center justify-center h-full">
               <PlusIcon /> Add new
            </div>
         </Box>

         <AddCategoryDialog noBtn />
      </ul>
   )
}
