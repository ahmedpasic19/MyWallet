import React, { Suspense } from 'react'

import DashboardTableSkeleton from '../../dashboard/components/skeleton/dashboard-table-skeleton'
import { getUserRecordsByType } from '../actions'
import AddRecordDialog from '../components/dialogs/add-record-dialog'
import RecordsTable from '../components/records-table'

import { H4 } from '@/components/ui/typography'

export default async function IncomePage() {
   const data = await getUserRecordsByType('INCOME')

   return (
      <div className="page">
         <H4>Income</H4>
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddRecordDialog type="INCOME" />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<DashboardTableSkeleton noBtn />}>
               <RecordsTable data={data?.records} type="INCOME" />
            </Suspense>
         </div>
      </div>
   )
}
