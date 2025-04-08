import React from 'react'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const Loading = () => {
   return (
      <div className="page">
         <H4>Accounts</H4>
         <div className="mb-2 w-full flex items-start">
            <ButtonSkeleton />
         </div>
         <div className="w-full ">
            <DashboardTableSkeleton noBtn />
         </div>
      </div>
   )
}

export default Loading
