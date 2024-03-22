import React from 'react'

import CategoryCardSkeleton from './category-card-skeleton'

const CategoriesListSkeleton = () => {
   return (
      <ul className="flex flex-col gap-4 w-full">
         {[1, 2, 3, 4].map((acc) => (
            <CategoryCardSkeleton key={acc} />
         ))}
      </ul>
   )
}

export default CategoriesListSkeleton
