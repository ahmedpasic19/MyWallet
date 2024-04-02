import React from 'react'

import CardSkeleton from './card-skeleton'

const ListSkeleton = () => {
   return (
      <ul className="flex flex-col gap-4 w-full">
         {[1, 2, 3, 4].map((acc) => (
            <CardSkeleton key={acc} />
         ))}
      </ul>
   )
}

export default ListSkeleton
