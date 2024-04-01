import React from 'react'

import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import DataTableSkeleton from '@/components/skeleton/data-table-skeleton'
import TitleSkeleton from '@/components/skeleton/title-skeleton'

const DashboardTableSkeleton = () => {
   return (
      <>
         <div className="flex justify-between">
            <span className="h-full flex items-end  w-full">
               <TitleSkeleton />
            </span>
            <ButtonSkeleton />
         </div>
         <DataTableSkeleton />
      </>
   )
}

export default DashboardTableSkeleton
