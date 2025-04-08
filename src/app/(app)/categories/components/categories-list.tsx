import React from 'react'

import { PlusIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { getUserCategoriesWithTotal } from '../actions'

import CategoriesCard from './categories-card'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import Box from '@/components/ui/box'

const AddCategoryDialog = dynamic(() => import('./dialogs/add-category-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})

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
