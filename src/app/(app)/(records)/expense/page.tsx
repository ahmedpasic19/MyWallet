import React, { Suspense } from 'react'

import DashboardTableSkeleton from '../../dashboard/components/skeleton/dashboard-table-skeleton'
import { getUserRecordsByType } from '../actions'
import AddRecordDialog from '../components/dialogs/add-record-dialog'
import RecordsTable from '../components/records-table'

import { H4 } from '@/components/ui/typography'

export default async function ExpensePage() {
   const data = await getUserRecordsByType('EXPENSE')

   return (
      <div className="page">
         <H4>Expense</H4>
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddRecordDialog type="EXPENSE" />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<DashboardTableSkeleton />}>
               <RecordsTable data={data?.records} type="EXPENSE" />
            </Suspense>
         </div>
      </div>
   )
}
